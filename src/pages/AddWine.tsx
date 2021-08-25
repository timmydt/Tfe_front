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
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { axiosInstance } from "../helpers/axios";
import "./NotFound.css";
import { closeCircle, wineOutline } from 'ionicons/icons';

const AddWine: React.FC = () => {
  const { id } = useParams<{id: string}>()
  const [name, setName] = useState('')
  const [wines, setWines] = useState([])
  const [selectedWines, setSelectedWines] = useState([])
  const [present] = useIonAlert()
  const history = useHistory()

  function onWinePress(wine) {
    if (selected(wine.id)) {
      deleteWine(wine)
    } else {
      setSelectedWines((wines) => [...wines, wine])
    }
  }

  function deleteWine(deletedWine) {
    setSelectedWines((wines) => wines.filter(wine => wine.id !== deletedWine.id))
  }

  function selected(id) {
    return selectedWines.some(wine => wine.id === id)
  }

  async function addWineToCave() {
    await axiosInstance.post('/wine/cave/add', {
      wines: selectedWines.map(wine => wine.id),
      cave: id
    })

    present({
      header: 'Wine',
      message: selectedWines.length + ' vins ajoutés!',
      buttons: [{ text: 'Ok', handler: history.goBack }],
      onDidDismiss: history.goBack,
    })
  }

  useEffect(() => {
    if (name.length > 3) {
      axiosInstance.post('/wines', { name })
        .then(({ data: wines }) => {
          console.log(wines)
          setWines(wines)
        })
    }
  }, [name])

  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home" />
        </IonButtons>
        <IonTitle>Add wine(s) to this cave</IonTitle>
      </IonToolbar>
      <IonContent fullscreen>
        <IonSearchbar
          onIonChange={(e) => setName(e.detail.value!)}
          onIonClear={() => setWines([])}
          debounce={200}
        />

        <IonGrid>
          <IonRow>
            <IonCol>
              {selectedWines.map(wine => (
                <IonButton size="small" onClick={() => deleteWine(wine)} key={wine.id}>
                  <IonIcon slot="start" icon={closeCircle} />
                  {wine.name.substring(0, 20)}...
                </IonButton>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid>
          <IonTitle>{wines.length} vins trouvés</IonTitle>
          <IonRow>
            <IonCol>
              {wines.map((bottle) => (
                <IonCard
                  color={selected(bottle.id) ? "success" : undefined}
                  key={bottle.name}
                  onClick={() => onWinePress(bottle)}
                >
                  {bottle.picture && (
                    <div style={{ background: 'white' }}>
                      <img alt="bouteille" src={bottle.picture} style={{ height: 250, width: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <IonCardHeader>
                    <IonCardTitle>{bottle.name}</IonCardTitle>
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
                  </IonCardContent>
                </IonCard>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter className="ion-no-border">
      {selectedWines.length > 0 ? (
          <IonButton
            expand="block"
            onClick={addWineToCave}
            style={{ marginLeft: 5, marginRight: 5 }}
          >
            Ajouter {selectedWines.length} vins
          </IonButton>
      ) : (
          <IonButton
            expand="block"
            routerLink={`/cave/add/wine/${id}`}
            style={{ marginLeft: 5, marginRight: 5 }}
          >
            Créer une bouteille
          </IonButton>
      )}
      </IonFooter>
    </IonPage>
  );
};

export default AddWine;
