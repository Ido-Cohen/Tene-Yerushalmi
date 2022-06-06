import {LockClosedIcon} from '@heroicons/react/solid'
import React, {useState} from "react";
import {signIn} from "../../store/actions/authActions";
import {connect} from "react-redux";
import {Navigate} from "react-router";


const SignInT = (props) => {
    const [state, setState] = useState({email: '', password: ''})
    const {authError, auth} = props;
    const handleChange = (e) => {
        setState(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.signIn(state);
    }
    if (auth.uid) {
        return <Navigate replace to={'/'}/>
    }
    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 white pt-5 rounded-lg ">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src={"/../../../img/tenelogo.png"}
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">התחברות לאתר הבוגרים</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => {
                    handleSubmit(e)
                }}>
                    <input type="hidden" name="remember" defaultValue="true"/>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-right"
                                placeholder="כתובת מייל"
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-right"
                                placeholder="סיסמה"
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end pt-5">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 text-right">
                                ?שכחת סיסמה
                            </a>
                        </div>
                    </div>

                    <div className={"pb-5"}>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-white group-hover:text-white" aria-hidden="true"/>
                </span>
                            התחברות
                        </button>
                    </div>
                    <div className={"red-text center"}>
                        {authError ? <p>{authError}</p> : null}
                    </div>
                </form>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInT);