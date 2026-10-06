const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        }
    });

    // Define the email options
    const mailOptions = {
        from: process.env.EMAIL,
        to: options.email,
        subject: options.subject,
        html: options.html
    };

    // Send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
