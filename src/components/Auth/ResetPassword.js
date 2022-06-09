import React, {Component, useState} from 'react';
import {connect} from "react-redux";
import {createMessage} from "../../store/actions/messageActions";
import {Navigate} from "react-router";
import {passwordReset} from "../../store/actions/authActions";

const CreateMessage = (props) => {
    const {auth, passwordReset} = props;
    const [state, setState] = useState('');

    const handleChange = (e) => {
        setState(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        passwordReset(state);
        // window.open('/signin');
    }

    if (auth.uid) {
        return <Navigate replace to={'/'}/>
    }
    return (
        // <div className={"container"}>
        //     <form className={"white right-align"} onSubmit={handleSubmit}>
        //         <h5 className={"grey-text text-darken-3"}>איפוס סיסמא</h5>
        //         <div className={"input-field"}>
        //             <label htmlFor={"email"} >Email</label>
        //             <input type={"email"} id={"email"} onChange={handleChange}/>
        //         </div>
        //         <div className={"input-field"}>
        //             <button className={"btn pink lighten-1 z-depth-0"}>איפוס סיסמא</button>
        //         </div>
        //     </form>
        // </div>

        <div className="blue-grey-text min-h-full flex flex-col py-12 px-4 sm:px-6 lg:px-8">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-1 ">
                <div className="bg-blue px-1 py-8 rounded shadow-md text-black w-full rounded-lg">
                    <form className="mt-8 space-y-6">
                        <h2 className="mb-8 text-3xl text-center">איפוס סיסמה</h2>
                        <input type="text" id={"email"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="email"
                               placeholder="אימייל"
                        />
                        <button type="submit" id={"submit"}
                                className="w-full text-center py-3 rounded text-white bg-orange-400 hover:bg-orange-600 focus:outline-none my-1 text-center">
                            איפוס חשבון
                        </button>
                    </form>
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