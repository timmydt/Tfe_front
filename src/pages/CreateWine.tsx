import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { axiosInstance } from "../helpers/axios";
import "./NotFound.css"

const CreateWine: React.FC = () => {
  const { id } = useParams<{id: string}>()
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [food, setFood] = useState('')
  const [grapes, setGrapes] = useState('')
  const [year, setYear] = useState('')
  const [maker, setMaker] = useState('')
  const [image, setImage] = useState()
  const [present, dismiss] = useIonToast()
  const history = useHistory()

  function openFileDialog() {
    document.getElementById("file-upload").click()
  }

  async function onImage(e) {
    setImage(e.target.files[0])
  }

  const setText = (setter) => (e) => {
    setter(e.detail.value!)
  }

  const createWine = async () => {
    const data = new FormData()

    data.append('name', name)
    data.append('best_before', date)
    data.append('food', food)
    data.append('grapes', grapes)
    data.append('maker', maker)
    data.append('picture', image)
    data.append('year', year)
    data.append('caveId', id)

    await axiosInstance.post('/wine/create', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    history.replace(`/cave/${id}`)

    present({
      buttons: [{ text: 'Ok', handler: dismiss}],
      message: 'Vin crée',
      color: 'success',
      duration: 3000
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add wine(s) to this cave</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput value={name} onIonChange={setText(setName)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Best before</IonLabel>
            <IonInput type="date" value={date} onIonChange={setText(setDate)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Food</IonLabel>
            <IonTextarea rows={5} value={food} onIonChange={setText(setFood)}></IonTextarea>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Grapes</IonLabel>
            <IonInput value={grapes} onIonChange={setText(setGrapes)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Maker</IonLabel>
            <IonInput value={maker} onIonChange={setText(setMaker)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Picture</IonLabel>
            <IonInput onClick={openFileDialog}></IonInput>
          </IonItem>
          <input
            type="file"
            id="file-upload"
            style={{ display: "none" }}
            onChange={onImage}
          />
          <IonItem>
            <IonLabel position="stacked">Year</IonLabel>
            <IonInput value={year} type="number" onIonChange={setText(setYear)}></IonInput>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonButton
          expand="block"
          onClick={createWine}
          style={{ marginLeft: 5, marginRight: 5 }}
        >
          Valider
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default CreateWine;
