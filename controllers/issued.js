const issuedModel = require('../models/issued');

exports.searchUser = async (req,res)=>{
    try {
        const findUser = issuedModel.find({_id:req.params.id});
        if(findUser){
            return res.status(200).json({
                message:"user found"
            })
        }
    } catch (error) {
        res.status(400).send("No book issued");
    }
}