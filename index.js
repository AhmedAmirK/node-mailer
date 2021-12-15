const express = require('express');
const bodyParser = require('body-parser');

const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.post('/send-mail', async (req,res)=>{
    
    const {to_email, subject, text, html} = req.body;
    if(!to_email || !subject || !(text || html) ){
        res.status(401).send('Must Send to_email, subject and text in your request body');
        return;
    }
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'website@excellentuae.net', // gmail user
            pass: '2021Mail', // gmail password
        },
    });
    
    const msg = {
        from: '"Excellent UAE Website" <website@excellentuae.net>', // sender address
        to: `${to_email}`, // list of receivers
        subject: `${subject}`, // Subject line
        text: `${text}`, // plain text body
        html: `${html}`
    }
    // send mail with defined transport object
    const info = await transporter.sendMail(msg);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
    res.send('Email Sent!');
});

app.listen(port, ()=> console.log(`App listening on http://localhost:${port}`))
