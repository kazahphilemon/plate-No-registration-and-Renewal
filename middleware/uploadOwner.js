const path = require("path")
const multer = require("multer")
const fs = require('fs/promises')

var Storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/")
    },
    filename: function(req, file, cb){
        // let ext = path.extname(file.originalname)
      cb(null, file.originalname )
    }
  })
  
  var upload = multer({ 
    storage: Storage,
    fileFilter: function(req, file, callback){

        // let files = fs.readdir('uploads/');
        // if(files.includes(file.originalname)){
        //     fs.unlink('pwrite the pathath'+ file.originalname);
        // }

        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            callback(null, true)
        }else{
            console.log("only png, jpg or jpeg files are supported")
            callback(null, false)
        }
    },
    limits:{
        fileSize:1024*1024*3
    }
    
})

module.exports = upload