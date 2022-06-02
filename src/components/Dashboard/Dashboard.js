import React,{Component} from 'react';
import MessageList from "../Messages/MessageList";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Navigate} from "react-router";

class Dashboard extends Component{
    render(){
        const {messages,auth, users} = this.props;
        if (!auth.uid){
            return <Navigate replace to={'/signin'}/>
        }
        if (users && users[auth.uid].isNewUser){
            return <Navigate replace to={'/reset-password/new-user'}/>;
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
      users: state.firestore.data.users
  }
}
export default compose(connect(mapStateToProps),firestoreConnect([
    {
        collection:'messages'
    },{
        collection:'users'
    }
]))(Dashboard);
