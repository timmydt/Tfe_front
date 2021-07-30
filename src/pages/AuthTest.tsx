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
import { axiosInstance, clearToken } from "../helpers/axios";
import "./AuthTest.css";

const AuthTest: React.FC = () => {
  async function logout() {
    clearToken();
    localStorage.removeItem("token");
    console.log("disconnected");
  }

  async function getCaves() {
    const caves = await axiosInstance.get("/cave/list");
    console.log(caves);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>You are logged in !</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemDivider>Mon profil</IonItemDivider>
        <IonButton onClick={getCaves}>getCaves</IonButton>
        <IonButton onClick={logout} routerLink="/">
          log out
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AuthTest;
