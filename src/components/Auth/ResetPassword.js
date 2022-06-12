import React, {Component, useState} from 'react';
import {connect} from "react-redux";
import {createMessage} from "../../store/actions/messageActions";
import {Navigate} from "react-router";
import {passwordReset} from "../../store/actions/authActions";
import axios from "axios";

const CreateMessage = (props) => {
    const {auth, passwordReset} = props;
    const [email, setEmail] = useState("");
    const [response,setResponse] = useState(null);

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/resetpassword',{email: email}).then(res =>{
            setResponse(res.data);
        }).catch(err => {
            console.log(err);
            setResponse(err);
        })
        // passwordReset(state);
        // window.open('/signin');
    }

    if (auth.uid) {
        return <Navigate replace to={'/'}/>
    }
    return (
        <div className="blue-grey-text min-h-full flex flex-col py-12 px-4 sm:px-6 lg:px-8">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-1 ">
                <div className="bg-blue px-1 py-8 rounded shadow-md text-black w-full rounded-lg bg-white/90">
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <h2 className="mb-8 text-3xl text-center">איפוס סיסמה</h2>
                        <input type="text" id={"email"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="email"
                               placeholder="אימייל"
                               onChange={handleChange}
                        />
                        <button type="submit" id={"submit"}
                                className="w-full text-center py-3 rounded text-white bg-orange-400 hover:bg-orange-600 focus:outline-none my-1 text-center">
                            איפוס חשבון
                        </button>
                    </form>
                    {response ? (response.err ? <p className={"text-red-600 text-center"}>משהו השתבש</p> : <p className={"text-blue-600 text-center"}>{response.success}</p>) : ''}
                </div>
            </div>
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
        passwordReset: (email) => dispatch(passwordReset(email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessage);