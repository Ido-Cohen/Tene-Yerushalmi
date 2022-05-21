import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import {Link} from "react-router-dom";
import MessageSummary from "../Messages/MessageSummary";
import {Navigate} from "react-router";
import { DataGrid } from "@mui/x-data-grid";
const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
        field: "fullName",
        headerName: "Full name",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ""} ${params.row.lastName || ""}`
    }
];

const Settings = (props) => {
    const {auth,profile,users} = props;
    if (!auth.uid) {
        return <Navigate replace to={'/signin'}/>
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

    let rowId = 1;
    const rows = users && users.map(user => {
        return {id:rowId++,lastName:user.lastName,firstName:user.firstName,email:user.email}
    });
    return (

        <div className={"settings container center"}>

            <div style={{ height: 600, width: "100%" ,background:"white"}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        users: state.firestore.ordered.users
    }
}
export default compose(connect(mapStateToProps),firestoreConnect([
    {
        collection:'users'
    }
]))(Settings);
