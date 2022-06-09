import firebase from "firebase/compat/app";

import getAuth from '@firebase/auth';
export const signIn = (credentials) => {
    return (dispatch,getState,{getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({type :'LOGIN_SUCCESS'})
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR',err})
        });
    }
}

export const signOut = () => {
    return (dispatch,getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({type:'SIGNOUT_SUCCESS'})
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch,getState,{getFirebase,getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                email:newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials:newUser.firstName[0] + newUser.lastName[0]
            })
        }).then(() => {
            dispatch({type: 'SIGNUP_SUCCESS'})
        }).catch(err => {
            dispatch({type:'SIGNUP_ERROR',err})
        })
    }
}

export const setIsNewUser = (uid) => {
    return (dispatch,getState,{getFirebase,getFirestore}) => {
        const firestore = getFirestore();
        console.log(uid);
        firestore.collection('users').doc(uid).update({isNewUser:false})
            .then(() => {
                dispatch({type: "CHANGED"})
            })
            .catch((err) => {
                dispatch({type: "ERROR", err})
            });
    }
}

const reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
}

export const changePassword = async (currentPassword, newPassword) => {
    let passwordChanged = false;
    await reauthenticate(currentPassword).then(() => {
        var user = firebase.auth().currentUser;
        user.updatePassword(newPassword).then(() => {
            console.log("Password updated!");
            passwordChanged = true;
        }).catch((error) => {
            console.log(error.message);
        });
    }).catch((error) => {
        console.log(error.message);
    });
    return passwordChanged;
}

export const changeEmail = (currentPassword, newEmail) => {
    reauthenticate(currentPassword).then(() => {
        var user = firebase.auth().currentUser;
        user.updateEmail(newEmail).then(() => {
            console.log("Email updated!");
        }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
}

export const passwordReset = (email) => {
    return firebase.auth().sendPasswordResetEmail(email);
  return (dispatch,getState,{getFirebase,getFirestore}) => {
      const firebase = getFirebase();
      const firestore = getFirestore();

      firebase.auth().createUserWithEmailAndPassword(
          newUser.email,
          newUser.password
      ).then((resp) => {
          console.log(resp.user.uid);
         return firestore.collection('users').doc(resp.user.uid).set({
              ...newUser,
              initials:newUser.firstName[0] + newUser.lastName[0]
          });
      }).then(() => {
          dispatch({type: 'SIGNUP_SUCCESS'})
      }).catch(err => {
          dispatch({type:'SIGNUP_ERROR',err})
      })
  }
}