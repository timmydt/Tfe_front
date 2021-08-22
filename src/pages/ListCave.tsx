import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { checkmark, checkmarkCircle, trash } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosInstance } from "../helpers/axios";

const ListCave = () => {
  let { id } = useParams<any>();
  const [cave, setCave] = useState<any>()
  const [name, setName] = useState<any>()
  const [present, dismiss] = useIonToast()

  async function getCave() {
    const data = await axiosInstance.get("/cave/" + id);
    setCave(data.data)
    setName(data.data.name)
  }

  useEffect(() => {
    getCave()
  }, [])

  async function deleteWine(wineId) {
    await axiosInstance.delete('/wine/cave/'+wineId)

    setCave((cave) => ({
      ...cave,
      bottles: cave.bottles.filter(wine => wine.id !== wineId)
    }))
  }

  async function updateCaveName() {
    await axiosInstance.put('/cave/update', { name, id })

    present({
      buttons: [{ text: 'Ok', handler: () => dismiss() }],
      message: 'Nom de la cave mis à jour',
      color: 'success'
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonInput style={{ marginLeft: 10 }} value={name} onIonChange={(e) => setName(e.detail.value!)} />
          <IonButtons slot="end">
            <IonIcon onClick={updateCaveName} icon={checkmark} size="large" style={{ marginRight: 10 }} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              {cave?.bottles.map((bottle) => (
                <IonCard key={bottle.name}>
                  {bottle.picture && <img alt="bouteille" src={bottle.picture} style={{ height: 200, width: '100%', objectFit: 'cover' }} />}
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
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IonButton onClick={() => deleteWine(bottle.id)} color="danger" slot="end" size="small">
                        <IonIcon icon={trash} />
                      </IonButton>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton expand="block" routerLink={'/cave/add/'+id}>Add Wine</IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
export default ListCave;
