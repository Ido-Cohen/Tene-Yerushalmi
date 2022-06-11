import React, {Component} from 'react';
import MessageList from "../Messages/MessageListT";
import {connect, useSelector} from "react-redux";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import {compose} from "redux";
import {Navigate} from "react-router";
import MessageListT from "../Messages/MessageListT";

const DashboardT = (props) => {

    const {messages, auth, currentUser, isAdmin} = props;
    const checkStore = useSelector(state => state.firestore.ordered.users)
    if (!isLoaded(checkStore) && auth.uid){
        return (<div>
            <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"/>
                    </div>
                    <div className="gap-patch">
                        <div className="circle"/>
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle"/>
                    </div>
                </div>
            </div>
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
                return msg?.yearOfGraduate === currentUser[0]?.yearOfGraduate;
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
