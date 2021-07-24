import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useCallback } from "react";
import { useState } from "react";
import "./Home.css";
import axios from "axios";

const Home: React.FC = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  async function login() {
    try {
      console.log("test");
      const data = await axios.post("https://api.timmy.dnet.ovh/users/login", {
        username: username,
        password: password,
      });
      if (data) {
        console.log("data=true");
      } else {
        console.log("data=false");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const token = "mon webtoken";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemDivider>Connexion</IonItemDivider>
        <IonItem>
          <IonInput
            value={username}
            placeholder="Username"
            onIonChange={(e) => setUsername(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            value={password}
            type="password"
            placeholder="Password"
            onIonChange={(e) => setPassword(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonButton onClick={login}>Connect</IonButton>
        <IonButton class="createaccountbutton" routerLink="/register">
          register
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
