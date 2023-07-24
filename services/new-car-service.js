const newCar = require("../models/new-car")
const fs = require("fs/promises")
const path  = require('path')




const deleteNewCar = async(req, res, next)=>{
    try{

    

        const id = req.params.id

        
        if(id.length >24 || id.length <24)
        return res.status(400).json({
            message: 'invaild Id',
            success: false
        })
    

        const file = await newCar.findById(id)
         if(JSON.stringify(file.user._id) !== JSON.stringify(req.user.id))
         return res.status(400).json({
            message:"Can't delete this car doc"
        })
        // const files =(
        //     file.owner_passport_image,
        //     file.attestation_letter_image,
        //     file.purchase_receipt_image,
        //     file.delivery_note_image,
        //     file.proof_of_ownership_image
        // )
        const file_1 = file.owner_passport_image
        const file_2 = file.attestation_letter_image
        const file_3 = file.purchase_receipt_image
        const file_4 = file.delivery_note_image
        const file_5 = file.proof_of_ownership_image
        // const directoryPath = path.join(files)
        
            fs.unlink(file_1)
            fs.unlink(file_2)
            fs.unlink(file_3)
            fs.unlink(file_4)
            fs.unlink(file_5)
        // fs.unlink(directoryPath, (err) => {
        //     if (err) {
        //       res.status(500).send({
        //         message: "Could not delete the file. " + err,
        //       });
        //     }
        
        //     res.status(200).send({
        //       message: "File is deleted.",
        //     });
        // })
      

         await newCar.findByIdAndDelete(id);

    //     if (!car)
    //     return res.status(400).json({
    //         message: 'No car with such Id',
    //         success: false
        
    // });
        return res.status(200).json({
            success: true,
            message:"new_car document is deleted succesfully"
    })

    }catch (err){
        console.log(err.message)
    }
}

const uploadNewCar = async(req, res, next) =>{
    try{
    const { license_id, VIN }= req.body
        
    
    findVIN = await newCar.findOne({VIN})

    if(findVIN)
    res.status(400).json({
        message:"VIN already Exist"
    })
    
        // console.log(req.files)
        const new_car_doc = new newCar({
            user: req.user.id,
            VIN: VIN,
            owner_passport_image:req.files.image_1[0].path,
            license_id: license_id,
            attestation_letter_image: req.files.image_2[0].path,
            purchase_receipt_image: req.files.image_3[0].path,
            delivery_note_image: req.files.image_4[0].path,
            proof_of_ownership_image: req.files.image_5[0].path       
        })
        await new_car_doc.save()

        // const user = new Oldcomcar({
        //     user: req.user.id,
        //     car_license_image:req.files.car_license_image[0].fieldname,
        //     license_id: license_id,
        //     roadworthiness_image: req.files.roadworthiness_image[0].fieldname,
        //     roadworthiness_id: roadworthiness_id,
        //     insurance_image: req.files.insurance_image[0].fieldname,
        //     carrier_permit_image: req.files.carrier_permit_image[0].fieldname,
        //     heavy_goods_permit_image: req.files.heavy_goods_permit_image[0].fieldname       
        // })
       
        
       
       
        if(!new_car_doc)
        return res.status(500).json({
            status: false,
            message: "something went wrong"
        })
        
        return res.status(201).json({
            success: true,
            message: "New Car details is uploaded successfully",
            new_car_doc: new_car_doc
        })
    }
    catch (err){
        // res.status(400).json(err)
        console.log(err)
    }
}

const updateNewCar = async(req, res, next)=>{
    try{

        const id  = req.params.id
        const { license_id, VIN } = req.body
        
        const  owner_passport_image  = req.files.image_1[0].path
        const  attestation_letter_image  = req.files.image_2[0].path
        const  purchase_receipt_image  = req.files.image_3[0].path
        const  delivery_note_image  = req.files.image_4[0].path
        const  proof_of_ownership_image  = req.files.image_5[0].path
        //  console.log(req.files)
        if(id.length >24 || id.length <24)
        return res.status(400).json({
            message: 'invaild Id',
            success: false
        })
        const file = await newCar.findById(id)

        if(JSON.stringify(file.user._id) !== JSON.stringify(req.user.id))
        return res.status(400).json({
            message: "can't update this user doc"
        })
        // const files =(
        //     file.owner_passport_image,
        //     file.attestation_letter_image,
        //     file.purchase_receipt_image,
        //     file.delivery_note_image,
        //     file.proof_of_ownership_image
        // )
        
        // const directoryPath = path.resolve(files)

        const file_1 = file.owner_passport_image
        const file_2 = file.attestation_letter_image
        const file_3 = file.purchase_receipt_image
        const file_4 = file.delivery_note_image
        const file_5 = file.proof_of_ownership_image
        
        
           
            fs.unlink(file_1)
            fs.unlink(file_2)
            fs.unlink(file_3)
            fs.unlink(file_4)
            fs.unlink(file_5)
        
   
        // console.log("Files: ", req.files.image_1[0].path)
         const Car = await newCar.findByIdAndUpdate(id, 
            {VIN: VIN,
            license_id:license_id, 
            owner_passport_image,
            attestation_letter_image,
            purchase_receipt_image,
            delivery_note_image,
            proof_of_ownership_image
        }, { new: true} );

    
    //     if (!Car)
    //     return res.status(400).json({
    //         message: 'No car with such Id',
    //         success: false
        
    // });
    return res.status(200).json({
        success: true,
        car: Car,
        message:"newCar updated succesfully"
    })

    }catch (err){
        console.log(err.message)
    }
}

const userSingleNewCar = async(req, res, next)=>{
    try{
        const id = req.params.id

        if ( id < 24 || id > 24)
        return res.status(400).json({
            message:"invalid password"
        })

    const singleUser = await newCar.findById(id)
    if(JSON.stringify(singleUser.user._id) !== JSON.stringify(req.user.id))
    return res.status(400).json({
        message:"can't access the car doc of another user"
    })

    if(!singleUser)
    return res.status(400).json({
        message:"No old car with such Id"
    })

    return res.status(201).json({
        sucess: true,
        car: singleUser
    })


    }catch (err){
        console.log(err.message)
    }
}

const singleUserAllNewCar = async(req, res, next)=>{
    try{
        const id = req.params.id

        if ( id < 24 || id > 24)
        return res.status(400).json({
            message:"invalid password"
        })

    const singleUser = await newCar.find({user:req.user.id})
   

    if(!singleUser)
    return res.status(400).json({
        message:"No old car with such Id"
    })

    return res.status(201).json({
        sucess: true,
        car: singleUser
    })


    }catch (err){
        console.log(err.message)
    }
}
 
 

module.exports ={
    uploadNewCar,
    deleteNewCar,
    updateNewCar,
    userSingleNewCar,
    singleUserAllNewCar
}