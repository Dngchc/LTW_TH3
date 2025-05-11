import React, { useState, useEffect } from "react";
import { fetchModel } from "../../lib/fetchModelData";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchModel("/user/list")
      .then(async (data) => {
        if (!data) {
          setError("Không thể tải danh sách người dùng.");
          return;
        }
        const usersWithCounts = await Promise.all(
          data.map(async (user) => {
            const photos = await fetchModel(`/photos/photosOfUser/${user._id}`);
            const photoCount = photos ? photos.length : 0;
            const commentCount = photos
              ? photos.reduce(
                  (sum, p) =>
                    sum +
                    (p.comments
                      ? p.comments.filter((c) => c.user._id === user._id).length
                      : 0),
                  0
                )
              : 0;
            return { ...user, photoCount, commentCount };
          })
        );
        setUsers(usersWithCounts);
      })
      .catch((err) => {
        setError("Lỗi khi tải danh sách người dùng: " + err.message);
      });
  }, []);

  if (error) {
    return React.createElement("div", null, error);
  }

  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, "Danh sách người dùng"),
    users.length === 0
      ? React.createElement("p", null, "Không có người dùng nào.")
      : React.createElement(
          "ul",
          null,
          users.map((user) =>
            React.createElement(
              "li",
              { key: user._id, style: { marginBottom: "10px" } },
              React.createElement(
                Link,
                { to: `/user/${user._id}` },
                `${user.first_name} ${user.last_name}`
              ),
              React.createElement(
                "span",
                { style: { color: "green", marginLeft: "10px" } },
                ` (${user.photoCount})`
              ),
              React.createElement(
                Link,
                { to: `/comments/${user._id}` },
                React.createElement(
                  "span",
                  { style: { color: "red", marginLeft: "5px" } },
                  ` (${user.commentCount})`
                )
              )
            )
          )
        )
  );
};

export default UserList;
