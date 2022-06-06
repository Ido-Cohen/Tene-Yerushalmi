import React from "react";
import {LockClosedIcon} from "@heroicons/react/solid";

const CreateMessageT = (props) => {
    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 white pt-5 rounded-lg ">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">שליחת הודעה</h2>
                    <p className="text-center">
                        ניתן לשלוח הודעה כללית והודעה למחזור מסויים
                    </p>
                </div>
                <form className="mt-8 ">
                    <input type="hidden" name="remember" defaultValue="true"/>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                שם מחזור
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                autoComplete="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-right"
                                placeholder="מספר מחזור"
                            />
                        </div>
                        <div className="relative w-full mb-3 text-right">
                            <textarea rows={4} cols={80} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full text-right" placeholder="הקלד הודעה" defaultValue={""} />
                        </div>
                        <div className="flex justify-center items-center w-full pt-5">
                            <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center max-w-md w-full h-53 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                    <svg className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-white">
                                        <span className="font-semibold">לחץ כדי להעלות קובץ </span>
                                         או גרור לכאן
                                    </p>
                                    <p className="text-base text-gray-500 dark:text-white"> jpg, pnj, docx, pdf :מהפורמט הבא </p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" required/>
                            </label>
                        </div>
                    </div>
                    <div className={"pb-5"}>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            שליחת הודעה
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateMessageT;