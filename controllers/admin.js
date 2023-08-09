const { tokenGenerator } = require("../globals/global");
const AdminModel = require("../models/admin");
const BookModel = require("../models/book");
const UserModel = require("../models/user");
const { addDays } = require("date-fns");
const { differenceInDays } = require("date-fns");

exports.issueBookToUser = async (req, res) => {
  // try {
  //   const { bookId, userId } = req.body;

  //   const book = await BookModel.findById({ _id: bookId });
  //   if (!book) {
  //     return res.status(404).json({ error: "Book not found" });
  //   }

  //   if (book.status === "issued") {
  //     return res.status(400).json({ error: "Book is already issued" });
  //   }

  //   const user = await UserModel.findById({ _id: userId });
  //   if (!user) {
  //     return res.status(404).json({ error: "User not found" });
  //   }

  //   book.status = "issued";
  //   book.issuedTo = userId;
  //   book.issuedDate = Date.now();
  //   await book.save();
  //   return res
  //     .status(200)
  //     .json({ message: "Book issued to user successfully" });
  // } catch (error) {
  //   return res.status(500).json({ error: "An error occurred" });
  // }
  try {
    const { bookId, userId, dueDate } = req.body;
    const book = await BookModel.findById({ _id: bookId });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (book.status === "issued") {
      return res.status(400).json({ error: "Book is already issued" });
    }

    const user = await UserModel.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // const returnTimePeriod = 7; // Admin-defined return time period in days
    // const dueDate = addDays(new Date(), returnTimePeriod);

    book.status = "issued";
    book.issuedTo = userId;
    book.issuedDate = "2023-08-01T10:59:29.958Z";
    book.dueDate = dueDate; // Set the dueDate
    await book.save();

    return res.status(200).json({ message: "Book issued successfully" });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" });
  }
};

exports.returnBook = async (req, res) => {
  // try {
  //   const { bookId, userId } = req.body;

  //   const book = await BookModel.findById(bookId);
  //   if (!book) {
  //     return res.status(404).json({ error: 'Book not found' });
  //   }

  //   if (book.status === 'available') {
  //     return res.status(400).json({ error: 'Book is available' });
  //   }

  //   if (!book.issuedTo.equals(userId)) {
  //     return res.status(400).json({ error: 'Book was not issued to this user' });
  //   }

  //   book.status = 'available';
  //   book.issuedTo = null;
  //   book.issuedDate = null;
  //   book.returnBy = userId;
  //   book.returnDate = new Date();
  //   await book.save();

  //   return res.status(200).json({ message: 'Book returned successfully' });
  // } catch (error) {
  //   return res.status(500).json({ error: 'An error occurred' });
  // }
  try {
    const { bookId } = req.body;

    const book = await BookModel.findById({ _id: bookId });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (book.status === "available") {
      return res.status(400).json({ error: "Book is already available" });
    }

    const currentDate = new Date();
    console.log(currentDate);

    const daysLate = differenceInDays(currentDate, book.dueDate);
    console.log(book.dueDate);
    console.log(daysLate);

    if (daysLate > 0) {
      const penaltyPerDay = 10; // Admin-defined penalty per day
      const totalPenalty = daysLate * penaltyPerDay;

      book.penalty = totalPenalty;
      await book.save();
    }

    book.status = "available";
    book.issuedTo = null;
    book.issuedDate = null;
    book.dueDate = null;
    await book.save();

    return res
      .status(200)
      .json({ message: "Book returned successfully", penalty: book.penalty });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" });
  }
};

exports.create = async (req, res) => {
  try {
    const createAdmin = await AdminModel.create(req.body);
    return res.status(200).json({
      message: "Admin is created",
      status: 1,
      data: createAdmin,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await AdminModel.findOne({ username });
    if (user.password !== password) {
      return res.status(400).send("Invalid Password!");
    }
    const payload = {
      userId: user._id,
      username: username,
      role: "admin",
    };
    let token = tokenGenerator(payload);
    return res
      .status(200)
      .json({ message: "User authenticated successfully", token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
exports.get = async (req, res) => {
  try {
    console.log(req.user);
    const getAdmin = await AdminModel.find({ id: req.body._id });
    return res.status(200).json({
      message: "User found successfully",
      status: 1,
      data: getAdmin,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
exports.update = async (req, res) => {
  try {
    const { username, password } = req.body;
    const updatedFields = {};
    if (username) updatedFields.username = username;
    if (password) updatedFields.password = password;
    const adminUpdate = await AdminModel.findOneAndUpdate(
      { username: req.params.username },
      updatedFields,
      { new: true }
    );
    return res.status(200).json({
      message: "Update is successfully",
      status: 1,
      data: adminUpdate,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const delAdmin = await AdminModel.findOneAndDelete({
      username: req.params.username,
    });
    return res.status(200).json({
      message: "User deleted successfully",
      status: 1,
      data: delAdmin,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
