import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import MessageSummary from "../Messages/MessageSummary";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {Navigate} from "react-router";
import ContactSummaryT from "./contactSummaryT";

const ContactsListT = (props) => {
    const {users, auth} = props;
    const [filterQuery,setFilterQuery] =useState(null);
    const [contactsList,setContactsList] =useState(null);
    useEffect(() => {
        if (filterQuery){
            const queryString = filterQuery.toLowerCase();
            const filterData = users?.filter(user => {
                const fullName = `${user.firstName} ${user.lastName}`
                if (queryString.length === 1){
                    const firstLetter= fullName[0].toLowerCase();
                    return firstLetter === queryString;
                }
                else {
                    return fullName.toLowerCase().includes(queryString);
                }
            })
            setContactsList(filterData);
        }
        else {
            setContactsList(users);
        }
    }, [users,filterQuery]);

    if (!auth.uid) {
        return <Navigate replace to={'/signin'}/>
    }
    return (
        <div className={"container center bg-white flex justify-center"}>

            <div className={"flex-row w-11/12"}>

                <div className="relative mt-1 flex justify-end p-5 rounded-md">
                    <div className={"w-48 text-right justify-end"}>
                        <input type="text" id="table-search"
                               className="text-right bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="חיפוש"
                        onChange={(e) => {setFilterQuery(e.target.value)}}/>
                    </div>
                </div>

                <div className={"message-list section bg-gray-200 p-20 grid md:grid-cols-4 sm:grid-cols-2 gap-6"}>
                    {contactsList && contactsList.map(user => {
                        return (
                            <ContactSummaryT user={user} key={user.email} />
                        );
                    })}
                </div>
            </div>

        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users,
        auth: state.firebase.auth
    }
}

export default compose(connect(mapStateToProps), firestoreConnect([
    {
        collection: 'users'
    }
]))(ContactsListT);
