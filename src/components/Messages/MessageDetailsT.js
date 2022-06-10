import React, {useState} from 'react';
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import withRouter from './withRouter';
import {Navigate, useNavigate} from "react-router";
import moment from "moment";
import {deleteMessage} from "../../store/actions/messageActions";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";

const MessageDetails = (props) => {
    const {message, auth} = props;
    const navigate = useNavigate();
    if (!auth.uid) {
        return <Navigate replace to={'/signin'}/>
    }
    const handleDelete = (e, id, deleteMessage) => {
        e.preventDefault()
        deleteMessage(id)
        navigate('/');
    }

    if (message) {
        return (
        <div className="shadow-md bg-gray-800 text-gray-200 m-8 p-6 rounded" x-data="{open: false}">
            <div className="flex items-center flex-row-reverse justify-between">

                <div className="flex items-center flex-row-reverse">
                    <div className={"flex items-center flex-row-reverse mb-1 ml-1"}>

                        <Avatar sx={{ bgcolor: red[500], marginLeft: 2, marginRight: 2}} aria-label="recipe">
                            BN
                        </Avatar>

                        <h1 className="text-2xl font-semibold mr-4">{message.title}</h1>

                    </div>
                </div>
                {/* Button for opening card */}

                <div className={"w-80 flex-"}>
                    <div>Posted by {message.authorFirstName} {message.authorLastName}</div>
                    <div>{moment(message.createdAt.toDate()).calendar()}</div>
                </div>
        </div>
        {/* Collapsed content */}
            <div className="w-full flex flex-col mt-8 text-right mb-4 border-y-gray-200 border-gray-700">
                <hr className="mb-4 border-gray-700" />
                <p className={"text-right"}>
                    בירושלים ישודרגו קווים מרכזיים המחברים בין השכונות למרכז העיר ולמרכזי פנאי ועסקים, בעוד שבגוש דן יופעלו מספר קווים חדשים ותתוגבר פעילות קווים קיימים. גם באשדוד יופעלו שני קווים עירוניים חדשים ובקווים אחרים ישונה המסלול ותתוגבר התדירות. באשקלון ישודרגו שלושה קווים בינעירוניים ובגליל יופעלו שני קווים חדשים ומהירים בין עכו לחיפה ובין חיפה לצפת. רשימת כלל הקווים החדשים והמשודרגים מופיעה באתר משרד התחבורה.

                    יש להזכיר כי שדרוג הפעילות מגיע דווקא בזמן שנהגי חברות התחבורה הציבורית השונות מאיימים להמשיך ולהשבית את השירות לפחות למשך שלוש שעות בכל יום שני, כחלק מהמאבק להעלאת שכרם.

                    לדברי שרת התחבורה והבטיחות בדרכים, ח"כ מרב מיכאלי: "כל קו אוטובוס חדש הוא פחות רכבים פרטיים על הכביש. צעד אחר צעד נטה את היחס לטובת התח
                </p>

                <hr className="mt-4 border-gray-700" />
        </div>

        <div className="card-action border-gray-700"><a onClick={(e) => handleDelete(e, props.router.params.id, props.deleteMessage)}>

            <i className="medium material-icons">delete</i>

        </a></div>
    </div>
        );
    } else {
        return (
            <div className="container center">
                <p className={"blue-text text-darken-2"}>Loading project...</p>
                <div className="progress">
                    <div className="indeterminate"/>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.router.params.id
    const messages = state.firestore.data.messages;
    const message = messages ? messages[id] : null;
    return {
        message: message,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteMessage: (message) => dispatch(deleteMessage(message))
    }
}

export default compose(withRouter,
    connect(mapStateToProps, mapDispatchToProps), firestoreConnect([
        {collection: 'messages'}
    ])
)(MessageDetails);


