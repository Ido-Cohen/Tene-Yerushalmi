import React, {Component} from 'react';
import MessageList from "../Messages/MessageListT";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Navigate} from "react-router";

class Dashboard extends Component {
    render() {
        const {messages, auth} = this.props;
        if (!auth.uid) {
            return <Navigate replace to={'/signin'}/>
        }
        return (
            <div className={"dashboard container justify-center"}>

                {/*nav bar*/}
                <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
                    <div className="container flex flex-row-reverse flex-wrap justify-between items-center mx-auto">


                        <div className="flex md:order-2">
                            <button type="button" data-collapse-toggle="mobile-menu-3" aria-controls="mobile-menu-3"
                                    aria-expanded="false"
                                    className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">

                                </svg>
                            </button>
                            <div className="hidden relative md:block">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">

                                    </svg>
                                </div>
                                <input type="text" id="search-navbar"
                                       className="text-right block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="חיפוש"/>
                            </div>
                            <button data-collapse-toggle="mobile-menu-3" type="button"
                                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                    aria-controls="mobile-menu-3" aria-expanded="false">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">

                                </svg>
                                <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">

                                </svg>
                            </button>
                        </div>


                        <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
                             id="mobile-menu-3">
                            <div className="relative mt-3 md:hidden">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                    </svg>
                                </div>
                                <input type="text" id="search-navbar"
                                       className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="Search..."/>
                            </div>

                            <div className={"flex"}>
                                <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                                    <li>
                                        <a href="#"
                                           className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                           aria-current="page">הודעות</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">בנק
                                            זמן</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">כללי</a>
                                    </li>
                                </ul>
                            </div>


                        </div>
                    </div>
                </nav>


                <div className={"row"}>
                    <MessageList messages={messages}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.firestore.ordered.messages,
        auth: state.firebase.auth,
    }
}
export default compose(connect(mapStateToProps), firestoreConnect([
    {
        collection: 'messages'
    }
]))(Dashboard);
