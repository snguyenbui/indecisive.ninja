require('dotenv').config();
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const msg = {
  to: '', // Change to your recipient
  from: 'indecisiveninjapolls@gmail.com', // Change to your verified sender
  subject: 'Your Indecisive.ninja poll admin link',
  text: '',
  html: '',
}

const sendEmail = (link, email) => {
  msg.text = `Your administrative link here: ${link}`;
  msg.html = `<p>Your administrative link <a href="indecisive.ninja${link}">here</a><p>`;
  msg.to = email;
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}

module.exports = sendEmail;
