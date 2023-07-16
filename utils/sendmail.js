const Mailgen = require('mailgen')
const nodemailer = require('nodemailer')


const mail = async(req, res, next)=>{

    try{
    
        const {name, userEmail} = req.body
    const config = {
        service: "gmail",
        auth:{
            user:process.env.Email,
            pass:process.env.password
        }
    }

    const transporter = nodemailer.createTransport(config)

    let mailGenerator = new Mailgen({
        theme: 'default',
        product:{
            name: 'Unijos',
            link: "http://Unijos/"
        }

    })

    let response = {
        body:{
            name: name,
            intro:"payment of school fee",
            table:{
                data:[
                    {
                        School:"Unijos",
                        Description:"School feee is due for payment",
                        Fee:"45,000"
                    }
                ]
            }
        }   
    }
    const mail = mailGenerator.generate(response)
    
    
    let message ={
        from:process.env.Email,
        to:userEmail,
        subject: "School fee",
        html: mail,
        attachments:{
            filename:"UNIJOS - 139540.pdf",
            path:"./UNIJOS - 139540.pdf"
        }
    }

    transporter.sendMail(message) 
        return res.status(201).json({
            success: true,
            message: "mail sent sucessfully",
        
    })
}

catch(err){
    console.log(err)
}
}

module.exports={
    mail
}
