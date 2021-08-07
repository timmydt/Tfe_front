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

const AddCave = () => {
  const [name, setName] = useState<string>();
  let history = useHistory();
  const [errorText] = useIonAlert();

  async function createCave() {
    try {
      const data = await axiosInstance.post("/cave/create", {
        name: name,
      });

      if (data) {
        history.push("/home");
        console.log("cave created");
      }
    } catch (error) {
      errorText({ message: "There is one field missing", buttons: ["ok"] });
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add a new cave</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonInput
          value={name}
          placeholder="Cave name (*)"
          onIonChange={(e) => setName(e.detail.value!)}
        ></IonInput>
        <IonButton onClick={createCave}>Create cave</IonButton>
        <IonButton routerLink="/home">Cancel</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default AddCave;
