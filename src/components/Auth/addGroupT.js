import React, {useState} from "react";
import csv2json from "csvjson-csv2json";
import axios from "axios";
import {Navigate} from "react-router";
import {connect} from "react-redux";

const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const passwordLength = 6;
const AddGroupT  = (props) => {
    const {auth} = props
    const [selectedFile, setSelectedFile] = useState("");
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [yearOfGraduate, setYearOfGraduate] = useState("");
    let studentDetails = {
        email: '',
        password: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        parentsAddress: '',
        work: '',
        isNewUser:true,
        gen:''
    };
    if (!auth.uid) {
        return <Navigate replace to={'/signin'}/>
    }
    const regex = new RegExp("(.*?)\.(csv)$");
    const changeHandler = (event) => {
        if (!(regex.test(event.target.value.toLowerCase()))) {
            event.target.value = '';
            alert('Please select correct file format');
            setIsFilePicked(false);
            return;
        }

        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    const handleSubmission = (e,signUp) => {
        e.preventDefault();
        if (!isFilePicked) {
            alert("please select file");
            return;
        }
        if (yearOfGraduate === ""){
            alert("אין שם לקבוצה");
            return;
        }
        console.log(selectedFile);
        const reader = new FileReader();
        reader.readAsText(selectedFile);
        let fileText;
        reader.onload = function () {
            fileText = reader.result;
            fileText = fileText.substring(fileText.indexOf("Name"));
            fileText = fileText.indexOf(",,,,,,,,,,,,,,,,") !== -1 ? fileText.substring(0, fileText.indexOf(",,,,,,,,,,,,,,,,")) : fileText;
            // fileText = fileText.substring(0, fileText.indexOf(",,,,,,,,,,,,,,,,"));
            fileText = fileText.replace("Name", "firstName");
            fileText = fileText.replace("משפחה", "lastName");
            fileText = fileText.replace("מין", "gen");
            fileText = fileText.replace("פלאפון", "phoneNumber");
            fileText = fileText.replace("כתובת של ההורים (Text)", "parentsAddress");
            fileText = fileText.replace("מקום מגורים נוכחי", "address");
            fileText = fileText.replace("מייל", "email");
            fileText = fileText.replace("לימודים", "studies");
            fileText = fileText.replace("תעסוקה", "work");
            // console.log(fileText);
            const csv2json = require('csvjson-csv2json');
            let json = csv2json(fileText, {parseNumbers: false});
            json.forEach((student) => {
                delete student['מלווה'];
                delete student['מעגל צבא'];
                delete student['משקיע'];
                delete student['שחרור'];
                delete student['שירות צבאי'];
                delete student['שלוחה'];
                delete student['תוכניות מיוחדות/מלגות'];
                delete student.Subitems;
                student.password = generatePassword();
                student.isNewUser = true;
                student.email = student.email.toLowerCase();
            })
            json = json.filter((e) => {
                return validateEmail(e.email);
            })
            json.forEach((student) => {
                studentDetails = {

                    email: student.email,
                    handle: student.email.substring(0, student.email.lastIndexOf("@")),
                    password: student.password,
                    phoneNumber: student.phoneNumber,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    parentsAddress: student.parentsAddress,
                    work: student.work,
                    isNewUser:true,
                    gen:student.gen,
                    isAdmin: false,
                    yearOfGraduate
                };

                axios.post("/signup",studentDetails)
                    .then((res) => console.log(res))

            })
        }

    };
    return(
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-md w-full space-y-8 white pt-5 rounded-lg ">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">העלאת קובץ בוגרים חדש</h2>
                <form onSubmit={(event => {handleSubmission(event)})}>
                    <div className="mb-6">
                        <label htmlFor={"yearOfGraduate"} className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300 text-right">שם המחזור</label>
                        <input type="text" pattern="[0-9]*" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right" placeholder="לדוגמא: 3" required value={yearOfGraduate} id={"yearOfGraduate"}
                               onChange={(e) => setYearOfGraduate( e.target.value.replace(/\D/,''))}/>
                    </div>
                    <div className="flex justify-center items-center w-full pt-5">
                        <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center max-w-md w-full h-53 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                <svg className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-white">
                                    <span className="font-semibold">לחץ כדי להעלות קובץ </span>
                                    או גרור לכאן
                                </p>
                                <p className="text-base text-gray-500 dark:text-white"> csv :מהפורמט הבא </p>
                                {<p className={"text-blue-500 text-xl"}>{selectedFile.name}</p>}
                            </div>
                            <input id="dropzone-file" type="file" required onChange={changeHandler} className={"hidden"}/>
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

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
    }
}
export default connect(mapStateToProps, null)(AddGroupT);

function generatePassword() {
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};






