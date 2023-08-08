const multer = require("multer");

// const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload.single("xyz");
// app.use(express.static('public'));

// app.post('/upload', upload.array('files', 5), (req, res) => {

//   res.send('Files uploaded successfully.');
// });
