
const nodemailer = require('nodemailer')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const dotenv = require('dotenv')
const bcrypt = require("bcrypt")
const Mailgen = require('mailgen')
const Token = require('../models/token')
const crypto = require('crypto')


dotenv.config()

const updateUser = async(req, res, next)=>{
    try{
        // const {name} = req.params;
        const { id } = req.params;
        if(id.length >24 || id.length <24)
        return res.status(400).json({
            message: 'invaild',
            success: false
        })

        const user = await User.findByIdAndUpdate( id, req.body, { new: true});
        
        
        if (!user)
    return res.status(400).json({
        message: 'invaild',
        success: false
        
    });
    return res.status(200).json({
        success: true,
        user: user,
        message:"user fetch succesfully"
    })

    }catch (err){
        console.log(err.message)
    }
}


const deleteUser = async(req, res, next)=>{
    try{
        const { id } = req.params;
        // const { name } = req.params;
        // if (name!==name)
        if(id.length >24 || id.length <24)
        return res.status(400).json({
            message: 'invaild Id',
            success: false
        })

        const user = await User.findByIdAndDelete(id);

        if (!user)
    return res.status(400).json({
        message: 'invaild',
        success: false
        
    });
    return res.status(200).json({
        success: true,
        user: user,
        message:"user fetch succesfully"
    })

    }catch (err){
        console.log(err.message)
    }
}

const getAllUser = async(req, res, next)=>{
    try{
        // const { limit } = req.params;
        // const { page } = req.params;
        const {id} = req.params;
        // console.log(id);
        if(id.length >24 || id.length <24)
        return res.status(400).json({
            message:'invalid',
            success: false 
        })
        
        const user = await User.findById(id);
    
    if (!user)
    return res.status(400).json({
        message: 'null',
        success: false
        
    });
    return res.status(200).json({
        success: true,
        user: user,
        message:"user fetch succesfully"
    });

    } catch (err){
        console.log(err.message)
    }
}


const getUser = async(req, res, next)=>{
    try{
        const { limit } = req.params;
        const { page } = req.params;
    
        const usePage = page - 1;
       
        const user = await User.find()
        .skip( usePage * limit)
        .limit(limit)
      
    
    if (!user)
    return res.status(400).json({
        message: 'invaild',
        success: false
        
    });
    return res.status(200).json({
        success: true,
        user: user,
        message:"user fetch succesfully"
    });

    } catch (err){
        console.log(err.message)
    }
}

const register = async(res, req, next) =>{
    try{
        const {name, email, password, confirm_password}= req.body
        //check if user exists by email

        const findUser = await User.findOne({email})

        if(findUser)
        return res.status(400).json({
            message: 'user with email already exists',
            success: false,
        });
        
        if(!name || !email || !password || !confirm_password)
        return res.status(400).json({
            message:"some fields are missing"
        })     

        if(password !== confirm_password)
        return res.status(400).json({
            message: "password not same as confirm_password"
        })
       
        
        const hashedPassword = await bcrypt.hash(password, 10)
        // console.log(hashedPassword)
    
        // if user exists, send an error message

        
        
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            confirm_password: hashedPassword
        })
        await user.save();
// create a token with all the information of the user without including the #password and # confirm_password to avoid encoding the token to access the user pass
        const Access_token = await jwt.sign({id: user._id, name: user.name, email: user.email }, 
            process.env.JWT_SECRET,
            {
                expiresIn: 3 * 60 * 60
            })
    //making token to be a a variable to hold the Access_token
        user.Token = Access_token

    // hidden the hashedPassword to appear as hidden
        user.password = "hidden"
        user.confirm_password = "hidden"
       
        if(!user)
        return res.status(500).json({
            status: false,
            message: "something went wrong"
        })
        
        return res.status(201).json({
            success: true,
            message: "user created successfully",
            user: user,
        })
    }
    catch (err){
        console.log(err)
    }

}
    
