const router = require("express").Router();
const Book = require("../controllers/book");
const {validateBook,checkBookExists,} = require('../middleware/book')

router.post("/create",[validateBook], Book.create);
router.get("/get/:id",[checkBookExists],Book.get);
router.get('/update/:id',[validateBook],[checkBookExists],Book.update);
router.get('/delete/:id',[checkBookExists],Book.delete);

module.exports = router