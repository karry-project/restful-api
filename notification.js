const admin = require("firebase-admin");
const config = require("./config/config");

const serviceAccount = require('./config/firebase-adminsdk.json');

const registrationToken = "d0BSk3IJEpw:APA91bGjmAJJiC2aMxk2xwiU2_ahtnw4xowNdcXRI8aBvdobujLyx0LqSYvQBdz-k_O4b_9kXw9dt8mYi-sr5ziL17ydxAXySQzhFbi8QuRdXxE5mNrwQct6r48fBCZQl5KvUFr0skz8";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://karry-app-f106e.firebaseio.com"
});

const payload = {
    notification: {
        title: "Account Deposit",
        body: "A deposit to your savings account has just cleared."
    }
};

const options = {
    priority: "normal",
    timeToLive: 60 * 60
};

admin.messaging().sendToDevice(registrationToken, payload, options)
    .then((response) => {
        console.log("Successfully sent message:", response);
    })
    .catch((error) => {
        console.log("Error sending message:", error);
    });