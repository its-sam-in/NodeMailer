import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config(); // Load environment variables from .env file

const PORT = 6700;
const app = express();

app.use(express.json());
app.use(cors());

app.post('/send-mail', async (req, res) => {
    const { subject, text } = req.body;

    // Create a transporter object using the SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        //service: 'gmail', // Use Gmail as the email service provider
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS // Your email password or app password
        }
    });

    // Email message configuration
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: process.env.EMAIL_USER, // Receiver address (you can change this to any other email address)
        subject: subject, // Email subject
        text: text // Email content
    };

    try {
        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        // Handle errors
        console.error('Error sending mail:', error);
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
