import React, {Component, useState} from 'react';
import {connect} from "react-redux";
import {changePassword, signIn} from "../../store/actions/authActions";
import {Navigate} from "react-router";
import {createMessage} from "../../store/actions/messageActions";
import moment from "moment";
import ChangePassword from "./ChangePassword";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
// import firebase from "firebase/compat/app";

let passError = '';
const NewUserLandingPage = (props) => {

    const {authError, auth, users, handle} = props;
    console.log(users);
    if (!auth.uid || !users) {
        return <Navigate replace to={'/signin'}/>
    }
    if (users && !users[handle]?.isNewUser){
        return <Navigate replace to={'/'}/>
    }



    return (
        <div className={"container"}>
            <h4 className={"center-align grey-text text-darken-3"}>
                שלום {users[handle]?.firstName}, ברוכים הבאים לאפליקציית הבוגרים של טנא ירושלמי
            </h4>
            <h6 className={"center-align grey-text text-darken-3"}>
                .זוהי התחברות ראשונה, עליך לבחור סיסמא חדשה
                ולעדכן מספר נוסף של פרטים.
            </h6>
            <ChangePassword/>
        </div>
    );
}
const mapStateToProps = (state) => {
    console.log(state)
    // console.log(state.firestore.data.users[state.firebase.auth.uid]);
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth,
        users: state.firestore.ordered.users,
        handle: state.auth.handle
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createMessage: (message) => dispatch(createMessage(message))
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect([
    {
        collection: 'messages'

    }, {
        collection: 'users'
    }
]))(NewUserLandingPage);