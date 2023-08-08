const authorModel = require('../models/author');
exports.validateAuthor = async (req,res,next)=>{
    try{
       const {name,nationality,dob} = req.body;
       if(!name || !nationality){
        return res.status(400).json({
            error:"All fields are required"
        })
       }

       req.body.name = req.body.name.toString().toLowerCase();
       req.body.nationality = req.body.nationality.toString().toLowerCase();
       next();
    }
    catch(error){
        return res.status(500).send(error.message)
    }
};

exports.checkAuthor = async (req,res,next)=>{
    try {
        const author = await authorModel.findById(req.params.id)
        if(!author){
            return res.status(400).json({
                error:"Author"
            })
        }
        req.author = author;
        next();
    } catch (error) {
        res.status(400).send(error.message)
    }
}