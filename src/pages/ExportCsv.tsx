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
  const [caveCsv, setCaveCsv] = useState(null)
  const [wineCsv, setWineCsv] = useState(null)
  const [present, dismiss] = useIonToast()
  const history = useHistory()

  console.log(caveCsv, wineCsv)

  function openFileDialog(id: string) {
    document.getElementById(id).click()
  }

  function onFile(e, s) {
    s(e.target.files[0])
  }

  async function importCsv() {
    try {
      const formData = new FormData()
      formData.append('caveCsv', caveCsv)
      formData.append('wineCsv', wineCsv)
      
      const { data } = await axiosInstance.post('/users/csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      history.goBack()

      present({
        buttons: [{ text: 'Ok', handler: dismiss}],
        message: data.message,
        color: 'success',
        duration: 3000
      })
    } catch (error) {
      present({
        buttons: [{ text: 'Ok', handler: dismiss}],
        message: 'Une erreur est survenue...',
        color: 'danger',
        duration: 3000
      })
    }
  }

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

          <IonItem>
            <IonTitle>Import des CSV</IonTitle>
          </IonItem>
          <IonItem>
            <IonLabel>Caves</IonLabel>
            {caveCsv ? (
              <IonText><strong>{caveCsv.name}</strong> uploadé</IonText>
            ) : (
              <IonButton onClick={() => openFileDialog('file-upload-cave')}>Upload</IonButton>
            )}
            <input
              type="file"
              id="file-upload-cave"
              style={{ display: "none" }}
              onChange={(e) => onFile(e, setCaveCsv)}
            />
          </IonItem>
          <IonItem>
            <IonLabel>Vins</IonLabel>
            {wineCsv ? (
              <IonText><strong>{wineCsv.name}</strong> uploadé</IonText>
            ) : (
              <IonButton onClick={() => openFileDialog('file-upload-wine')}>Upload</IonButton>
            )}
            <input
              type="file"
              id="file-upload-wine"
              style={{ display: "none" }}
              onChange={(e) => onFile(e, setWineCsv)}
            />
          </IonItem>
            <IonButton
              disabled={!wineCsv || !caveCsv}
              expand="full"
              onClick={importCsv}
            >
              Importer
            </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ExportCSV;
