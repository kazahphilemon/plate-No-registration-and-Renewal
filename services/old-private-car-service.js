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
        // fs.unlink(me, (err,) => {

        //     if (err) {
        //       res.status(500).send({
        //         message: "Could not delete the file. " + err,
        //       });
        //     }
        
        //     res.status(200).send({
        //       message: "File is deleted.",
        //     });
        // })
      

        const car = await oldPrivateCar.findByIdAndDelete(id);
        
        


        if (!car)
        return res.status(400).json({
            message: 'No car with such Id',
            success: false
        
    });
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
        
    findVIN = await newCar.findOne({VIN})

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
        res.status(400).json({
            message:"some fields are missing"
        })
        console.log("some fields are missing")
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
        console.log("Files: ", req.files.image_1[0].path)
         const Car = await oldPrivateCar.findByIdAndUpdate(id, 
            {VIN: VIN,
            license_id,
            roadworthiness_id, 
            car_license_image,
            roadworthiness_image,
            insurance_image,
        }, { new: true} );

        

    
        if (!Car)
        return res.status(400).json({
            message: 'No car with such Id',
            success: false
        
    });
    return res.status(200).json({
        success: true,
        car: Car,
        message:"newCar updated succesfully"
    })

    }catch (err){
        console.log(err.message)
    }
}


module.exports ={
    uploadOldPrivateCar,
    deleteOldPrivateCar,
    updateOldPrivateCar

}