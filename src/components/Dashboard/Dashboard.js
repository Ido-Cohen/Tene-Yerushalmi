import React, {Component, useEffect, useState} from 'react';
import MessageList from "../Messages/MessageList";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Navigate} from "react-router";

const Dashboard = (props) => {
    const {messages, auth} = props;
    if (!auth.uid) {
        return <Navigate replace to={'/signin'}/>
    }
    let sorted;
    if (messages) {
        sorted = messages.slice().sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
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
    return {
        messages: state.firestore.ordered.messages,
        auth: state.firebase.auth,
    }
}
export default compose(connect(mapStateToProps), firestoreConnect([
    {
        collection: 'messages'
    }
]))(Dashboard);
