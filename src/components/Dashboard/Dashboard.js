import React,{Component} from 'react';
import MessageList from "../Messages/MessageList";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Navigate} from "react-router";

const Dashboard = (props) => {
    const {messages, auth,isAdmin,currentUser} = props;
    if (!auth.uid) {
        return <Navigate replace to={'/signin'}/>
    }
    let sorted;
    if (messages) {
        sorted = messages.slice().sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
        if (!isAdmin){
            sorted = sorted.filter(msg => {
                return msg?.yearOfGraduate === currentUser[0]?.yearOfGraduate;
            })
        }
    }
    return (
        <div className={"dashboard container"}>
            <div className={"row"}>
                <MessageList messages={sorted}/>
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
]))(Dashboard);
