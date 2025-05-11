const express = require("express");
const router = express.Router();
const User = require("../db/userModel");

router.get("/list", async (req, res) => {
  try {
    const users = await User.find({}, "_id first_name last_name");
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user list:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Route đăng nhập - đã sửa để xử lý lỗi đúng cách
router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email);

    if (!email || !password) {
      return res.status(400).json({ error: "Email và mật khẩu là bắt buộc" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found:", email);
      return res.status(401).json({ error: "Email không tồn tại" });
    }

    // So sánh mật khẩu
    if (user.password !== password) {
      console.log("Password mismatch for:", email);
      return res.status(401).json({ error: "Mật khẩu không đúng" });
    }

    // Đăng nhập thành công
    console.log("Login successful:", email);
    return res.status(200).json({
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      message: "Đăng nhập thành công",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Lỗi server khi đăng nhập" });
  }
});

module.exports = router;
