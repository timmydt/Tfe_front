import {
  IonButton,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosInstance } from "../helpers/axios";

const ListCave = () => {
  let { id } = useParams<any>();
  const [cave, setCave] = useState<any>();

  async function getCave() {
    const data = await axiosInstance.get("/cave/" + id);
    setCave(data.data);
  }

  useEffect(() => {
    getCave();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{cave?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemDivider>
          <IonItem></IonItem>
        </IonItemDivider>
        <IonButton>Add Wine</IonButton>
        <IonButton>Edit cave</IonButton>
        <IonButton routerLink="/home">Cancel</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default ListCave;
