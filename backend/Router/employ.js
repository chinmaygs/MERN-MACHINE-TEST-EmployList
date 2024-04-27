const express=require("express")
const employController=require('../Controller/employ')
const router=express.Router()
const multer=require("multer")
const path = require('path')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router
.get('/',employController.getEmploy)
.post('/',upload.single('f_Image'),(req, res, next) => {
    next()
  },employController.createEmploy)
.patch('/:id',employController.updateEmploy)
.delete('/:id',employController.deleteEmploy)

exports.router=router
