import React from 'react';

const contactSummaryT = ({user}) => {
    return (
        // <div>
        <>
            <figure className={"bg-white h-80 rounded-lg shadow-md pt-7"}>

                {user?.profileImage ?  <img className={"w-32 h-32 rounded-full mx-auto"}
                      src={user?.profileImage}
                      alt={user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}/> : <p className={"btn btn-floating ring-emerald-400 lighten-1 btn-large font-semibold"}>{user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}</p>}

                <figcaption className={"text-center mt-5"}>
                    <p className={"text-gray-700 font-semibold text-xl mb-2"}>
                        {user.firstName + " " + user.lastName}
                    </p>

                    <p className={"text-gray-500"}>
                        <span className={"font-medium"}>{user.phoneNumber}</span>
                    </p>

                    <p className={"text-gray-500"}>
                        <span className={"font-medium"}>{user.email}</span>
                    </p>

                    <p className={"text-gray-500"}>
                        <span className={"font-medium"}>עיר מגורים:</span>
                        ירושלים
                    </p>
                </figcaption>

            </figure>

        </>

       // </div>
    );
};

export default contactSummaryT;
