import React, {useRef, useState} from 'react';
import {compose} from "redux";
import emailjs from '@emailjs/browser';
import {signUp} from "../../store/actions/authActions";
import {connect} from "react-redux";

const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const passwordLength = 6;
let params;
const AddGroup = (props) => {
    // const csv2json = require('../csv2json.js');
    const form = useRef();
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    let studentDetails = {
        email: '',
        password: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        parentsAddress: '',
        workAt: '',
        isNewUser:null,
        gen:''
    };
    const [yearOfGraduate, setYearOfGraduate] = useState('');
    var regex = new RegExp("(.*?)\.(csv)$");
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
        console.log(selectedFile);
        var reader = new FileReader();
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
            fileText = fileText.replace("תעסוקה", "workAt");
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
                params = {
                    email: student.email,
                    name: student.firstName,
                    from_name: 'Tene',
                    password: student.password
                }
                studentDetails = ({

                    email: student.email,
                    password: student.password,
                    phoneNumber: student.phoneNumber,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    parentsAddress: student.parentsAddress,
                    workAt: student.workAt,
                    isNewUser:true,
                    gen:student.gen
                });
                console.log(studentDetails);
                // sendEmail();
                signUp(studentDetails);
            })
            console.log(json);
        }

    };
    const sendEmail = (e) => {
        emailjs.send('service_gjoy0f9', 'template_5shs7pl', params, 'egcBMN9brtXo-NsSr')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };
    return (
        <div className={"container"}>


            <form className={"white right-align"}>
                <h5 className={"grey-text text-darken-3"}>הוספת קבוצה</h5>
                <div className={"input-field"}>
                    <label htmlFor={"yearOfGraduate"}>שם קבוצה</label>
                    <input type={"text"} id={"yearOfGraduate"} onChange={(e) => {
                        setYearOfGraduate(e.target.value)
                    }}/>
                </div>
                <div className={"input-field"}>
                    <input type={"file"} name={"file"} accept={".csv"} onChange={changeHandler}/>
                </div>
                <div>
                    <div onClick={(e) => {handleSubmission(e,props.signUp)}} className={"btn orange lighten-1 z-depth-0"}>טעינה</div>
                </div>

            </form>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}
export default connect(null, mapDispatchToProps)(AddGroup);


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