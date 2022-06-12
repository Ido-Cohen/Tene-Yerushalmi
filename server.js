const express = require("express");
const { initializeApp } = require('firebase-admin/app');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");

const serviceAccount = require("./eladtrying-firebase-adminsdk-2aweh-a3487679fd.json");
const { getAuth } = require('firebase-admin/auth');
const { getDatabase } = require('firebase-admin/database');
// const {get,ref,child} = require('firebase/database')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://eladtrying.firebasedatabase.app"
});

// const defaultApp = initializeApp()
const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/createUsers",  (req, res) => {
    // const cityRef = admin.firestore().collection('users').doc('A7QFKl4i3Kf4890Ibb2h3RAXN6W2');
    // const doc = await cityRef.get();
    // if (!doc.exists) {
    //     console.log('No such document!');
    // } else {
    //     console.log('Document data:', doc.data().email);
    //     res.status(200).send({email: doc.data().email})
    //
    // }
getAuth().createUser({
    email:req.body.email,
    password: req.body.password
}).then((userRecord) => {
    admin.firestore().collection('users').doc(userRecord.uid).set({
        ...req.body,
        initials:req.body.firstName[0] + req.body.lastName[0]
    }).then((res) => {
        console.log("Succefully registred user:");
    }).catch((err) => {
        console.log("error occured " + err.message);
    });
}).catch((err) => {
    console.log("error occured " + err.message);
    res.status(400).send({ message:err.message})
})
    // console.log(getAuth()
    //     .getUserByEmail('bla1@gmail.com')
    //     .then((userRecord) => {
    //         // See the UserRecord reference doc for the contents of userRecord.
    //         console.log(`Successfully fetched user data: ${userRecord.email}`);
    //     })
    //     .catch((error) => {
    //         console.log('Error fetching user data:', error.message);
    //     }));
});
app.delete('/deleteUser', (req,res) => {
    getAuth().deleteUser(req.body.uid).then((userRecord) => {

    }).catch((err) => {
        res.status(400).send({message:err.message})
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});