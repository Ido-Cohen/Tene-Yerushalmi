import React from 'react';
import {Link} from "react-router-dom";
import MessageSummary from "../Messages/MessageSummary";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {Navigate, useNavigate} from "react-router";
import ContactSummary from "./contactSummary";

const ContactList = (props) => {
    const {users, auth} = props;
    if (!auth.uid) {
        return <Navigate replace to={'/signin'}/>
    }
    return (
        <div className={"container center"}>
            <div className={"message-list section"}>
                {users && users.map(user => {
                    return (
                            <ContactSummary user={user} key={user.email}/>
                    );
                })}
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return{
        users: state.firestore.ordered.users,
        auth: state.firebase.auth,
    }
}
export default compose(connect(mapStateToProps),firestoreConnect([
    {
        collection:'users'
    }
]))(ContactList);
