const router = require('express').Router();
const User = require('../controllers/user');


router.post("/create",User.create);
router.get('/get-all',User.getUsers)
router.get('/get/:id',User.getUser)
router.get('/update/:id',User.updateUser);
router.get('/delete/:id',User.deleteUser)
module.exports = router;

