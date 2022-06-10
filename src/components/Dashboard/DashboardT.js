import React, {Component} from 'react';
import MessageList from "../Messages/MessageListT";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Navigate} from "react-router";
import MessageListT from "../Messages/MessageListT";

class DashboardT extends Component {
    render() {
        const {messages, auth} = this.props;
        if (!auth.uid) {
            return <Navigate replace to={'/signin'}/>
        }
        return (
            <div className={"dashboard container justify-center"}>

                {/*nav bar*/}



                <div className={"row"}>
                    <MessageListT messages={messages}/>
                </div>
            </div>
        )
    }
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
]))(DashboardT);
