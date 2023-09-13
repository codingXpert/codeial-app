const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.sendMail = (User) => {
    const link = `http://localhost:8000/users/setPassword`;

    nodeMailer.transporter.sendMail({
       from: process.env.FROM_EMAIL,
       to: User.email,
       subject: "Reset Your Password!",
       html:`Click <a href = "${link}"> here </a> to reset your password`, 
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message sent', info);
        return;
    });
}