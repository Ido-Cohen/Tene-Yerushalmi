import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import './index.css';
import { legacy_createStore as createStore} from 'redux'
import { applyMiddleware, compose } from "redux";
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

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(firebase, fbConfig)
    )
);



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

function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return <div>Loading Screen...</div>;
    return children
}


ReactDOM.render(
    <Provider store={store}>

            <ReactReduxFirebaseProvider {...rrfProps}>
                <AuthIsLoaded>
                    <App />
                </AuthIsLoaded>
            </ReactReduxFirebaseProvider>

    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
