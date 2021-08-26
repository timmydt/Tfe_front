import { Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import React, { useEffect, useState } from "react";
import AuthTest from "./pages/AuthTest";
import NotFound from "./pages/NotFound";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
/* Theme variables */
import "./theme/variables.css";
import AddCave from "./pages/AddCave";
import AddNote from "./pages/AddNote";
import RecoverPassword from "./pages/RecoverPassword";
import ListCave from "./pages/ListCave";
import Note from "./pages/Note";
import EditNote from "./pages/EditNote";
import AddWine from "./pages/AddWine";
import CreateWine from "./pages/CreateWine";
import ExportCSV from "./pages/ExportCsv";
import EditWine from "./pages/EditWine";

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={AuthTest} />
            <Route path="/createCave" component={AddCave} />
            <Route path="/createNote" component={AddNote} />
            <Route path="/recover" component={RecoverPassword} />
            <Route exact path="/cave/:id" component={ListCave} />
            <Route exact path="/cave/add/:id" component={AddWine} />
            <Route exact path="/cave/add/wine/:id" component={CreateWine} />
            <Route exact path="/wine/edit/:id" component={EditWine} />
            <Route exact path="/note/:id" component={Note} />
            <Route exact path="/note/edit/:id" component={EditNote} />
            <Route exact path="/csv/export" component={ExportCSV} />
            <Route path="*" component={NotFound} />
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
