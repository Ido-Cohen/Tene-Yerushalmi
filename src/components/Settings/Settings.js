import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import {Navigate} from "react-router";
import {Table} from 'flowbite-react'
import MessageSummaryT from "../Messages/MessageSummaryT";
import {Link} from "react-router-dom";

const columns = [
    {field: "year", headerName: "מחזור", width: 70},
    {field: "email", headerName: "אימייל", width: 130},
    {field: "firstName", headerName: "שם פרטי", width: 130},
    {field: "lastName", headerName: "שם משפחה", width: 100},
    {
        field: "fullName",
        headerName: "שם מלא",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 130,
        valueGetter: (params) =>
            `${params.row.firstName || ""} ${params.row.lastName || ""}`
    },
    {field: "edit", headerName: "עריכה", width: 70},

];

const Settings = (props) => {
    const {auth, profile, users,currentUser} = props;
    if (!auth.uid) {
        return <Navigate replace to={'/signin'}/>
    }
    if (currentUser.isAdmin ===false){
        return <Navigate replace to={'/'}/>

    }

    if (!isLoaded(users)) return (<div>
        <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
                <div className="circle-clipper left">
                    <div className="circle"/>
                </div>
                <div className="gap-patch">
                    <div className="circle"/>
                </div>
                <div className="circle-clipper right">
                    <div className="circle"/>
                </div>
            </div>
        </div>
    </div>);
    return (
        <div className={"pt-2"}>

        <Table hoverable={true}>
            <Table.Head>
                {columns.map(column => {
                    return (
                        <Table.HeadCell>
                            {column.headerName}
                        </Table.HeadCell>
                    )
                })}
            </Table.Head>
            <Table.Body className="divide-y">
                {users && users.map(user => {
                    return (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {user.yearOfGraduate}
                            </Table.Cell>
                            <Table.Cell>
                                {user.email}
                            </Table.Cell>
                            <Table.Cell>
                                {user.firstName}
                            </Table.Cell>
                            <Table.Cell>
                                {user.lastName}

                            </Table.Cell>
                            <Table.Cell>
                                {user.firstName + " " + user.lastName}
                            </Table.Cell>
                            <Table.Cell>
                                <Link to={"/userProfile/" + user.handle} key={user.handle}>
                                    <span className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                        Edit
                                    </span>

                                {/*<a*/}
                                {/*    href="/tables"*/}
                                {/*    className="font-medium text-blue-600 hover:underline dark:text-blue-500"*/}
                                {/*>*/}
                                {/*    Edit*/}
                                {/*</a>*/}
                                </Link>

                            </Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
        </div>

    );
};
const mapStateToProps = (state) => {
    const users = state.firestore.ordered.users;
    let user;
    if (users) {
        user = users.filter(user => {
            return user.handle === state.auth.handle;
        });
    }
    return {
        currentUser:user[0],
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        users: state.firestore.ordered.users
    }
}
export default compose(connect(mapStateToProps), firestoreConnect([
    {
        collection: 'users'
    }
]))(Settings);
