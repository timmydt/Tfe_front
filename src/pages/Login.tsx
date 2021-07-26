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
import React from "react";
import { useState } from "react";
import "./Login.css";
import axios from "axios";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  async function login() {
    try {
      console.log("test");
      const res = await axios.post("https://api.timmy.dnet.ovh/users/login", {
        username: username,
        password: password,
      });

      if (res) {
        const instance = axios.create({
          baseURL: "https://api.timmy.dnet.ovh",
          timeout: 3000,
          headers: { Authorization: res.data.token },
        });
        console.log(Headers);
        console.log(instance);
      }
    } catch (error) {
      console.log(error);
    }
  }

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

export default Login;
