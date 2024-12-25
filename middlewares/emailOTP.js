import dotenv from 'dotenv'
dotenv.config();

import nodemailer from 'nodemailer'

export const sendEmail =  async (email,otp,next)=>{
    try
    {
        const transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    });

    const mailOptions = {
        to:email,
        from:process.env.EMAIL,
        subject:"Password reset OTP",
        text:`Here is your OTP for password reset:${otp}` 
    }

    await transport.sendMail(mailOptions);
    console.log("Email sent successfully");
    }catch(error){
        next(error);
    }
    
}