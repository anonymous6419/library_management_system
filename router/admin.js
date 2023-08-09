const router = require("express").Router();
const Admin = require("../controllers/admin");
const User = require("../controllers/user");
const Author = require("../controllers/author");
const Book = require("../controllers/book");
const { authenticateToken } = require("../middleware/auth");

router.post("/create", Admin.create);
router.get("/get/:       ", [authenticateToken], Admin.get);
router.get("/update/:username", [authenticateToken], Admin.update);
router.get("/delete/:username", Admin.delete);
router.post("/login", Admin.login);

// Admin handling the User Section
router.post("/user/create", User.create);
router.get("/user/get/:email", [authenticateToken], User.getUser);
router.get("/user/update/:id", [authenticateToken], User.updateUser);
router.get("/user/delete/:id", [authenticateToken], User.deleteUser);

// Admin handling the Author Section
router.post("/author/create", Author.create);
router.get("/author/get/:id", [authenticateToken], Author.getAuthor);
router.get("/author/update/:id", [authenticateToken], Author.updateAuthor);
router.get("/author/delete/:id", [authenticateToken], Author.deleteAuthor);

// Admin handling the Book Section
router.post("book/create", Book.create);
router.get("book/get/:id", Book.get);
router.get("book/update/:id/", Book.update);
router.get("book/delete/:id", Book.delete);

router.post("/issuebook", Admin.issueBookToUser);
router.post("/returnbook", Admin.returnBook);
module.exports = router;
