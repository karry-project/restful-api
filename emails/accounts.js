const sgMail = require('@sendgrid/mail');
const config = require('./../config/config')

sgMail.setApiKey(config.SEND_GRID_API_KEY)

const sendNewUserEmail = (email, firstname) => {
    firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
    const msg = {
        to: email,
        from: 'team@karry.fr',
        subject: `Hello ${firstname} ! Bienvenue chez Karry 🤩`,
        text: `Bonjour ${firstname} ! Merci pour ton inscription sur l'application Karry ! Tu ne le regretteras pas c\'est promis ^^`,
    };
    sgMail.send(msg);
}

const sendDeletedUserEmail = (email, firstname) => {
    firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
    const msg = {
        to: email,
        from: 'team@karry.fr',
        subject: `Aurevoir ${firstname} ce fut un plaisir !`,
        text: `Hello ${firstname} ! La suprresion de ton compte est en cours 😭 ... Ceci est donc le dernier mail que tu recevras de notre part !`,
    };
    sgMail.send(msg);
}

module.exports = {
    sendNewUserEmail,
    sendDeletedUserEmail
}