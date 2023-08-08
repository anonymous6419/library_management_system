const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const app = express();
require("dotenv").config();
const UserRoute = require("./router/user");
const AuthorRoute = require("./router/author");
const BookRoute = require("./router/book");
const AdminRoute = require("./router/admin");
const upload = require("./middleware/fileupload");
// const fileRoute = require("./router/file");
const dbConnection = require("./config/dbConfig");
const port = process.env.PORT || 8000;
app.use(
  cors({
    origin: "*",
  })
);

dbConnection.dbConnection();
// app.use(multer().any());

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.status(201).send(`This is running ${port}`);
});

app.use("/user", UserRoute);
app.use("/author", AuthorRoute);
app.use("/book", BookRoute);
app.use("/admin", AdminRoute);
app.post("/upload", upload, (req, res) => {
  res.send("file is uploaded");
});
// app.use("/uploads", fileRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
