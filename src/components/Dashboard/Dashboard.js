import React,{Component} from 'react';
import MessageList from "../Messages/MessageList";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Navigate} from "react-router";
import AppLogout from "../Auth/Logout";

class Dashboard extends Component{
    render(){
        const {messages,auth} = this.props;
        if (!auth.uid){
            return <Navigate replace to={'/signin'}/>
        }
        return (

            <div className={"dashboard container"}>
                <div className={"row"}>
                        <MessageList messages={messages} />
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
  return{
      messages: state.firestore.ordered.messages,
      auth: state.firebase.auth,
  }
}
export default compose(connect(mapStateToProps),firestoreConnect([
    {
        collection:'messages'
    }
]))(Dashboard);
