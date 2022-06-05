export const createGroup = (group) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('users').add({
            ...group,
        }).then(() => {
            dispatch({type: "CREATE_MSG", group});
        }).catch((err) => {
            dispatch({type: "CREATE_MSG_ERROR", err})
        })
    }
}