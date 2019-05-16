const admin = require("firebase-admin");

const serviceAccount = require('./../config/firebase.json');

const initializeApp = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://karry-app-f106e.firebaseio.com"
    });
};

const sendNotification = (deviceId, title, body) => {
    const payload = {
        notification: {
            title,
            body
        }
    };

    const options = {
        priority: "normal",
        timeToLive: 60 * 60
    };

    admin.messaging().sendToDevice(deviceId, payload, options).then((response) => {
            console.log("Successfully sent message:", response);
        })
        .catch((error) => {
            console.log("Error sending message:", error);
        });
};

module.exports = {
    initializeApp,
    sendNotification
};
