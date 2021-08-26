import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCardSubtitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { axiosInstance } from "../helpers/axios";
import "./NotFound.css"

const ExportCSV: React.FC = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    (async () => {
      const { data: csv } = await axiosInstance.get('/users/csv')
      setData(csv)
    })()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Exporter les datas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel>
              <h1>Export des vins</h1>
              <a href={data?.bottlesURI}>Télécharger</a>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h1>Export des caves</h1>
              <a href={data?.cavesURI}>Télécharger</a>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h1>Export des notes</h1>
              <a href={data?.notesURI}>Télécharger</a>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ExportCSV;
