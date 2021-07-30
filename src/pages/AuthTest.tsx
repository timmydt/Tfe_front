import {
  IonButton,
  IonContent,
  IonHeader,
  IonItemDivider,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { clearToken } from "../helpers/axios";
import "./AuthTest.css";

const AuthTest: React.FC = () => {
  async function logout() {
    clearToken();
    localStorage.removeItem("token");
    console.log("disconnected");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemDivider>Mon profil</IonItemDivider>
        <IonButton onClick={logout} routerLink="/">
          log out
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AuthTest;
