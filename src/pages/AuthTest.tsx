import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { axiosInstance, clearToken } from "../helpers/axios";
import "./AuthTest.css";

const AuthTest = () => {
  const [caves, setCaves] = useState([]);
  const [notes, setNotes] = useState([]);

  async function logout() {
    clearToken();
    localStorage.removeItem("token");
    console.log("disconnected");
  }

  async function getCaves() {
    const data = await axiosInstance.get("/cave/list");
    setCaves(data.data);
  }

  async function getNotes() {
    const data = await axiosInstance.get("/note/list");
    setNotes(data.data);
  }

  useEffect(() => {
    getCaves();
    getNotes();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>You are logged in !</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItemDivider>My caves</IonItemDivider>
              <IonItem>
                <IonButton>+</IonButton>
                <IonButton>🗑️</IonButton>
              </IonItem>
              <IonItem>
                <IonList>
                  {caves.map((cave) => (
                    <li key={cave.id}>{cave.name}</li>
                  ))}
                </IonList>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItemDivider>My notes</IonItemDivider>
              <IonItem>
                <IonButton>+</IonButton>
                <IonButton>🗑️</IonButton>
              </IonItem>
              <IonItem>
                <IonList>
                  {notes.map((note) => (
                    <li key={note.id}>{note.name}</li>
                  ))}
                </IonList>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonButton onClick={logout} routerLink="/">
          log out
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AuthTest;
