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
import { setToken, axiosInstance } from "../helpers/axios";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  let history = useHistory();

  async function login() {
    try {
      const res = await axiosInstance.post("/users/login", {
        username: username,
        password: password,
      });

      if (res) {
        setToken(res.data.token);
        console.log("connected");
        localStorage.setItem("token", res.data.token);
        history.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getCaves() {
    const caves = await axiosInstance.get("/cave/list");
    console.log(caves);
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
        <IonButton onClick={getCaves}>getCaves</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
