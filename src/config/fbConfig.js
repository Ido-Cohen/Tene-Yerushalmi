import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_WXC0srVMhnq6sZf47wl_N4DdJsw0uxk",
    authDomain: "eladtrying.firebaseapp.com",
    projectId: "eladtrying",
    storageBucket: "eladtrying.appspot.com",
    messagingSenderId: "257765845494",
    appId: "1:257765845494:web:855d20365ad6f3ac0abfd7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

