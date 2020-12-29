const express = require("express");
const multer = require("multer");

const router = express.Router();

router.get("/editor", function (req, res) {
  res.render("vwDemo/editor");
});

router.post("/editor", function (req, res) {
  console.log(req.body.FullDes);
  res.render("vwDemo/editor");
});

router.get("/upload", function (req, res) {
  res.render("vwUser/UploadCourse");
});

router.post("/upload", function (req, res) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/course/img/");
    },
    filename: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });
  // upload.array("fuMain", 3)(req, res, function (err) {
  upload.single("ulAva")(req, res, async function (err) {
    if (err) {
    } else {
      res.render("vwUser/UploadCourse");
    }
  });
});

module.exports = router;
