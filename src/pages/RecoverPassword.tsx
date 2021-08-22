import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { axiosInstance } from "../helpers/axios";

const RecoverPassword = () => {
  async function recover() {
    await axiosInstance.post("/users/recoverPassword");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle> Recover my password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonInput placeholder="E-Mail"></IonInput>
        </IonItem>
        <IonButton onClick={recover}>Recover</IonButton>
        <IonButton routerLink="/">Cancel</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RecoverPassword;
