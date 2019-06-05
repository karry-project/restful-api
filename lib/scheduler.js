const schedule = require('node-schedule');
const User = require('./../models/User');

const { sendNotification } = require('./../lib/notifications');

const alreadySendToDevices = [];

schedule.scheduleJob('* * 3 * * *', () => {
    User.find({
        savedResearchs: {
            $exists: true,
            $not: {
                $size: 0
            }
        },
        firebaseId: {
            $ne: null
        }
    }).then(
        users => {
            users.forEach((user) => {
                const deviceId = user.firebaseId;
                if (!alreadySendToDevices.indexOf(deviceId)) {
                    sendNotification(deviceId, "Karry", "Gros pd 💩");
                    alreadySendToDevices.push(deviceId);
                }
            });
        },
        err => {
            console.log(err);
        });
});
