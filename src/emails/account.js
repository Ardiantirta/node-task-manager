const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ardiantirtaa@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ardiantirtaa@gmail.com',
        subject: 'Account Removal',
        text: `Thank you for using this app. We hope we will see you again, ${name}.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}