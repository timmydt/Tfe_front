import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonViewDidEnter,
} from "@ionic/react";
import { star } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { axiosInstance } from "../helpers/axios";
import "./NotFound.css"

const EditWine: React.FC = () => {
  const { id } = useParams<{id: string}>()
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [food, setFood] = useState('')
  const [grapes, setGrapes] = useState('')
  const [year, setYear] = useState('')
  const [maker, setMaker] = useState('')
  const [image, setImage] = useState()
  const [preview, setPreview] = useState()
  const [rating, setRating] = useState(0)
  const [quantity, setQuantity] = useState()
  const [present, dismiss] = useIonToast()
  const history = useHistory()

  function openFileDialog() {
    document.getElementById("file-upload").click()
  }

  async function onImage(e) {
    const reader = new FileReader();
    reader.onload = (event:any) => {
      setPreview(event.target.result)
    }
    reader.readAsDataURL(e.target.files[0]);
    setImage(e.target.files[0])
  }

  const setText = (setter) => (e) => {
    setter(e.detail.value!)
  }

  const editWine = async () => {
    const data = new FormData()

    data.append('id', id)
    data.append('name', name)
    data.append('best_before', date)
    data.append('food', food.split('\r').join('|'))
    data.append('grapes', grapes)
    data.append('maker', maker)
    data.append('picture', image)
    data.append('year', year)
    data.append('quantity', quantity)

    await axiosInstance.put('/wine', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    history.goBack()

    present({
      buttons: [{ text: 'Ok', handler: dismiss}],
      message: 'Vin edité!',
      color: 'success',
      duration: 3000
    })
  }

  useIonViewDidEnter(async () => {
    const { data: wine } = await axiosInstance.get(`/wine/${id}`)

    setName(wine.name)
    setDate(wine.best_before)
    setFood(wine.food)
    setGrapes(wine.grapes)
    setYear(wine.year)
    setPreview(wine.picture)
    setMaker(wine.maker)
    setRating(wine.rating)
    setQuantity(wine.quantity)
  }, [])

  async function handleRating(value: number) {
    setRating(value)

    await axiosInstance.post('/wine/rate', { rating: value, id })

    present({
      buttons: [{ text: 'Ok', handler: dismiss}],
      message: `Noté à ${value} étoiles`,
      color: 'success',
      duration: 1000
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/cave/add/${id}`} />
          </IonButtons>
          <IonTitle>Add wine(s) to this cave</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Quantity</IonLabel>
            <IonInput value={quantity} type="number" onIonChange={setText(setQuantity)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput value={name} onIonChange={setText(setName)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Best before</IonLabel>
            <IonInput type="date" value={date} onIonChange={setText(setDate)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Food</IonLabel>
            <IonTextarea rows={5} value={food} onIonChange={setText(setFood)}></IonTextarea>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Grapes</IonLabel>
            <IonInput value={grapes} onIonChange={setText(setGrapes)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Maker</IonLabel>
            <IonInput value={maker} onIonChange={setText(setMaker)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Picture</IonLabel>
            {(image || preview) ? (
              <img src={preview} alt="" onClick={openFileDialog} />
            ) : (
              <IonButton onClick={openFileDialog}>Caméra</IonButton>
            )}
          </IonItem>
          <input
            type="file"
            id="file-upload"
            style={{ display: "none" }}
            onChange={onImage}
          />
          <IonItem>
            <IonLabel position="stacked">Year</IonLabel>
            <IonInput value={year} type="number" onIonChange={setText(setYear)}></IonInput>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <div style={{ alignItems: 'center', display: 'flex', marginLeft: 8 }}>
          <span><h3 style={{ margin: 0, marginRight: 5 }}>Note: </h3></span>
          <IonIcon
            icon={star}
            style={{ color: rating >= 1 ? 'yellow' : 'grey' }}
            size="large"
            onClick={() => handleRating(1)}
          />
          <IonIcon
            icon={star}
            style={{ color: rating >= 2 ? 'yellow' : 'grey' }}
            size="large"
            onClick={() => handleRating(2)}
          />
          <IonIcon
            icon={star}
            style={{ color: rating >= 3 ? 'yellow' : 'grey' }}
            size="large"
            onClick={() => handleRating(3)}
          />
          <IonIcon
            icon={star}
            style={{ color: rating >= 4 ? 'yellow' : 'grey' }}
            size="large"
            onClick={() => handleRating(4)}
          />
          <IonIcon
            icon={star}
            style={{ color: rating >= 5 ? 'yellow' : 'grey' }}
            size="large"
            onClick={() => handleRating(5)}
          />
        </div>
        <IonButton
          expand="block"
          onClick={editWine}
          style={{ marginLeft: 5, marginRight: 5 }}
        >
          Editer
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default EditWine;
