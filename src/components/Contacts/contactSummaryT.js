import React from 'react';

const contactSummaryT = ({user}) => {
    return (
        // <div>
        <>
            <figure className={"bg-white h-80 rounded-lg shadow-md pt-7"}>

                <img className={"w-32 h-32 rounded-full mx-auto"}
                     src={"https://randomuser.me/api/portraits/women/28.jpg"}
                    alt={user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}/>

                <figcaption className={"text-center mt-5"}>
                    <p className={"text-gray-700 font-semibold text-xl mb-2"}>
                        {user.firstName + " " + user.lastName}
                    </p>

                    <p className={"text-gray-500"}>
                        <span className={"font-medium"}>0509999999</span>
                    </p>

                    <p className={"text-gray-500"}>
                        <span className={"font-medium"}>{user.email}</span>
                    </p>

                    <p className={"text-gray-500"}>
                        <span className={"font-medium"}>עיר מגורים:</span> ירושלים
                    </p>
                </figcaption>

            </figure>

        </>

       // </div>
    );
};

export default contactSummaryT;
