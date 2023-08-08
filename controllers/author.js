const AuthorModel = require('../models/author');

exports.create = async (req,res)=>{
    try{
        const createauthor = await AuthorModel.create(req.body)
        return res.status(201).json({
            message:"Author added successfully",
            success:1,
            createauthor
        })
    }
    catch(error){
        return res.status(500).send(error.message)
    }
}

exports.getAuthor = async(req,res)=>{
    try {
        const authorUser = await AuthorModel.find({_id:req.params.id})
        return res.status(200).json({
            message:"Author is founded",
            status:1,
            data:authorUser
        })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

exports.updateAuthor = async (req,res)=>{
    try {
        const {name,nationality,dob} = req.body;
        const updatedFields = {}
        if(name) updatedFields.name = name;
        if(nationality) updatedFields.nationality = nationality;
        if(dob) updatedFields.dob = dob;
        const authorUpdate = await AuthorModel.findOneAndUpdate({_id:req.params.id},updatedFields,{new:true})
        return res.status(200).json({
            message:"Author updated Successfully",
            status:1,
            data:authorUpdate
        })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

exports.deleteAuthor = async(req,res)=>{
    try {
        const delAuthor = await AuthorModel.deleteOne({_id:req.params.id})
        return res.status(200).json({
            message:"Data deleted",
            status:1,
            data:delAuthor
        })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}