const sign_in = async(req, res, next)=>{
    try{
        const{ email, password } = req.body
        
        

        const findUser = await User.findOne({email})

        // const decoded = await jwt.verify (user.password, password)
        
        if (!(findUser && (await bcrypt.compare(password, findUser.password)))){
            return res.status(400).json({
                success: false,
                error: 'invaild email or password'
            })
        
    } 
    const Token = await jwt.sign(
        {id: findUser._id, name: findUser.name, email: findUser.email}, 
        process.env.JWT_SECRET,
        {
            expiresIn: 5 * 60 * 60
        })

        // findUser.Token = Token,
        findUser.password = "hidden"

    // res.cookie("jwt", Token, {httpOnly: true, maxAge: 5 * 60 * 60 * 1000})   
    return res.status(201).json({
        success: true,
        message: "login successfully",
        User: ({Access_token:Token})
    });
    }catch(err){
        console.log(err)
    }       
}

const forgot_password = async(req, res, next)=>{ 
    try{
        const{ email } = req.body
        
        
        

        const user = await User.findOne({email})
       
       
        
        if (!user ){
            return res.status(400).json({
                success: false,
                error: 'invaild email'
            })
        
    } 

    const token = await Token.findOne({userId: user._id})
    // let resetToken = crypto.randomBytes(32).toString("hex")

    const Secret =  process.env.JWT_SECRET + user.password
    const payload ={
        id: user.id,
        email: user.email
    }
    
    const Access_token = await jwt.sign(payload, Secret,
        {
            expiresIn: "15m"
        })
    // const finduser = await token.findById(id)
    // const hashed =  await bcrypt.hash(resetToken, 10)
    const userToken = new Token({
            userId: user._id,
            token: Access_token
    })
        await userToken.save()
        
    const link = `${process.env.CLIENT_URL}/reset-password/${user._id}/${Access_token}`
    
    
        const config = ({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'soledad.walter12@ethereal.email',
                pass: 'U6QpfqzTPbvKgB2XMj'                
            }
            });
            transporter = nodemailer.createTransport(config)
            
            const info ={
                from: 'ethereal <info@ethereal.email>',
                to: email,
                subject: 'Account reset_password',
                html:`<h2> Please click on the given link to reset_password <h2>
                link:${process.env.CLIENT_URL}/reset-password/${user._id}/${Access_token}`,
                 attachments:[{
                    filename: "download-1.png",
                    path:'./download-1.png',
                    cid: 'unique@ethereal.email'
                 }]

                 
            }
           
            console.log(link)
            transporter.sendMail(info)


    // const link =`127.0.0.1:3000/reset-password/${find_user._id}/${Access_token}`
    // console.log(info)

    
   return res.status(201).json({
        success: true,
        message: "password reset link has been sent to your email",
        token: Access_token
        // data: info
    });
    }catch(err){
        console.log(err)
    }       
}



const resetPassword = async(req, res, next)=>{
    try{
        
        
        const token = req.params.token
        const { password, confirm_password } = req.body


        const user = await User.findById(req.params.userId)
        // console.log(user)

        if (!user ){
           return res.status(400).json({
                success: false,
                error: 'invaild Id...'
            })
           
        }

        // const token = await Token.findOne({
        //     userId: user._id,
        //     token: req.params.token,
        // });

        // console.log(req.params.token)
        
        
        
        const findtoken = await Token.findOne({token})
        //  console.log(findtoken) 
        
        if (!findtoken ){
           return res.status(400).json({
                success: false,
                error: 'invaild token...'
            })
            
        }
        
        
        if(password !== confirm_password){
           return res.status(400).json({
            message:"password different confirm_password"
           })
           
        }
        
       
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const repeatPassword = await bcrypt.hash(confirm_password, 10)


            // console.log("userId: ",user._id);
            // console.log("tokenId: ",findtoken.userId);
            if (user._id.toString() == findtoken.userId.toString()) {
            
                user.password = hashedPassword
                user.confirm_password = repeatPassword
      

                await user.save();
            
         
            return res.status(201).json({
                success: true,
                message: "password updated",
                user: user
            });
        
            }else{
                return res.status(401).json({
                    success: false,
                    message: "invalid token"
                })
            }
        
     
    }catch(err){
        console.log(err)
    }       
}



module.exports = {
    getUser,
    getAllUser,
    deleteUser, 
    updateUser,
    register,
    sign_in,
    forgot_password,
    resetPassword
}
