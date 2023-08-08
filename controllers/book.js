const BookModel = require("../models/book");
const UserModel = require('../models/user')

exports.create = async (req, res) => {
  try {
    const createBook = await BookModel.create(req.body);
    return res.status(200).json({
      message: "Book is availabe",
      success: 1,
      data: createBook,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.get = async (req,res) =>{
    try {
        
        const getBook = await BookModel.findOne({_id:req.params.id})
        return res.status(200).json({
            message:"Book is founded",
            status:1,
            data:getBook
        })
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.update = async (req,res) =>{
    try {
        const {title,author,isbn,availableCopies} = req.body;
        const updatedFields = {}
        if(title) updatedFields.title = title;
        if(author) updatedFields.author = author;
        if(isbn) updatedFields.isbn = isbn;
        if(availableCopies) updatedFields.availableCopies = availableCopies;


        const getAllBook = await BookModel.findOneAndUpdate({_id:req.params.id},updatedFields,{new:true})
        return res.status(200).json({
            message:"Book Updated Successfully",
            status:1,
            data:getAllBook
        })
    } catch (error) {
        return res.status(500).send(error.message)
    }
};

exports.delete = async(req,res)=>{
    try {
        const deleteBook = await BookModel.findOneAndDelete({_id:req.params.id})
        return res.status(200).json({
            message:"Book is deleted",
            status:1,
            data:deleteBook
        })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

exports.issueDate = async(req,res,next)=>{
    try{
        const bookId = req.params.id;
        const book = req.book;

        if(book.availableCopies <= 0){
            return res.status(400).json({
                message:"No copies availabe currently"
            })
        }
        book.issueDate = new Date();
        book.availableCopies--;

        const updatedBook = await BookModel.save();
        return res.status(200).json({
            message:"Book issued successfully",
            data:updatedBook
        })
    }
    catch(error){
         return res.status(400).send(error.message)
    }
}

exports.returnBook = async (req,res)=>{
    try {
        const book = req.book;
        book.returnBook = new Date();
        availableCopies++;

        const updatedBook = await BookModel.save();
        return res.status(200).json({
            message:"Return book successfully",
            data:updatedBook
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

exports.issueBook = async (req,res)=>{
    try {
        const {bookId,userId} = req.body;
        const book = await BookModel.find(bookId);
        if(!bookId){
            return res.status(404).json({message:"Book not found"})
        }
        if (book.status === 'issued') {
            return res.status(400).json({ error: 'Book is already issued' });
          }
      
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          book.status = 'issued';
          book.issuedTo = userId;
          await book.save();
      
          return res.status(200).json({ message: 'Book issued successfully' });
        
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
}