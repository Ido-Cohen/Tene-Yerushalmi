import React, {useState} from 'react';
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import withRouter from './withRouter';
import {Navigate, useNavigate} from "react-router";
import moment from "moment";
import {deleteMessage} from "../../store/actions/messageActions";

const MessageDetails = (props) => {
    const {message, auth} = props;
    const navigate = useNavigate();
    if (!auth.uid) {
        return <Navigate replace to={'/signin'}/>
    }
    const handleDelete = (e, id, deleteMessage) => {
        e.preventDefault()
        deleteMessage(id)
        navigate('/');
    }

    if (message) {
        return (
            <div className={"container section message-details"}>
                <div className={"card z-depth-0"}>
                    <div className={"card-content"}>
                        <span className="card-title">{message.title}</span>
                        <p>{message.content}</p>
                    </div>
                    <div className={"card-action gret lighten-4 grey-text"}>
                        <div>Posted by {message.authorFirstName} {message.authorLastName}</div>
                        <div>{moment(message.createdAt.toDate()).calendar()}</div>
                    </div>
                    <div className="card-action">
                        <a onClick={(e) => handleDelete(e, props.router.params.id, props.deleteMessage)}>
                            <i className="medium material-icons">delete</i>
                        </a>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container center">
                <p className={"blue-text text-darken-2"}>Loading project...</p>
                <div className="progress">
                    <div className="indeterminate"/>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.router.params.id
    const messages = state.firestore.data.messages;
    const message = messages ? messages[id] : null;
    return {
        message: message,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteMessage: (message) => dispatch(deleteMessage(message))
    }
}

export default compose(withRouter,
    connect(mapStateToProps, mapDispatchToProps), firestoreConnect([
        {collection: 'messages'}
    ])
)(MessageDetails);


