import React,{Component} from 'react';
import Notifications from "./Notifications"
import MessageList from "../Messages/MessageList";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Navigate} from "react-router";

class Dashboard extends Component{
    render(){
        const {messages,auth} = this.props;
        if (!auth.uid){
            return <Navigate replace to={'/signin'}/>
        }
        return (
            <div className={"dashboard container"}>
                <div className={"row"}>
                    <div className={"col s12 m6"}>
                        <MessageList messages={messages} />
                    </div>
                    <div className={"col s12 m5 offset-m1"}>
                        <Notifications/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return{
      // messages: state.message.messages
      messages: state.firestore.ordered.messages,
      auth: state.firebase.auth,
  }
}
export default compose(connect(mapStateToProps),firestoreConnect([
    {
        collection:'messages'
    }
]))(Dashboard);
