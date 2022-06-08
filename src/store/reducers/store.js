import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./rootReducer";
import {persistStore,persistReducer} from "redux-persist";

import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";
import {getFirebase} from "react-redux-firebase";
import {getFirestore, reduxFirestore} from "redux-firestore";
import firebase from "firebase/compat/app";
import fbConfig from "../../config/fbConfig";

const persistConfig ={
    key: 'main-root',
    storage,
}
const persistedReducer = persistReducer(persistConfig,rootReducer);

const store = createStore(persistedReducer,compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(firebase, fbConfig)
));

const Persistor = persistStore(store);

export {Persistor};
export default store;