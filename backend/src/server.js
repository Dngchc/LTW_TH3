const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db/dbConnection");
const photoRouter = require("./routes/PhotoRouter");
const userRouter = require("./routes/UserRouter");

// Đọc biến môi trường từ file .env
dotenv.config();

// Khởi tạo Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Phục vụ các tập tin tĩnh từ thư mục public
app.use(express.static(path.join(__dirname, "public")));

// Kết nối đến MongoDB
connectDB();

// Định nghĩa các routes
app.use("/photos", photoRouter);
app.use("/users", userRouter);

// Route mặc định
app.get("/", (req, res) => {
  res.send("Photo Sharing API is running");
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
