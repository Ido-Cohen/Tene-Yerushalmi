import React from 'react';

const contactSummary = ({user}) => {
    return (
        <div>
            <div className={"card z-depth-0 project-summary"}>
                <div className={"card-content grey-text text-darken-3"}>
                    <span className={"card-title left-align"}>{user.firstName +" " + user.lastName}</span>
                    <p className={"left-align"}>Email: {user.email}</p>

                </div>
            </div>
        </div>
    );
};

export default contactSummary;
