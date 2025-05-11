const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./userModel");
const models = require("../modelData/model");

// Đọc biến môi trường từ file .env
dotenv.config();

// Kết nối đến MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Import dữ liệu mẫu từ model.js vào MongoDB
const importData = async () => {
  try {
    await connectDB();

    // Xóa dữ liệu hiện có
    await User.deleteMany();
    console.log("Existing data deleted");

    // Lấy danh sách người dùng từ model.js
    const users = models.userListModel();

    // Tạo mảng các đối tượng user để insert vào DB
    const userObjects = users.map((user) => ({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      location: user.location,
      description: user.description,
      occupation: user.occupation,
      email: user.email,
      password: user.password,
    }));

    // Insert tất cả users vào DB
    await User.insertMany(userObjects);
    console.log("Data imported successfully!");

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Chạy script
importData();
