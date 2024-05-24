const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const fileUploadShema = new mongoose.Schema(
    {
        name:String,
        class:Number,
        subject:String
    }
);

module.exports = mongoose.model("fileUpload", fileUploadShema);