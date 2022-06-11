import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import withRouter from "../Messages/withRouter";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";

const UserDetails = (props) => {
    const {isAdmin,currentUser} = props;
    const [isDisabled,setIsDisabled] = useState(true);

    return (
        <div className="bg-grey-lighter min-h-full flex flex-col py-12 px-4 sm:px-6 lg:px-8">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-1 ">
                <div className="bg-white px-1 py-8 rounded shadow-md text-black w-full rounded-lg">
                    <form className="mt-8 space-y-6">
                        <h1 className="mb-8 text-3xl text-center">פרטים</h1>
                        <div className="float-right">
                            {/*<Dropdown type={"סוג משתמש"} values={valueForAdmin} reference={handleAdminDropdown}/>*/}
                        </div>
                        <div className={'float left'}>
                            {/*{state.isAdmin === false && yearData ?*/}
                            {/*    <Dropdown type={"מחזור"} values={yearData} reference={handleYearDropdown}/> : ''}*/}
                        </div>
                        <div className={"text-right"}>
                            <label className={"text-sm"}>כתובת אימייל</label>
                            <input type="text" id={"email"}
                                   className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                                   name="email"
                                   placeholder="אימייל"
                                   disabled={isDisabled}
                                    value={currentUser[0]?.email}>
                            </input>
                        </div>
                        <div className={"text-right"}>
                            <label className={"text-sm"}>שם פרטי</label>
                        <input type="text" id={"firstName"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="firstName" placeholder="שם פרטי"
                               disabled={isDisabled}
                               value={currentUser[0]?.firstName}>
                        </input>
                        </div>
                        <div className={"text-right"}>
                            <label className={"text-sm"}>שם משפחה</label>
                        <input id={"lastName"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="lastName"
                               placeholder="שם משפחה"
                               disabled={isDisabled}
                               value={currentUser[0]?.lastName}>
                        </input>
                        </div>
                        <div className={"text-right"}>
                            <label className={"text-sm"}>מספר פלאפון</label>
                        <input type="text" id={"phoneNumber"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="phoneNumber" placeholder="מספר טלפון"
                               disabled={isDisabled}
                               value={currentUser[0]?.phoneNumber}
                        />
                        </div>
                        <div className={"text-right"}>
                            <label className={"text-sm"}>עבודה</label>
                        <input type="text" id={"work"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right" name="work"
                               placeholder="כתובת מגורים"
                               disabled={isDisabled}
                               value={currentUser[0]?.work}
                        >
                        </input>
                        </div>
                        <div className={"text-right"}>
                            <label className={"text-sm"}>כתובת</label>
                        <input type="text" id={"work"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right" name="work"
                               placeholder="כתובת"
                               disabled={isDisabled}
                               value={currentUser[0]?.address}>

                        </input>
                        </div>
                        <button type="submit" id={"submit"}
                                className="w-full text-center py-3 rounded text-white bg-orange-400 hover:bg-orange-600 focus:outline-none my-1 text-center">
                            עדכון נתונים
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const loc = window.location.pathname;
    console.log(loc.substring(loc.lastIndexOf('/') + 1))
    const handle = loc.substring(loc.lastIndexOf('/') + 1);
    const users = state.firestore.ordered.users;
    let user;
    if (users) {
        user = users.filter(user => {
            return user.handle === handle;
        });
    }
    return {
        currentUser:user,
        auth: state.firebase.auth,
        isAdmin:state.auth.isAdmin
    }
}
export default compose(withRouter,
    connect(mapStateToProps), firestoreConnect([
        {collection: 'users'}
    ])
)(UserDetails);
