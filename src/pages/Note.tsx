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
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonViewDidEnter,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { axiosInstance } from "../helpers/axios";
import "./NotFound.css";

const Note: React.FC = () => {
  const { id } = useParams<{id: string}>()
  const [note, setNote] = useState(null)
  const [present] = useIonAlert()
  const history = useHistory()

  async function deleteNote() {
    await axiosInstance.delete(`/note/${id}`)

    present({
      header: 'Note',
      message: 'Note deleted!',
      buttons: [{ text: 'Ok', handler: history.goBack }],
      onDidDismiss: history.goBack,
    })
  }

  useIonViewDidEnter(async () => {
    const { data } = await axiosInstance.get(`/note/${id}`)
    setNote(data)
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons> 
          <IonTitle>{note?.name || 'Note'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <img src={note?.picture} alt="" />
          <IonCardHeader>
            <IonCardSubtitle>Crée le {note?.date}</IonCardSubtitle>
            <IonCardTitle>{note?.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {note?.note}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
              <IonButton size="small" routerLink={`/note/edit/${id}`} fill="outline" >Edit</IonButton>
              <IonButton size="small" color="danger" slot="end" onClick={deleteNote}>Delete</IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Note;
