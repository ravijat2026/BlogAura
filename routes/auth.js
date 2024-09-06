const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
// const {sendVerificationEmail} = require('../utils/mailer')

// // Generate a 6-digit verification code
// const generateVerificationCode = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   };

//REGISTER
router.post("/register",async(req,res)=>{
    try{
        const {username,email,password}=req.body
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hashSync(password,salt)

         // Generate verification code
        // const verificationCode = generateVerificationCode();

        const newUser=new User({username,email,password:hashedPassword})
        const savedUser=await newUser.save()

        // Send verification email
        // sendVerificationEmail(email, verificationCode);

        res.status(200).json({ message: 'Registration successful! Please check your email to verify your account.', user: savedUser });

    }
    catch(err){
        res.status(500).json(err)
    }

})

// Email Verification
// router.post('/verify-email', async (req, res) => {
//     try {
//         const { email, verificationCode } = req.body;
//         const user = await User.findOne({ email });

//         if (!user) {
//             console.log(`User not found for email: ${email}`);
//             return res.status(404).json({ message: 'User not found!' });
//         }

//         if (user.verificationCode === verificationCode) {
//             user.isVerified = true;
//             user.verificationCode = '';  // Clear the verification code
//             const updatedUser = await user.save();
            
//             // Check if the save operation was successful
//             if (updatedUser.isVerified) {
//                 console.log(`Email verified successfully for user: ${email}`);
//                 res.status(200).json({ message: 'Email verified successfully!' });
//             } else {
//                 console.log(`Failed to update user verification status for email: ${email}`);
//                 res.status(500).json({ message: 'Failed to verify email. Please try again.' });
//             }
//         } else {
//             console.log(`Incorrect verification code for email: ${email}`);
//             res.status(400).json({ message: 'Incorrect verification code!' });
//         }
//     } catch (err) {
//         console.log(`Error verifying email for email: ${email}`, err);
//         res.status(500).json(err);
//     }
// });

  
  


//LOGIN
router.post("/login",async (req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
       
        if(!user){
            return res.status(404).json("User not found!")
        }

    
        const match=await bcrypt.compare(req.body.password,user.password)
        
        if(!match){
            return res.status(401).json("Wrong credentials!")
        }
        const token=jwt.sign({_id:user._id,username:user.username,email:user.email},process.env.SECRET,{expiresIn:"3d"})
        const {password,...info}=user._doc
        res.cookie("token",token).status(200).json(info)

    }
    catch(err){
        res.status(500).json(err)
    }
})



//LOGOUT
router.get("/logout",async (req,res)=>{
    try{
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logged out successfully!")

    }
    catch(err){
        res.status(500).json(err)
    }
})

//REFETCH USER
router.get("/refetch", (req,res)=>{
    const token=req.cookies.token
    jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})



module.exports=router