const Owner = require("../models/Owner_info")
const path = require("path")
const fs = require('fs/promises')

const deleteOwnerProfile = async(req, res, next)=>{
    try{
        const id = req.params.id

        if(id.length >24 || id.length <24)
        return res.status(400).json({
            message: 'invaild Id',
            success: false
        })
    

        const file = await Owner.findById(id)
        const files =(
            file.identity_card
        )
        
        const directoryPath = path.join(files)
        
      
        fs.unlink(directoryPath, (err) => {
            if (err) {
              res.status(500).send({
                message: "Could not delete the file. " + err,
              });
            }
        
            res.status(200).send({
              message: "File is deleted.",
            });
        })
      

        const profile = await Owner.findByIdAndDelete(id);
        
        


        if (!profile)
        return res.status(400).json({
            message: 'No car with such Id',
            success: false
        
    });
    return res.status(200).json({
        success: true,
        Profile: profile,
        message:"owner profile delete succesfully"
    })

    }catch (err){
        console.log(err.message)
    }
} 
const uploadOwnerProfile = async(req, res, next) =>{
    try{
    const {identity_number, first_name, last_name, date_of_birth, age, email, gender, local_government, state }= req.body
    // let {avatar} = req.body
    // let img = ''
    // if(req.file) img = `upload/avata/${req.file.path}`
    // avatar = img
        //check if user exists by email

        // const findUser = await Owner.findOne({email})

        
        
        
        const profile = new Owner({
            user: req.user.id,
            identity_number: identity_number,
            first_name: first_name,
            last_name: last_name,
            date_of_birth: date_of_birth,
            age: age,
            email: email,
            gender: gender,
            local_government: local_government,
            state: state,
            identity_card: req.file.path         
        })
        await profile.save()
        if(req.file){
            Owner.identity_card= req.file.path  
        }

       
        if(!profile)
        return res.status(500).json({
            status: false,
            message: "something went wrong"
        })
        
        return res.status(201).json({
            success: true,
            message: "profile uploaded successfully",
            Profile: profile
        })
    }
    catch (err){
        console.log(err)
    }
}
const updateOwnerProfile = async(req, res, next)=>{
    try{

        const id  = req.params.id
        const { identity_number, first_name, last_name, date_of_birth, age, email, gender, local_government, state } = req.body
        
        
        const  identity_card  = req.file.path
        
        //  console.log(req.files)
        if(id.length >24 || id.length <24)
        return res.status(400).json({
            message: 'invaild Id',
            success: false
        })
        const file = await Owner.findById(id)
        // const files =(
        //     file.owner_passport_image,
        //     file.attestation_letter_image,
        //     file.purchase_receipt_image,
        //     file.delivery_note_image,
        //     file.proof_of_ownership_image
        // )
        
        // const directoryPath = path.resolve(files)

        // const file_1 = file.image_1
        // const file_2 = file.attestation_letter_image
        // const file_3= file.purchase_receipt_image
        // const file_4 = file.delivery_note_image
        // const file_5 = file.proof_of_ownership_image
        
        
           
            // await fs.link(file_1)
            // fs.link(file_2)
            // fs.link(file_3)
            // fs.link(file_4)
            // fs.link(file_5)
        
   
        

            
        // const files = ''
        // if(req.file){
        //    files = req.file.path
        // //    console.log(req.files)
        // }
        console.log("Files: ", req.file.path)
         const Car = await Owner.findByIdAndUpdate(id, 
            {
                identity_number,
                first_name, 
                last_name, 
                date_of_birth, 
                age, 
                email, 
                gender, 
                local_government, 
                state,
                identity_card
        }, { new: true} );

        

    
        if (!Car)
        return res.status(400).json({
            message: 'No profile with such Id',
            success: false
        
    });
    return res.status(200).json({
        success: true,
        car: Car,
        message:"OwnerProfile updated succesfully"
    })

    }catch (err){
        console.log(err.message)
    }
}

module.exports ={
    uploadOwnerProfile,
    deleteOwnerProfile,
    updateOwnerProfile
}