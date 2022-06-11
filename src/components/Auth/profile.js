import React from "react";
// import Dropdown from "./Dropdown";
// import {PlacesAutoComplete} from "../Maps/mapDashboard";
// import {connect} from "react-redux";

const profile = () => {
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
                        <label type="text" id={"email"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="email"
                               placeholder="אמייל">
                        </label>
                        <label type="text" id={"firstName"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="firstName" placeholder="שם פרטי">
                        </label>
                        <label type="text" id={"lastName"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="lastName"
                               placeholder="שם משפחה">
                        </label>
                        <input type="text" id={"phoneNumber"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="phoneNumber" placeholder="מספר טלפון"
                        />
                        <label type="text" id={"work"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right" name="work"
                               placeholder="כתובת מגורים">
                        </label>
                        <input type="text" id={"work"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right" name="work"
                               placeholder="עבודה">
                        </input>
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

export default profile;