const book = require('../models/book');

exports.validateBook = async(req,res,next)=>{
    const {title,author,isbn,availableCopies} = req.body;
    if(!title || !author || !isbn || !availableCopies){
        return res.status(400).json({
            message:"All fields are required",
        })
    }
    next();

}

exports.checkBookExists = async (req, res, next) => {
    try {
      const bookId = req.params.id;
      const book = await BookModel.findById(bookId);
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
     
      req.book = book;
      next();
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

