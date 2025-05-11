import React, { useState } from "react";
import HomePage from "./components/HomePage/index.js";
import UserList from "./components/UserList/index.js";
import UserDetail from "./components/UserDetail/index.js";
import UserPhotos from "./components/UserPhotos/index.js";
import UserComments from "./components/UserComments/index.js";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { fetchModel } from "./lib/fetchModelData";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsLoggedIn(true);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: "Lỗi kết nối server" };
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return React.createElement(
    Router,
    null,
    React.createElement(
      "div",
      {
        style: { display: "flex", flexDirection: "column", minHeight: "100vh" },
      },
      React.createElement(
        "div",
        {
          style: {
            padding: "10px",
            backgroundColor: "#f8f9fa",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          },
        },
        React.createElement("h2", null, "Photo Sharing App"),
        isLoggedIn &&
          React.createElement(
            "div",
            null,
            React.createElement(
              "span",
              { style: { marginRight: "10px" } },
              `Xin chào, ${user.first_name} ${user.last_name}`
            ),
            React.createElement(
              "button",
              {
                onClick: handleLogout,
                style: {
                  padding: "5px 10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                },
              },
              "Đăng xuất"
            )
          )
      ),
      React.createElement(
        Switch,
        null,
        React.createElement(Route, {
          exact: true,
          path: "/",
          render: () => React.createElement(HomePage, { isLoggedIn, user }),
        }),
        React.createElement(Route, {
          path: "/users",
          render: () =>
            React.createElement(
              "div",
              { style: { display: "flex" } },
              React.createElement(
                "div",
                { style: { width: "200px", borderRight: "1px solid #ccc" } },
                React.createElement(UserList, null)
              ),
              React.createElement(
                "div",
                { style: { flex: 1, padding: "20px" } },
                React.createElement(
                  Switch,
                  null,
                  React.createElement(Route, {
                    path: "/user/:id",
                    render: (props) =>
                      React.createElement(UserDetail, {
                        userId: props.match.params.id,
                      }),
                  }),
                  React.createElement(Route, {
                    path: "/photos/:id",
                    render: (props) =>
                      React.createElement(UserPhotos, {
                        userId: props.match.params.id,
                        isLoggedIn,
                      }),
                  }),
                  React.createElement(Route, {
                    path: "/comments/:id",
                    render: (props) =>
                      React.createElement(UserComments, {
                        userId: props.match.params.id,
                        isLoggedIn,
                      }),
                  })
                )
              )
            ),
        }),
        React.createElement(Route, {
          path: "/posts",
          render: () =>
            React.createElement(
              "div",
              null,
              React.createElement(
                "h2",
                null,
                "Danh sách Bài Viết (Chưa triển khai)"
              )
            ),
        }),
        React.createElement(Route, {
          path: "/about",
          render: () =>
            React.createElement(
              "div",
              null,
              React.createElement("h2", null, "Giới thiệu về Photo Sharing App")
            ),
        }),
        React.createElement(Route, {
          path: "/login",
          render: () =>
            isLoggedIn
              ? React.createElement(Redirect, { to: "/" })
              : React.createElement(
                  "div",
                  { style: { padding: "20px", textAlign: "center" } },
                  React.createElement("h2", null, "Đăng nhập"),
                  React.createElement(
                    "div",
                    {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "10px",
                        maxWidth: "300px",
                        margin: "0 auto",
                      },
                    },
                    React.createElement("input", {
                      type: "email",
                      id: "email",
                      placeholder: "Email",
                      style: { padding: "5px", width: "100%" },
                    }),
                    React.createElement("input", {
                      type: "password",
                      id: "password",
                      placeholder: "Mật khẩu",
                      style: { padding: "5px", width: "100%" },
                    }),
                    React.createElement(
                      "button",
                      {
                        onClick: async () => {
                          const email = document.getElementById("email").value;
                          const password =
                            document.getElementById("password").value;
                          const result = await handleLogin(email, password);
                          if (!result.success) {
                            alert(result.error);
                          }
                        },
                        style: {
                          padding: "10px 20px",
                          backgroundColor: "#007bff",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                        },
                      },
                      "Đăng nhập"
                    )
                  )
                ),
        })
      )
    )
  );
};

export default App;
