import {getFirebase} from "react-redux-firebase";
import {getFirestore} from "redux-firestore";


export const createMessage = (message) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('messages').add({
            ...message,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            yearOfGraduate:profile.yearOfGraduate,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({type: "CREATE_MSG", message});
        }).catch((err) => {
            dispatch({type: "CREATE_MSG_ERROR", err})
        })
    }
}
export const deleteMessage = (message) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('messages').doc(message).delete()
            .then(() => {
                dispatch({type: "DELETE_MSG", message})
            })
            .catch((err) => {
                dispatch({type: "DELETE_MSG_ERROR", err})
            });
    }
}