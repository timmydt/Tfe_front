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
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Register.css";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [mail, setMail] = useState<string>();
  const [first_name, setFirstName] = useState<string>();
  const [last_name, setLastName] = useState<string>();
  let history = useHistory();

  async function createUser() {
    console.log("je crée un utilisateur");
    const data = await axios.post("https://api.timmy.dnet.ovh/users/create", {
      username: username,
      password: password,
      mail: mail,
      first_name: first_name,
      last_name: last_name,
    });
    console.log(data);

    if (data) {
      history.push("/login");
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemDivider>Create account</IonItemDivider>
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
            placeholder="Password"
            type="password"
            onIonChange={(e) => setPassword(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            value={mail}
            placeholder="E-Mail"
            onIonChange={(e) => setMail(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            value={first_name}
            placeholder="First Name"
            onIonChange={(e) => setFirstName(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            value={last_name}
            placeholder="Last Name"
            onIonChange={(e) => setLastName(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonButton onClick={createUser}>Register</IonButton>
        <IonButton class="cancelbutton" routerLink="/">
          Cancel
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;
