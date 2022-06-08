import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyB_WXC0srVMhnq6sZf47wl_N4DdJsw0uxk",
//     authDomain: "eladtrying.firebaseapp.com",
//     projectId: "eladtrying",
//     storageBucket: "eladtrying.appspot.com",
//     messagingSenderId: "257765845494",
//     appId: "1:257765845494:web:855d20365ad6f3ac0abfd7"
// };
const firebaseConfig = {
    apiKey: "AIzaSyBPdS86nZSlJ8pyN5uW3tvUeRhOq4PDM_A",
    authDomain: "teneproject.firebaseapp.com",
    projectId: "teneproject",
    storageBucket: "teneproject.appspot.com",
    messagingSenderId: "539143633294",
    appId: "1:539143633294:web:91929994b598b7b1034cdf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

