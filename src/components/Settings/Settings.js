import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {Link} from "react-router-dom";
import MessageSummary from "../Messages/MessageSummary";

const Settings = (props) => {
    const {auth,profile,users} = props;
    console.log(users);
    return (

        <div className={"settings container center"}>

            <table>
                <thead>
                <tr>
                    <th>Email</th>
                    <th>First name</th>
                    <th>Last name</th>
                </tr>
                </thead>

                <tbody>
                {users && users.map(user => {
                    console.log(user)
                    return (
                        <tr>
                            <td>{user.email}</td>
                            <td>{profile.firstName}</td>
                            <td>{profile.lastName}</td>
                            <i className="small material-icons">edit</i>
                        </tr>
                    );
                })}

                </tbody>
            </table>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        users: state.firestore.ordered.users
    }
}
export default compose(connect(mapStateToProps),firestoreConnect([
    {
        collection:'users'
    }
]))(Settings);
