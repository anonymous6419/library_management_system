// const FileModel = require("../models/file");

// exports.uploadFile = async (req, res) => {
//   try {
//     console.log(req.file, req.files);
//     if (!req.file) {
//       return res.status(400).json({
//         error: "No file uploaded",
//       });
//     }

//     // Save file information to the database
//     const { originalname, mimetype, filename, size } = req.file;
//     const newFile = new FileModel({
//       originalname,
//       mimetype,
//       filename,
//       size,
//     });

//     await newFile.save();

//     return res.status(200).json({
//       message: "File uploaded successfully",
//       fileInfo: { originalname, mimetype, filename, size },
//     });
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };

// exports.upldFile = async (req, res) => {

//   try {
//     if (req.file) {
//       const fileDataAsString = req.file.buffer.toString(); // Convert buffer to string
//       console.log("File Data:", fileDataAsString);
//     } else if (req.files) {
//       req.files.forEach((file, index) => {
//         const filedataasString = file.buffer.toString(); //converting data to String
//         console.log(
//           `file Data  ${index + 1} Data =>>` + filedataasString.green
//         ); //printing converted String data in console
//       });
//     } else {
//       return res.status(400).send("Please select a file You want to Upload");
//     }

//     // Storing File that is being Uploaded from the user
//     fs.writeFileSync(
//       `${path}` + req.files[0].originalname,
//       req.files[0].buffer
//     );
//     return res.status(200).send("files Uploaded Successfully");
//   } catch (error) {
//     return res.status(500).send("File Upload error");
//   }
// };
