import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import { axiosInstance } from "../helpers/axios";

const AddNote = () => {
  const [name, setName] = useState<string>();
  const [note, setNote] = useState<string>();
  const [picture, setPicture] = useState<string>();
  let history = useHistory();
  const [errorText] = useIonAlert();

  async function createNote() {
    try {
      const data = await axiosInstance.post("/note", {
        name: name,
        note: note,
        picture: picture,
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
          <IonTitle>Add a new note</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonInput
          value={name}
          placeholder="Note name (*)"
          onIonChange={(e) => setName(e.detail.value!)}
        ></IonInput>
        <IonInput
          value={note}
          placeholder="Insert my notes (*)"
          onIonChange={(e) => setNote(e.detail.value!)}
        ></IonInput>
        <IonInput
          value={picture}
          placeholder="Note picture 📷 (*)"
          onIonChange={(e) => setPicture(e.detail.value!)}
        ></IonInput>
        <IonButton onClick={createNote}>Create note</IonButton>
        <IonButton routerLink="/home">Cancel</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default AddNote;
