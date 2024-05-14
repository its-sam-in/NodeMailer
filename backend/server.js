import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();
const PORT =6700;
const app =express();

app.use(express.json());
app.use(cors());

app.post('/send-mail',async(req,res)=>{
    const {subject, text}=req.body;
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL_USER,
            password:process.env.EMAIL_PASS
            
        }
    });

    const mailOptions={
        from : process.env.EMAIL_USER,
        to:process.env.EMAIL_USER,
        subject:subject,
        text:text
    };

    try {
        const info=await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.json({success: true, message:"Email sent Successfully!" }); 
        
    } catch (error) {

        console.log("Error sending mail" + error);
        res.json({success:false, message: error.message})
        
    }

})

app.listen(PORT, ()=>{
    console.log("App is running on port: " + PORT);
})