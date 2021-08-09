import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { useHistory } from "react-router";

const ListCave = () => {
  let history = useHistory();
  const [errorText] = useIonAlert();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add a new note</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton routerLink="/home">Cancel</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default ListCave;
