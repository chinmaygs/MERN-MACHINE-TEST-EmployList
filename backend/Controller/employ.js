const fs=require('../Model/List')

const employ=fs.Employ

exports.createEmploy=async(req,res)=>{
    const prod=await employ.create({...req.body,f_Image:req.file.filename})
    res.json(prod)
};

exports.getEmploy=async(req,res)=>{
    const product=await employ.find()
    res.json(product)
}

exports.updateEmploy=async(req,res)=>{
    const {id: id}=req.params
try{
    const doc=await employ.findOneAndUpdate({_id:id},req.body,{returnDocument:"after"})
    res.status(201).json(doc)
}
catch(err){
    console.log(err)
    res.status(400).json(err)
}
}

exports.deleteEmploy=async(req,res)=>{
    const id=req.params.id
    try{
        const doc= await employ.findOneAndDelete({_id:id})
        res.status(201).json(doc)
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

