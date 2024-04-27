const mongoose=require("mongoose")
const {Schema} = mongoose

const employSchema=new Schema({
    f_Id:{type:Schema.Types.UUID},
    f_Image:{type: String},
    f_Name:{type:String,require:true},
    f_Email:{type:String,require:true,unique:true},
    f_Mobile:{type:Number, min:[10,'Enter valid number'],require:true},
    f_Designation:{type:String,require:true},  
    f_gender:{type:String,require:true},
    f_Course:{type:Array,require:true},
    f_Createdate:{type:Date,require:true,default:Date.now}
    
})


const UserSchema=new Schema({
    f_sno:{type:Schema.Types.UUID},
    f_Email:{type:String,require:true,unique:true},
    f_userName:{type:String,require:true,unique:true},
    f_Pwd:{type:String,require:true}
    
    
})


exports.Employ=mongoose.model('Employ',employSchema)

exports.Users=mongoose.model('Users',UserSchema)