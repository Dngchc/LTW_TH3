import React from "react";
import { Link } from "react-router-dom";

const HomePage = ({ isLoggedIn, user }) => {
  return React.createElement(
    "div",
    { style: { padding: "20px", textAlign: "center" } },
    React.createElement("h1", null, "Chào mừng đến với Photo Sharing App"),
    isLoggedIn &&
      React.createElement(
        "p",
        null,
        `Xin chào, ${user.first_name} ${user.last_name}`
      ),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        },
      },
      React.createElement(
        Link,
        {
          to: "/users",
          style: {
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
          },
        },
        "Danh sách Người Dùng"
      ),
      React.createElement(
        Link,
        {
          to: "/posts",
          style: {
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
          },
        },
        "Danh sách Bài Viết"
      ),
      React.createElement(
        Link,
        {
          to: "/about",
          style: {
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
          },
        },
        "Giới thiệu"
      )
    ),
    React.createElement(
      "p",
      { style: { marginTop: "20px" } },
      isLoggedIn
        ? "Bạn đã đăng nhập. Bạn có thể đăng ảnh và bình luận."
        : "Vui lòng đăng nhập để đăng ảnh và bình luận. Hiện tại, bạn chỉ có thể xem ảnh của người khác."
    ),
    !isLoggedIn &&
      React.createElement(
        Link,
        {
          to: "/login",
          style: {
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
          },
        },
        "Đăng nhập"
      )
  );
};

export default HomePage;
