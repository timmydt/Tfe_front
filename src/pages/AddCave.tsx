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
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Add a new cave</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel position="stacked">Name</IonLabel>
          <IonInput
            value={name}
            placeholder="Cave name (*)"
            onIonChange={(e) => setName(e.detail.value!)}
          ></IonInput>
        </IonItem>
      </IonContent>
      <IonFooter>
        <IonButton
          expand="block"
          onClick={createCave}
          disabled={!name}
          style={{ marginLeft: 5, marginRight: 5 }}>
          Créer la cave
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};
export default AddCave;
