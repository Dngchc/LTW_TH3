// const mongoose = require("mongoose");
require("dotenv").config();

const models = require("../modelData/models.js");
const User = require("./userModel.js");
const Photo = require("./photoModel.js");
const SchemaInfo = require("./schemaInfo.js");

const versionString = "1.0";

async function dbLoad() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB Atlas!");

    await User.deleteMany({});
    await Photo.deleteMany({});
    await SchemaInfo.deleteMany({});

    const userModels = models.userListModel();
    const mapFakeId2RealId = {};
    for (const user of userModels) {
      const userObj = new User({
        first_name: user.first_name,
        last_name: user.last_name,
        location: user.location,
        description: user.description,
        occupation: user.occupation,
      });
      await userObj.save();
      mapFakeId2RealId[user._id] = userObj._id;
      user.objectID = userObj._id;
      console.log(
        "Adding user:",
        user.first_name + " " + user.last_name,
        " with ID ",
        user.objectID
      );
    }

    const photoModels = [];
    const userIDs = Object.keys(mapFakeId2RealId);
    userIDs.forEach((id) => {
      photoModels.push(...models.photoOfUserModel(id));
    });
    for (const photo of photoModels) {
      const photoObj = await Photo.create({
        file_name: photo.file_name,
        date_time: photo.date_time,
        user_id: mapFakeId2RealId[photo.user_id],
        comments: [],
      });
      photo.objectID = photoObj._id;

      if (photo.comments) {
        photo.comments.forEach((comment) => {
          photoObj.comments.push({
            comment: comment.comment,
            date_time: comment.date_time,
            user: mapFakeId2RealId[comment.user._id],
          });
          console.log(
            "Adding comment of length %d by user %s to photo %s",
            comment.comment.length,
            comment.user._id,
            photo.file_name
          );
        });
      }

      await photoObj.save();
      console.log(
        "Adding photo:",
        photo.file_name,
        " of user ID ",
        photoObj.user_id
      );
    }

    const schemaInfo = await SchemaInfo.create({
      version: versionString,
    });
    console.log("SchemaInfo object created with version ", schemaInfo.version);

    console.log("Database loaded successfully!");
  } catch (error) {
    console.error("Error loading database:", error);
  } finally {
    mongoose.disconnect();
  }
}

dbLoad();
