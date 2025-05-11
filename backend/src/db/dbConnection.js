const mongoose = require("mongoose");
const models = require("../modelData/model");

// Kết nối đến MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Kiểm tra và tạo dữ liệu mẫu khi cần
    await seedInitialData();

    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Hàm tạo dữ liệu mẫu khi cần
const seedInitialData = async () => {
  const User = require("./userModel");

  // Kiểm tra xem đã có dữ liệu trong DB chưa
  const userCount = await User.countDocuments();

  if (userCount === 0) {
    console.log("Seeding initial user data...");

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
    console.log("Initial user data seeded successfully!");
  }
};

module.exports = connectDB;
