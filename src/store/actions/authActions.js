
export const signIn = (credentials) => {
  return (dispatch,getState,{getFirebase}) => {
      const firebase = getFirebase();
      firebase.auth().signInWithEmailAndPassword(
          credentials.email,
          credentials.password
      ).then(() => {
          firebase.auth().currentUser.getIdTokenResult().then(token => {
              dispatch({type :'LOGIN_SUCCESS',admin:token.claims.admin,handle:credentials.email.substring(0,credentials.email.lastIndexOf('@'))})
          })
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