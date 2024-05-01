const express = require("express")
const employController = require('../Controller/employ')
const router = express.Router()
const multer = require("multer")
const path = require('path')
const jwt = require('jsonwebtoken');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  jwt.verify(token, 'abcdef', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    console.log(decoded);
  })
  next()
}

router
  .get('/', authenticateUser, employController.getEmploy)
  .post('/', authenticateUser, upload.single('f_Image'), (req, res, next) => {
    console.log('Request payload:', req.body);
    next()
  }, employController.createEmploy)
  .patch('/:id', authenticateUser, upload.single('f_Image'), (req, res, next) => {
    console.log('Request payload:', req.body);
    next()
  }, employController.updateEmploy)
  .delete('/:id', authenticateUser, employController.deleteEmploy)

exports.router = router
