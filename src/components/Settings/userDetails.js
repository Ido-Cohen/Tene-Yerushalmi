import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import withRouter from "../Messages/withRouter";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import Dropdown from "../Auth/Dropdown";

const valueForAdmin = [{
    value: false,
    label: 'בוגר'
},
    {
        value: true,
        label: 'מנהל'
    }]
const UserDetails = (props) => {
    const {isAdmin, userProfile} = props;
    const [isDisabled, setIsDisabled] = useState(true);
    const [state, setState] = useState({
        email: userProfile.email,
        phoneNumber: userProfile.phoneNumber,
        firstName: '',
        lastName: '',
        address: '',
        work: '',
        yearOfGraduate: '',
        isAdmin: '',
        isNewUser: true,
        isNewYear: false
    });
    const handleState = (e) => {
        setState(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))

    }
    const handleSubmit = (e) => {
        e.preventDefault();

    }
    const handleEdit = (e) => {
        setIsDisabled(false);
    }
    const handleAdminDropdown = (value) => {

    }
    return (
        <div className="bg-grey-lighter min-h-full flex flex-col py-12 px-4 sm:px-6 lg:px-8">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-1 ">
                <div className="bg-white px-1 py-8 rounded shadow-md text-black w-full rounded-lg">
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <h1 className="mb-8 text-3xl text-center">פרטים</h1>
                        <div className={"pt-5"}>

                            <div className={"text-right"}>
                                <label className={"text-sm"}>כתובת אימייל</label>
                                <input type="text" id={"email"}
                                       className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                                       name="email"
                                       placeholder="אימייל"
                                       disabled={true}
                                       value={userProfile[0]?.email}>
                                </input>
                            </div>
                            <div className={"text-right"}>
                                <label className={"text-sm"}>שם פרטי</label>
                                <input type="text" id={"firstName"}
                                       className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                                       name="firstName" placeholder="שם פרטי"
                                       disabled={isDisabled}
                                       value={userProfile[0]?.firstName}>
                                </input>
                            </div>
                            <div className={"text-right"}>
                                <label className={"text-sm"}>שם משפחה</label>
                                <input id={"lastName"}
                                       className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                                       name="lastName"
                                       placeholder="שם משפחה"
                                       disabled={isDisabled}
                                       value={userProfile[0]?.lastName}>
                                </input>
                            </div>
                            <div className={"text-right"}>
                                <label className={"text-sm"}>מספר פלאפון</label>
                                <input type="text" id={"phoneNumber"}
                                       className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                                       name="phoneNumber" placeholder="מספר טלפון"
                                       disabled={isDisabled}
                                       value={userProfile[0]?.phoneNumber}
                                />
                            </div>
                            <div className={"text-right"}>
                                <label className={"text-sm"}>עבודה</label>
                                <input type="text" id={"work"}
                                       className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                                       name="work"
                                       placeholder="כתובת מגורים"
                                       disabled={isDisabled}
                                       value={userProfile[0]?.work}
                                >
                                </input>
                            </div>
                            <div className={"text-right"}>
                                <label className={"text-sm"}>כתובת</label>
                                <input type="text" id={"work"}
                                       className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                                       name="work"
                                       placeholder="כתובת"
                                       disabled={isDisabled}
                                       value={userProfile[0]?.address}>

                                </input>
                            </div>
                            {userProfile.isAdmin ? <Dropdown type={"סוג משתמש"} values={valueForAdmin}
                                                             reference={handleAdminDropdown}/> : ''}

                            {!isDisabled ? <button type="submit" id={"submit"}
                                                   className="w-full text-center py-3 rounded text-white bg-orange-400 hover:bg-orange-600 focus:outline-none my-1 text-center"
                                                   onClick={handleEdit}>
                                עדכון פרטים
                            </button> : ''}
                        </div>

                    </form>
                    {isDisabled ? <button type="submit" id={"submit"}
                                          className="w-full text-center py-3 rounded text-white bg-orange-400 hover:bg-orange-600 focus:outline-none my-1 text-center"
                                          onClick={handleEdit}>
                        עריכה
                    </button> : ''}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const loc = window.location.pathname;
    const handle = loc.substring(loc.lastIndexOf('/') + 1);
    const users = state.firestore.ordered.users;
    let profile;
    if (users) {
        profile = users.filter(user => {
            return user.handle === handle;
        });
    }
    return {
        userProfile: profile,
        auth: state.firebase.auth,
        isAdmin: state.auth.isAdmin
    }
}
export default compose(withRouter,
    connect(mapStateToProps), firestoreConnect([
        {collection: 'users'}
    ])
)(UserDetails);
