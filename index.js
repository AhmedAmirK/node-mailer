const express = require('express');
const bodyParser = require('body-parser');

const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.post('/send-mail', (req,res)=>{
    
    const {to_email, subject, body} = req.body;
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
        to: 'ahmedkhalaf24@gmail.com',//`${to_email}`, // list of receivers
        subject: 'Test mail server', //`${subject}`, // Subject line
        text: 'Saba7o'//`${body}`, // plain text body
    }
    // send mail with defined transport object
    const info = await transporter.sendMail(msg);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
    res.send('Email Sent!')
});

app.listen(port, ()=> console.log(`App listening on http://localhost:${port}`))
