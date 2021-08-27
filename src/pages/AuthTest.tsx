import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRouterLink,
  IonRow,
  IonTitle,
  IonToolbar,
  isPlatform,
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
  const [caves, setCaves] = useState([])
  const [notes, setNotes] = useState([])
  const [sharedCaves, setSharedCaves] = useState([])

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

  async function getSharedCaves() {
    const {data} = await axiosInstance.get("/sharedCaves")
    setSharedCaves(data)
  }

  useIonViewDidEnter(() => {
    getCaves();
    getNotes();
    getSharedCaves()
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>You are logged in ! </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ padding: 8 }}>
          {sharedCaves.length > 0 && (
            <>
              <IonLabel>
                <h1>Caves partagées</h1>
              </IonLabel>

              {sharedCaves.map((cave) => (
                <IonCard routerLink={"/cave/" + cave.id} key={cave.id}>
                  <div style={{ padding: 15 }}>
                    <IonCardSubtitle>
                      <strong>{cave.creator.username}</strong> - ({cave.bottles.length} bouteilles)
                    </IonCardSubtitle>
                    <IonCardTitle>{cave.name}</IonCardTitle>
                  </div>
                </IonCard>
              ))}
            </>
          )}

          <IonLabel>
            <h1>My caves</h1>
            <IonRouterLink routerLink="/createCave">
              <h2>Ajouter une cave</h2>
            </IonRouterLink>
          </IonLabel>

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

          <IonLabel style={{ marginBottom: 10 }}>
            <h1>My notes</h1>
            <IonRouterLink routerLink="/createNote">
              <h2>Ajouter une note</h2>
            </IonRouterLink>
          </IonLabel>

          {notes.map((note) => (
            <IonCard routerLink={`/note/${note.id}`} key={note.id}>
              <img src={note.picture} alt="" />
              <IonCardHeader>
                <IonCardSubtitle>Ma note</IonCardSubtitle>
                <IonCardTitle>{note.name}</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          ))}

          <IonButton onClick={logout} routerLink="/">
            Logout
          </IonButton>
        </div>
      </IonContent>
      <IonFooter>
        <IonButton
          expand="block"
          routerLink="/csv/export"
          style={{ marginLeft: 5, marginRight: 5 }}>
          CSV
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default AuthTest;
