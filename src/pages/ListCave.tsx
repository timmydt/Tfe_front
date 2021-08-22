import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonPage,
  IonRow,
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
          <IonRow>
            {cave?.bottles.map((bottle) => (
              <IonCard key={bottle.name}>
                <IonCardHeader>
                  <IonCardTitle>Name : {bottle.name}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Best before : {bottle.best_before}
                  <br />
                  Food combination : {bottle.food}
                  <br />
                  Grapes : {bottle.grapes}
                  <br />
                  Maker : {bottle.maker}
                  <br />
                  Year : {bottle.year}
                  <br />
                  <img alt="bouteille" src={bottle.picture} />
                  <br />
                </IonCardContent>
              </IonCard>
            ))}
          </IonRow>
        </IonItemDivider>
        <IonButton>Add Wine</IonButton>
        <IonButton>Edit cave</IonButton>
        <IonButton routerLink="/home">Cancel</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default ListCave;
