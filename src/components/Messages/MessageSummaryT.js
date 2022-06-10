import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const MessageSummary = ({message}) => {
    return (

        <Card sx={{ maxWidth: 345 }}>
            <CardHeader className={"text-right flex-row-reverse"}
                avatar={
                    <Avatar sx={{ bgcolor: red[500], marginLeft: 2, marginRight: -2}} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="שלום"
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="194"
                image="https://i.postimg.cc/tg3B4NS8/ido.png"
                alt="Paella dish" //do hidden if no pic ?
            />



            <CardContent>
                <Typography className={"line-clamp-3"} style={{height: 70}} align="right" variant="body2" color="text.secondary">
                    "אני חושבת שאם ניר אורבך אכן מדבר עם הליכוד, אז חבל. ניר אורבך זוכה להערכה רבה בקואליציה הזאת, גם במפלגת העבודה יש לנו קשרים מאוד טובים איתו. אני חושבת שתרומתו לקואליציה החשובה הזאת היא אדירה ואני ממש קוראת לו להיות שותף לשמירה עליה ולא לפירוקה. ממש קוראת לו באמצעותכם, ואומרת לכן ולכם, אם השותפה והשותפים ירצו לקיים את הקואליציה, אין שום סיבה שהיא לא תמשיך לעבוד בשביל אזרחי ישראל", הוסיפה.
                </Typography>
            </CardContent>

        </Card>
    );
}
export default MessageSummary;
