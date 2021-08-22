import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import { axiosInstance } from "../helpers/axios";
import cave from '../assets/cave.jpg'

const AddNote = () => {
  const [name, setName] = useState<string>();
  const [note, setNote] = useState<string>();
  const [picture, setPicture] = useState<string>();
  const history = useHistory();
  const [errorText] = useIonAlert();

  async function setImage(e) {
    const formData = new FormData()
    const file = e.target.files[0]

    formData.append('picture', file)

    const { data } = await axiosInstance.post('/note/picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    setNote(data.description)
    setPicture(data.uri)
  }
  
  function openFileDialog() {
    document.getElementById("file-upload").click();
  }

  async function createNote() {
    try {
      const data = await axiosInstance.post("/note", {
        name: name,
        note: note,
        picture: picture,
        date: new Date()
      });

      if (data) {
        history.push("/home");
        console.log("note created");
      }
    } catch (error) {
      errorText({ message: "There is one field missing", buttons: ["ok"] });
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Add a new note</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonCard>
            <img src={picture || cave} alt="" style={{ height: 150, objectFit: 'cover', width: '100%' }} />
            <IonCardHeader>
              <IonInput
                value={name}
                placeholder="Note name (*)"
                onIonChange={(e) => setName(e.detail.value!)}
              ></IonInput>
              <IonTextarea
                value={note}
                rows={10}
                placeholder="Insert my notes (*)"
                onIonChange={(e) => setNote(e.detail.value!)}
              ></IonTextarea>
              <input
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                onChange={setImage}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <IonButton size="small" fill="outline" expand="block" onClick={openFileDialog}>Camera</IonButton>
                <IonButton size="small" color="primary" expand="block" slot="end"  onClick={createNote}>Create note</IonButton>
              </div>
            </IonCardHeader>
          </IonCard>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default AddNote;
