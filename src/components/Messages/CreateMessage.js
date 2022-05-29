import React, {Component, useState} from 'react';
import {connect} from "react-redux";
import {createMessage} from "../../store/actions/messageActions";
import {Navigate} from "react-router";
import {useNavigate} from "react-router";

const CreateMessage = (props) => {
    const {auth, createMessage} = props;
    const [state, setState] = useState({title: '', content: ''});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setState(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createMessage(state);
        navigate('/');
    }

    if (!auth.uid) {
        return <Navigate replace to={'/signin'}/>
    }
    return (
        <div className={"container"}>
            <form className={"white right-align"} onSubmit={handleSubmit}>
                <h5 className={"grey-text text-darken-3"}>שליחת הודעה</h5>
                <div className={"input-field"}>
                    <label htmlFor={"title"} >כותרת</label>
                    <input type={"text"} id={"title"} onChange={handleChange}/>
                </div>
                <div className={"input-field"}>
                    <label htmlFor={"content"}>תוכן ההודעה</label>
                    <textarea className={"materialize-textarea"} id={"content"} onChange={handleChange}/>
                </div>
                <div className={"input-field"}>
                    <button className={"btn pink lighten-1 z-depth-0"}>שליחת הודעה</button>
                </div>
            </form>
        </div>
    );

}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createMessage: (message) => dispatch(createMessage(message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessage);