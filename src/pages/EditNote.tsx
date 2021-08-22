import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonViewDidEnter,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { axiosInstance } from "../helpers/axios";

const EditNote: React.FC = () => {
  const { id } = useParams<{id: string}>()
  const [name, setName] = useState<string>()
  const [picture, setPicture] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [note, setNote] = useState(null)
  const [present] = useIonAlert()
  const history = useHistory()

  async function editNote() {
    await axiosInstance.put(`/note/update`, {
      id,
      name,
      picture,
      note: description,
      date: note.date
    })

    present({
      header: 'Note',
      message: 'Note updated!',
      buttons: [{ text: 'Ok', handler: history.goBack }],
      onDidDismiss: history.goBack,
    })
  }

  async function setImage(e) {
    const formData = new FormData()
    const file = e.target.files[0]

    formData.append('picture', file)

    const { data } = await axiosInstance.post('/note/picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    setDescription(data.description)
    setPicture(data.uri)
  }
  
  function openFileDialog() {
    document.getElementById("file-upload").click();
  }

  useIonViewDidEnter(async () => {
    const { data } = await axiosInstance.get(`/note/${id}`)

    setNote(data)
    setName(data.name)
    setDescription(data.note)
    setPicture(data.picture)
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons> 
          <IonTitle>{'Edit: '+note?.name || 'Edit'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <img src={picture} alt="" />
          <IonCardHeader>
            <IonCardSubtitle>Crée le {note?.date}</IonCardSubtitle>
            <IonCardTitle>{name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel>Name</IonLabel>
              <IonInput
                value={name}
                placeholder="Note name (*)"
                onIonChange={(e) => setName(e.detail.value)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel>Description</IonLabel>
              <IonTextarea
                value={description}
                rows={10}
                placeholder="Insert my notes (*)"
                onIonChange={(e) => setDescription(e.detail.value!)}
              ></IonTextarea>
            </IonItem>
            <input
              type="file"
              id="file-upload"
              style={{ display: "none" }}
              onChange={setImage}
            />
          </IonCardContent>
          <IonItem>
            <IonButton fill="outline" expand="block" onClick={openFileDialog}>Camera</IonButton>
            <IonButton color="primary" expand="block" slot="end"  onClick={editNote}>Edit note</IonButton>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default EditNote;
