import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

const transporter = nodemailer.createTransport({
  host: process.env.HOST, 
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});



export const sendVerificationEmail = async (email, verificationToken) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Verify your email',
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully', info.response);
  } catch (error) {
    console.error('Error sending verification email', error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
	const mailOptions = {
	  from: process.env.EMAIL,
	  to: email,
	  subject: 'Welcome to our platform!',
	  html: `<p>Hello ${name}, welcome to our platform!</p>`,
	};
  
	try {
	  const info = await transporter.sendMail(mailOptions);
	  console.log('Welcome email sent successfully', info.response);
	} catch (error) {
	  console.error('Error sending welcome email', error);
	  throw new Error(`Error sending welcome email: ${error}`);
	}
  };

  export const sendPasswordResetEmail = async (email, resetURL) => {
	const mailOptions = {
	  from: process.env.EMAIL,
	  to: email,
	  subject: 'Reset your password',
	  html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),
	};
  
	try {
	  const info = await transporter.sendMail(mailOptions);
	  console.log('Password reset email sent successfully', info.response);
	} catch (error) {
	  console.error('Error sending password reset email', error);
	  throw new Error(`Error sending password reset email: ${error}`);
	}
  };


  export const sendResetSuccessEmail = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Password Reset Successful',
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset success email sent successfully', info.response);
  } catch (error) {
    console.error('Error sending password reset success email', error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};