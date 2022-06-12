import React, {Component} from 'react';
import MessageList from "../Messages/MessageListT";
import {connect, useSelector} from "react-redux";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import {compose} from "redux";
import {Navigate} from "react-router";
import MessageListT from "../Messages/MessageListT";
import {Button, Spinner} from "flowbite-react";

const DashboardT = (props) => {

    const {messages, auth, currentUser, isAdmin} = props;
    const checkStore = useSelector(state => state.firestore.ordered.users)
    if (!isLoaded(checkStore) && auth.uid){
        return (<div className="flex flex-row gap-3 align-middle">
            <Button>
                <Spinner aria-label="Spinner button example" />
                <span className="pl-3">
      Loading...
    </span>
            </Button>
            <Button color="gray">
                <Spinner aria-label="Alternate spinner button example" />
                <span className="pl-3">
      Loading...
    </span>
            </Button>
        </div>);
    }
    if (!auth.uid) {
        return <Navigate replace to={'/signin'}/>
    }
    if (currentUser && currentUser[0].isNewUser) {
        return <Navigate replace to={'/reset-password/new-user'}/>
    }
    let sorted;
    if (currentUser && messages) {
        sorted = messages.slice().sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
        if (!isAdmin) {
            sorted = sorted.filter(msg => {
                return msg?.yearOfGraduate === currentUser[0]?.yearOfGraduate || msg?.yearOfGraduate === null;
            })
        }
    }
    return (
        <div className={"dashboard container justify-center"}>
            <div className={"row"}>
                <MessageListT messages={sorted}/>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    const handle = state.auth.handle;
    const users = state.firestore.ordered.users;
    let user;
    if (users) {
        user = users.filter(user => {
            return user.handle === handle;
        });
    }
    return {
        messages: state.firestore.ordered.messages,
        auth: state.firebase.auth,
        isAdmin: state.auth.isAdmin,
        currentUser: user
    }
}
export default compose(connect(mapStateToProps), firestoreConnect([
    {
        collection: 'messages'
    }, {
        collection: 'users'
    }
]))(DashboardT);
