import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import withRouter from "../Messages/withRouter";
import {connect, useSelector} from "react-redux";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import Dropdown from "../Auth/Dropdown";
import axios from "axios";
import {PlacesAutoComplete} from "../Maps/mapDashboard";
import Modal from "../layout/Modal";
import {Navigate} from "react-router";
const valueForAdmin = [{
    value: false,
    label: 'בוגר'
},
    {
        value: true,
        label: 'מנהל'
    }]

const UserDetails = (props) => {
    const {isAdmin, userProfile, auth, currentUser,token} = props;


    const [isDisabled, setIsDisabled] = useState(true);
    const [yearData, setYearData] = useState();
    const [selected, setSelected] = useState();
    const [selectedAddress, setSelectedAddress] = useState();
    const [response,setResponse] = useState(null);
    const [state, setState] = useState({
        email: userProfile.email,
        handle:userProfile.handle,
        phoneNumber: userProfile.phoneNumber,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        address: selectedAddress ? selectedAddress : userProfile.address,
        geoAddress: selected ? selected : userProfile.geoAddress,
        work: userProfile.work,
        yearOfGraduate: userProfile.yearOfGraduate,
        isAdmin: userProfile.isAdmin,

    });
    if (!auth.uid || (currentUser.handle !== userProfile.handle && !currentUser.isAdmin)) {
        return <Navigate replace to={'/'}/>
    }



    const handleChange = (e) => {
        setState(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))

    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentUser.isAdmin) {
            axios.post('/updateuseradmin', state).then(result => {
                setResponse(result.data);
            }).catch(err => {
                setResponse(err.data);
            })
        } else {
            axios.post('/updateusernoadmin', state).then(result => {
                setResponse(result.data);
            }).catch(err => {
                console.log(err);
                setResponse(err.data);
            })
        }


    }
    const handleEdit = (e) => {
        setIsDisabled(false);
    }
    const handleCancel = (e) => {
        setIsDisabled(true);
    }
    const handleDelete = (e) => {
        // axios.post('/deleteuser', {userId:userProfile.userId,handle:userProfile.handle}).then(result => {
        //     console.log(result);
        // }).catch(err => {
        //     console.log(err);
        // })

        axios.post('/sendhttp', {token:token}).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })
    }
    const handleAdminDropdown = (event) => {
        setState(prevState => ({
            ...prevState,
            'isAdmin': event !== false,
        }));
    }
    const handleYearDropdown = (event) => {
        setState(prevState => ({
            ...prevState,
            'yearOfGraduate': event,
        }));
    };
    async function getYear() {
        const response = await axios.get('/getyearsnonew');
        setYearData(response.data);
    }
    if (!yearData){
        getYear().then(res => {
            console.log(res);
        });
    }
    return (
        <div className="bg-grey-lighter min-h-full flex flex-col py-12 px-4 sm:px-6 lg:px-8">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-1 ">
                <div className="bg-white px-1 py-8 rounded shadow-md text-black w-full rounded-lg">
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <h1 className="mb-8 text-3xl text-center">פרטי משתמש</h1>
                        <div className={"pt-5"}>
                            {currentUser.isAdmin && isDisabled === false ?
                                <Dropdown type={"סוג משתמש"} values={valueForAdmin}
                                          reference={handleAdminDropdown}/> : ''}
                            {currentUser.isAdmin && isDisabled === false ?
                                <Dropdown type={"מחזור"} values={yearData}
                                          reference={handleYearDropdown}/> : ''}
                            <div className={"text-right"}>
                                <label className={"text-sm"}>כתובת אימייל</label>
                                <input type="text" id={"email"}
                                       className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                                       name="email"
                                       placeholder="אימייל"
                                       disabled={true}
                                       value={state.email}
                                >
                                </input>
                            </div>
                            <div className={"text-right"}>
                                <label className={"text-sm"}>שם פרטי</label>
                                <input type="text" id={"firstName"}
                                       className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                                       name="firstName" placeholder="שם פרטי"
                                       disabled={isDisabled}
                                       value={state.firstName}
                                       onChange={handleChange}>
                                </input>
                            </div>
                            <div className={"text-right"}>
                                <label className={"text-sm"}>שם משפחה</label>
                                <input id={"lastName"}
                                       className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                                       name="lastName"
                                       placeholder="שם משפחה"
                                       disabled={isDisabled}
                                       value={state.lastName}
                                       onChange={handleChange}>
                                </input>
                            </div>
                            <div className={"text-right"}>
                                <label className={"text-sm"}>מספר פלאפון</label>
                                <input type="text" id={"phoneNumber"}
                                       className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                                       name="phoneNumber" placeholder="מספר טלפון"
                                       disabled={isDisabled}
                                       value={state.phoneNumber}
                                       onChange={handleChange}
                                />
                            </div>
                            <div className={"text-right"}>
                                <label className={"text-sm"}>עבודה</label>
                                <input type="text" id={"work"}
                                       className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                                       name="work"
                                       placeholder="עבודה"
                                       disabled={isDisabled}
                                       value={state.work}
                                       onChange={handleChange}
                                >
                                </input>
                            </div>
                            <div className={"text-right"}>
                                <label className={"text-sm"}>מחזור</label>
                                <input type="text" id={"yearOfGraduate"}
                                       className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                                       name="yearOfGraduate"
                                       placeholder="מחזור"
                                       disabled={true}
                                       value={state.yearOfGraduate}
                                >
                                </input>
                            </div>
                            <div className={"text-right"}>
                                <PlacesAutoComplete setSelected={setSelected} setSelectedAddress={setSelectedAddress} check={state.address} disabled={isDisabled} setState={setState}/>
                            </div>
                            {!isDisabled ? <button type="submit" id={"submit"}
                                                   className="w-full text-center py-3 rounded text-white bg-orange-400 hover:bg-orange-600 focus:outline-none my-1 text-center"
                                                   onClick={handleEdit}>
                                עדכון פרטים
                            </button>
                                : ''}
                            {!isDisabled && currentUser.isAdmin === true ? <Modal handleDelete={handleDelete}/> : ''}
                            {!isDisabled ? <button type="submit" id={"submit"}
                                                   className="w-full text-center py-3 rounded text-white bg-orange-400 hover:bg-orange-600 focus:outline-none my-1 text-center"
                                                   onClick={handleCancel}>
                                    ביטול
                                </button>
                                : ''}

                        </div>

                    </form>
                    {isDisabled ? <button type="submit" id={"submit"}
                                          className="w-full text-center py-3 rounded text-white bg-orange-400 hover:bg-orange-600 focus:outline-none my-1 text-center"
                                          onClick={handleEdit}>
                        עריכה
                    </button> : ''}

                    {response ? (response.err ? <p className={"text-red-600 text-center"}>משהו השתבש</p> : <p className={"text-blue-600 text-center"}>{response.message}</p>) : ''}
                </div>

            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    console.log(state);
    const loc = window.location.pathname;
    const handle = loc.substring(loc.lastIndexOf('/') + 1);
    const users = state.firestore.ordered.users;
    let profile, user;
    if (users) {
        profile = users.filter(user => {
            return user.handle === handle;
        });
    }
    if (users) {
        user = users.filter(user => {
            return user.handle === state.auth.handle;
        });
    }
    return {
        userProfile: profile[0],
        currentUser: user[0],
        auth: state.firebase.auth,
        isAdmin: state.auth.isAdmin,
        token:state.firebase.auth.stsTokenManager.accessToken
    }
}

export default compose(withRouter,
    connect(mapStateToProps), firestoreConnect([
        {collection: 'users'}
    ])
)(UserDetails);
