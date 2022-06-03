import React from "react";


const AddGroupT  = (props) => {
    return(
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-md w-full space-y-8 white pt-5 rounded-lg ">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">העלת קובץ בוגרים חדש</h2>
                <form>
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300 text-right">שם המחזור</label>
                        <input type="number" id="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right" placeholder="לדוגמא: 2" required />
                    </div>
                    <div className="flex justify-center items-center w-full pt-5">
                        <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center max-w-md w-full h-53 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                <svg className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">לחץ כדי להעלות קובץ</span> או גרור לכאן</p>
                                <p className="text-base text-gray-500 dark:text-gray-400"> excel :מהפורמט הבא </p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" required/>
                        </label>
                    </div>
                    <div id={"upload"} className="center-align" >
                        <button type="submit" className="text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-blue-800 ">העלה</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddGroupT;






