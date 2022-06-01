const express = require("express");
const { initializeApp } = require('firebase-admin/app');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");

const serviceAccount = require("./eladtrying-firebase-adminsdk-2aweh-a3487679fd.json");
const { getAuth } = require('firebase-admin/auth');
const { getDatabase } = require('firebase-admin/database');
const {get,ref,child} = require('firebase/database')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://eladtrying.firebaseio.com"
});

// const defaultApp = initializeApp()
const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/api", (req, res) => {
    const db = ref(getDatabase());
    get(child(db, `users/4N7sczG2FNctQD1Q00Dg2M29Rq53`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
    // console.log(get(child(db,`users/4N7sczG2FNctQD1Q00Dg2M29Rq53`)));
    console.log(getAuth()
        .getUser('1IFND1uVCBRrW1IbmkDCKdxYs6B3')
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log(`Successfully fetched user data: ${userRecord.email}`);
        })
        .catch((error) => {
            console.log('Error fetching user data:', error);
        }));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});