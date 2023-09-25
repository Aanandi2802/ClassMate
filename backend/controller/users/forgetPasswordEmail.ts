// Author: Harshil Shah
import express, {Request, Response} from 'express';
import nodemailer from 'nodemailer';

const EmailRouter = express.Router();

EmailRouter.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    const {to, url} = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sharshil1299@gmail.com', // Replace with your email address
            pass: 'tpzawemsthezxqla\n' // Replace with your email password or use an app password if enabled
        }
    });

    console.log(url);

    // Email options
    const mailOptions = {
        from: 'noreply-mymail@gmail.com',
        to: to,
        subject: "Reset password for Classmate",
        text: url
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({error: 'An error occurred while sending the email.'});
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({message: 'Email sent successfully!'});
        }
    });
});

export default EmailRouter;
