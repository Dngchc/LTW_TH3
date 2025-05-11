// const express = require("express");
// const Photo = require("../db/photoModel");
// const router = express.Router();

// router.post("/", async (request, response) => {});

// router.get("/", async (request, response) => {});

// module.exports = router;

const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();

router.get("/photosOfUser/:id", async (req, res) => {
  try {
    const photos = await Photo.find({ user_id: req.params.id })
      .populate("comments.user", "_id first_name last_name")
      .select("_id user_id file_name date_time comments");
    if (!photos || photos.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid user ID or no photos found" });
    }
    res.json(photos);
  } catch (error) {
    res.status(400).json({ message: "Invalid user ID", error });
  }
});

module.exports = router;
