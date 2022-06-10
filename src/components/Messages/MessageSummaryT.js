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
import moment from "moment/min/moment-with-locales";
moment.locale('he')


const MessageSummaryT = ({message}) => {
    return (

        <Card sx={{ maxWidth: 345 }}>
            <CardHeader className={"text-right flex-row-reverse"}
                avatar={
                    <Avatar sx={{ bgcolor: red[500], marginLeft: 2, marginRight: -2}} aria-label="recipe">
                        {message.authorFirstName[0] + message.authorLastName[0]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={message.title}
                subheader={moment(message.createdAt.toDate()).calendar()}
            />
            <CardMedia
                component="img"
                height="194"
                src={"/../../../img/tenelogo.png"}
                alt="הודעה חדשה" //do hidden if no pic ?
            />



            <CardContent>
                <Typography className={"line-clamp-3"} style={{height: 70}} align="right" variant="body2" color="text.secondary">
                    {message.content}
                </Typography>
            </CardContent>

        </Card>
    );
}
export default MessageSummaryT;
