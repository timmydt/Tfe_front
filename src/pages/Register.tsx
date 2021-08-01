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
  useIonAlert,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../helpers/axios";
import "./Register.css";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [mail, setMail] = useState<string>();
  const [first_name, setFirstName] = useState<string>();
  const [last_name, setLastName] = useState<string>();
  let history = useHistory();
  const [errorText] = useIonAlert();

  async function createUser() {
    try {
      const data = await axiosInstance.post("/users/create", {
        username: username,
        password: password,
        mail: mail,
        first_name: first_name,
        last_name: last_name,
      });

      if (data) {
        history.push("/");
      }
    } catch (error) {
      if (error.response.status === 400) {
        errorText({ message: "There is one field missing", buttons: ["ok"] });
      }
      if (error.response.status === 401) {
        errorText({ message: "Username already used", buttons: ["ok"] });
      }
      if (error.response.status === 402) {
        errorText({ message: "Mail already used", buttons: ["ok"] });
      }
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
        <IonItemDivider>Create account ( * are mendatory )</IonItemDivider>
        <IonItem>
          <IonInput
            value={username}
            placeholder="Username (*)"
            onIonChange={(e) => setUsername(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            value={password}
            placeholder="Password (*)"
            type="password"
            onIonChange={(e) => setPassword(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            value={mail}
            placeholder="E-Mail (*)"
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
