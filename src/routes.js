const express = require('express');
const multer = require('multer');
const routes = express.Router();

const userController = require('./controllers/userController.js');

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null,true);
    }else{
        cb(null,false);
    }
};

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
});

routes.get('/:id',userController.findUser);
routes.post('/register',upload.single('picture'),userController.registerUser);
routes.patch('/register',userController.updateUser);
routes.delete('/register',userController.deleteUser);

module.exports = routes;