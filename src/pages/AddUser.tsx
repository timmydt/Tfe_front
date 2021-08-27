import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { axiosInstance } from "../helpers/axios";
import "./NotFound.css";
import { closeCircle, wineOutline } from 'ionicons/icons';

const AddUser: React.FC = () => {
  const { id } = useParams<{id: string}>()
  const [name, setName] = useState('')
  const [users, setUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [present, dismiss] = useIonToast()
  const history = useHistory()

  function onUserPress(user) {
    console.log(user)
    console.log(selected(user.id))
    if (selected(user.id)) {
      deleteUser(user)
    } else {
      setSelectedUsers((users) => [...users, user])
    }
  }

  function deleteUser(deletedUser) {
    setSelectedUsers((users) => users.filter(user => user.id !== deletedUser.id))
  }

  function selected(id) {
    return selectedUsers.some(user => user.id === id)
  }

  async function addUsersToCave() {
    const userIds = users.map(user => user.id)

    await axiosInstance.post('/cave/share', {
      users: userIds,
      cave: Number(id)
    })

    present({
      onDidDismiss: history.goBack,
      message: selectedUsers.length + ' users ajoutés à la cave!',
      buttons: [{ text: 'Ok', handler: history.goBack }],
      color: 'success'
    })
  }

  useEffect(() => {
    if (name.length > 2) {
      axiosInstance.post('/users', { search: name })
        .then(({ data: users }) => {
          setUsers(users)
        })
    }
  }, [name])

  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home" />
        </IonButtons>
        <IonTitle>Add user to this cave</IonTitle>
      </IonToolbar>
      <IonContent fullscreen>
        <IonSearchbar
          onIonChange={(e) => setName(e.detail.value!)}
          onIonClear={() => setUsers([])}
          debounce={200}
        />

        <IonList>
          <IonItemDivider>Users selectionnés</IonItemDivider>
          {selectedUsers.map(user => (
            <IonItem key={user.id}>
              <IonLabel>{user.username}</IonLabel>
              <IonCheckbox checked={selected(user.id)} onClick={() => onUserPress(user)} />
            </IonItem>
          ))}
        </IonList>

        <IonList>
        <IonItemDivider>Recherche</IonItemDivider>
          {users.map(user => (
            <IonItem key={user.id}>
              <IonLabel>{user.username}</IonLabel>
              <IonCheckbox checked={selected(user.id)} onClick={() => onUserPress(user)} />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <IonFooter className="ion-no-border">
        <IonButton
          expand="block"
          onClick={addUsersToCave}
          disabled={selectedUsers.length === 0}
          style={{ marginLeft: 5, marginRight: 5 }}
        >
          Ajouter {selectedUsers.length} users
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default AddUser;
