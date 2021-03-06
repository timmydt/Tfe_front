import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
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
import { checkmark, checkmarkCircle, pencil, star, trash } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { decode } from "../decode";
import { axiosInstance } from "../helpers/axios";

const ListCave = () => {
  let { id } = useParams<any>();
  const [cave, setCave] = useState<any>()
  const [name, setName] = useState<any>()
  const [present, dismiss] = useIonToast()
  const [owner, setOwner] = useState(false)

  async function getCave() {
    const data = await axiosInstance.get("/cave/" + id);
    setCave(data.data)
    setName(data.data.name)
  }

  useEffect(() => {
    if (cave) {
      const storedToken = localStorage.getItem('token')
      const token = decode(storedToken)
      
      setOwner(token.id === cave.creatorId)
    } 
  }, [cave])

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
          {owner ? (
            <>
              <IonInput style={{ marginLeft: 10 }} value={name} onIonChange={(e) => setName(e.detail.value!)} />
              <IonButtons slot="end">
                <IonIcon onClick={updateCaveName} icon={checkmark} size="large" style={{ marginRight: 10 }} />
              </IonButtons>
            </>
          ) : (
            <IonTitle>{cave?.name}</IonTitle>
          )}
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
                    <IonCardTitle>{bottle.name}</IonCardTitle>
                    <IonCardSubtitle>
                      <h4 style={{ marginTop: 5, marginBottom: 0, alignItems: 'center', display: 'flex' }}>{bottle.rating} <IonIcon icon={star} style={{ color: 'yellow', marginLeft: 4 }} size="small" /></h4>
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Quantité: {bottle.quantity}
                    <br />
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
                    {owner && (
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IonButton routerLink={`/wine/edit/${bottle.id}`} slot="end" size="small">
                          <IonIcon icon={pencil} />
                        </IonButton>
                        <IonButton onClick={() => deleteWine(bottle.id)} color="danger" slot="end" size="small">
                          <IonIcon icon={trash} />
                        </IonButton>
                      </div>
                    )}
                  </IonCardContent>
                </IonCard>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      {owner && (
        <IonFooter>
          <IonToolbar>
            <IonButton expand="block" routerLink={'/cave/share/'+id}>Exporter la cave</IonButton>
            <IonButton expand="block" routerLink={'/cave/add/'+id}>Add Wine</IonButton>
          </IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
};
export default ListCave;
