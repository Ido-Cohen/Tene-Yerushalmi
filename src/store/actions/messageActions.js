

export const createMessage = (message) => {
  return (dispatch,getState,{getFirebase,getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('messages').add({
        ...message,
        authorFirstName:profile.firstName,
        authorLastName:profile.lastName,
        authorId:authorId,
        createdAt: new Date()
    }).then(()=> {
        dispatch({type:"CREATE_MSG",message});
    }).catch((err) => {
        dispatch({type: "CREATE_MSG_ERROR", err})
    })
  }
}