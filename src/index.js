import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import './index.css';
import {legacy_createStore as createStore} from 'redux'
import {applyMiddleware, compose} from "redux";
import rootReducer from "./store/reducers/rootReducer";
import {Provider, useSelector} from "react-redux";
import thunk from "redux-thunk";
import {ReactReduxFirebaseProvider, getFirebase, isLoaded} from "react-redux-firebase";
import {
    reduxFirestore,
    getFirestore,
    createFirestoreInstance,
} from "redux-firestore";
import fbConfig from "./config/fbConfig";
import firebase from "firebase/compat/app";
import registerServiceWorker from './registerServiceWorker';
import AppLogout from "./components/Auth/Logout";
import store, {Persistor} from "./store/reducers/store";
import {PersistGate} from 'redux-persist/integration/react'
import {useLoadScript} from "@react-google-maps/api";

//
// const store = createStore(
//     rootReducer,
//     compose(
//         applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
//         reduxFirestore(firebase, fbConfig)
//     )
// );


const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}


const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
    presence: 'presence',
    sessions: 'sessions'
}

function AuthIsLoaded({children}) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return (<div>
        <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
                <div className="circle-clipper left">
                    <div className="circle"/>
                </div>
                <div className="gap-patch">
                    <div className="circle"/>
                </div>
                <div className="circle-clipper right">
                    <div className="circle"/>
                </div>
            </div>
        </div>
    </div>);
    return children
}
function MapIsLoaded({children}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ['places']

    })
    if (!isLoaded) return (<div>
        <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
                <div className="circle-clipper left">
                    <div className="circle"/>
                </div>
                <div className="gap-patch">
                    <div className="circle"/>
                </div>
                <div className="circle-clipper right">
                    <div className="circle"/>
                </div>
            </div>
        </div>
    </div>);
    return children
}

ReactDOM.render(
    <Provider store={store}>

        <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded>
                <MapIsLoaded>

                    <AppLogout>
                        <PersistGate Loading={null} persistor={Persistor}>
                            <App/>
                        </PersistGate>
                    </AppLogout>
                </MapIsLoaded>

            </AuthIsLoaded>
        </ReactReduxFirebaseProvider>

    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
