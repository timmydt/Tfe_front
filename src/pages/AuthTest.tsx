import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonList,
  IonPage,
  IonRouterLink,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { axiosInstance, clearToken } from "../helpers/axios";
import "./AuthTest.css";
import cave from "../assets/cave.jpg";
import note from "../assets/note.jpg";

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
    console.log(data);
    setCaves(data.data);
  }

  async function getNotes() {
    const data = await axiosInstance.get("/note/list");
    console.log(data);
    setNotes(data.data);
  }

  useIonViewDidEnter(() => {
    getCaves();
    getNotes();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>You are logged in ! </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonTitle style={{ marginTop: 10, marginBottom: 10 }}>
          My caves
          <IonRouterLink routerLink="/createCave">
            <IonCardSubtitle>Ajouter une cave</IonCardSubtitle>
          </IonRouterLink>
        </IonTitle>
        <img
          src={cave}
          alt=""
          style={{ height: 150, objectFit: "cover", width: "25%" }}
        />
        <IonGrid>
          <IonRow>
            <IonCol>
              {caves.map((cave) => (
                <IonCard routerLink={"/cave/" + cave.id} key={cave.id}>
                  <div style={{ padding: 15 }}>
                    <IonCardSubtitle>
                      ({cave.bottles.length} bouteilles)
                    </IonCardSubtitle>
                    <IonCardTitle>{cave.name}</IonCardTitle>
                  </div>
                </IonCard>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonTitle style={{ marginBottom: 10 }}>
          My notes
          <IonRouterLink routerLink="/createNote">
            <IonCardSubtitle>Ajouter une note</IonCardSubtitle>
          </IonRouterLink>
        </IonTitle>
        <img
          src={note}
          alt=""
          style={{ height: 150, objectFit: "cover", width: "100%" }}
        />
        <IonGrid>
          <IonRow>
            <IonCol>
              {notes.map((note) => (
                <IonCard routerLink={`/note/${note.id}`} key={note.id}>
                  <img src={note.picture} alt="" />
                  <IonCardHeader>
                    <IonCardSubtitle>Ma note</IonCardSubtitle>
                    <IonCardTitle>{note.name}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              ))}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton onClick={logout} routerLink="/">
                Logout
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AuthTest;
