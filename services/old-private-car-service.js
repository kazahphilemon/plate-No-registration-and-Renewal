const oldPrivateCar = require("../models/old-private-car")
const path = require("path")
const fs = require ("fs/promises")

const deleteOldPrivateCar = async(req, res, next)=>{
    try{
        const id = req.params.id

        
        if(id.length >24 || id.length <24)
        return res.status(400).json({
            message: 'invaild Id',
            success: false
        })
    

        const file = await oldPrivateCar.findById(id)
        if(JSON.stringify(file.user._id) !== JSON.stringify(req.user.id))
        return res.status(400).json({
            message: "can't delete this user doc"
        })

        // const files =(
        //     file.car_license_image,
        //     file.roadworthiness_image,
        //     file.insurance_image
        // )
        const file_1 = file.car_license_image
        const file_2 = file.roadworthiness_image
        const file_3 = file.insurance_image
        // const directoryPath = path.join(files)
        fs.unlink(file_1)
        fs.unlink(file_2)
        fs.unlink(file_3)
       
      

        await oldPrivateCar.findByIdAndDelete(id);

    //     if (!car)
    //     return res.status(400).json({
    //         message: 'No car with such Id',
    //         success: false
        
    // });
    return res.status(200).json({
        success: true,
        message:"old_private_car document has been delete succesfully"
    })

    }catch (err){
        console.log(err.message)
    }
}

const uploadOldPrivateCar = async(req, res, next) =>{
    try{
    const { license_id, roadworthiness_id, VIN }= req.body
        
    findVIN = await oldPrivateCar.findOne({VIN})

    if(findVIN)
    res.status(400).json({
        message:"VIN already Exist"
    })
    
        
        const old_private_car_doc = new oldPrivateCar({
            user: req.user.id,
            VIN: VIN,
            car_license_image: req.files.image_1[0].path,
            license_id: license_id,
            roadworthiness_image: req.files.image_2[0].path,
            roadworthiness_id: roadworthiness_id,
            insurance_image: req.files.image_3[0].path   
        })
        await old_private_car_doc.save()

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
       
        
       
       
        if(!old_private_car_doc)
        return res.status(500).json({
            status: false,
            message: "something went wrong"
        })
        
        return res.status(201).json({
            success: true,
            message: "Old Private Car details is uploaded successfully",
            old_private_car_doc: old_private_car_doc
        })
    }
    catch (err){
        console.log(err)
    }
}

const updateOldPrivateCar = async(req, res, next)=>{
    try{

        const id  = req.params.id
        const { license_id, roadworthiness_id, VIN} = req.body
        
        const  car_license_image  = req.files.image_1[0].path
        const  roadworthiness_image  = req.files.image_2[0].path
        const  insurance_image  = req.files.image_3[0].path
        
        //  console.log(req.files)
        if(id.length >24 || id.length <24)
        return res.status(400).json({
            message: 'invaild Id',
            success: false
        })
        const file = await oldPrivateCar.findById(id)
        if(JSON.stringify(file.user._id) !== JSON.stringify(req.user.id))
        return res.status(400).json({
            message: "can't update this user doc"
        })
        

        const file_1 = file.car_license_image
        const file_2 = file.roadworthiness_image
        const file_3= file.insurance_image
        
        
        
           
            fs.unlink(file_1)
            fs.unlink(file_2)
            fs.unlink(file_3)
            
        
   
        

            
        // const files = ''
        // if(req.file){
        //    files = req.file.path
        // //    console.log(req.files)
        // }
        console.log("Files: ", req.files.image_1[0].path)
         const Car = await oldPrivateCar.findByIdAndUpdate(id, 
            {VIN: VIN,
            license_id,
            roadworthiness_id, 
            car_license_image,
            roadworthiness_image,
            insurance_image,
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
        console.log(err)
    }
}

const userSingleOldPrivateCar = async(req, res, next)=>{
    try{
        const id = req.params.id

        if ( id < 24 || id > 24)
        return res.status(400).json({
            message:"invalid password"
        })

    const singleUser = await oldPrivateCar.findById(id)
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

const singleUserAllOldPrivateCar = async(req, res, next)=>{
    try{
        const id = req.params.id

        if ( id < 24 || id > 24)
        return res.status(400).json({
            message:"invalid password"
        })

    const singleUser = await oldPrivateCar.find({user:req.user.id})

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
    uploadOldPrivateCar,
    deleteOldPrivateCar,
    updateOldPrivateCar,
    userSingleOldPrivateCar,
    singleUserAllOldPrivateCar
}