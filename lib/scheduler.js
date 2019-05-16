const schedule = require('node-schedule');

const { sendNotification } = require('./../lib/notifications');

const alreadySendToDevices = [];

schedule.scheduleJob('3 * * * * *', function() {
    /*
    console.log("launching scedule")
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
                console.log(user);
                console.log(alreadySendToDevices);
                if (!alreadySendToDevices.indexOf(deviceId)) {
                    sendNotification(deviceId, "Karry", "Gros pd 💩");
                    alreadySendToDevices.push(deviceId);
                }
            });
        },
        err => {
            console.log(err);
        });*/
});
