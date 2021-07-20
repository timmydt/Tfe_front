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
import { useState } from "react";
import "./Home.css";
import axios from "axios";

const Home: React.FC = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  async function login() {
    console.log("je me log");
    const data = await axios.post("http://localhost:4000/users/login", {
      username: username,
      password: password,
    });
    console.log(data);
  }

  function create() {
    //redirect vers CreateAccount.tsx
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
        <IonButton onClick={create} class="createaccountbutton">
          {" "}
          Créer un compte{" "}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
