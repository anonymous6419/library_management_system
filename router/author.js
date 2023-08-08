const router = require('express').Router();
const Author = require('../controllers/author');
const {validateAuthor,checkAuthor } = require('../middleware/author')
router.post("/create",[validateAuthor],Author.create);
router.get("/get/:id",[validateAuthor],Author.getAuthor);
router.get("/update/:id",[checkAuthor],Author.updateAuthor);
router.get("/delete/:id",[checkAuthor],Author.deleteAuthor);
module.exports = router;