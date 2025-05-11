import React, { useState, useEffect } from "react";
import { fetchModel } from "../../lib/fetchModelData";

const UserPhotos = ({ userId, isLoggedIn }) => {
  const [photos, setPhotos] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);

  useEffect(() => {
    fetchModel(`/photos/photosOfUser/${userId}`).then((data) =>
      setPhotos(data || [])
    );
  }, [userId]);

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/200";
  };

  const handleCommentSubmit = (photoId) => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để bình luận.");
      return;
    }
    // Logic giả lập gửi bình luận (chưa có API backend)
    console.log(`Gửi bình luận "${commentText}" cho ảnh ${photoId}`);
    setCommentText("");
    setSelectedPhotoId(null);
  };

  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, "Ảnh của người dùng"),
    photos.length === 0
      ? React.createElement("p", null, "Không có ảnh nào.")
      : photos.map((photo) =>
          React.createElement(
            "div",
            { key: photo._id, style: { marginBottom: "20px" } },
            React.createElement("img", {
              src: `/images/${photo.file_name}`,
              alt: "User photo",
              style: { width: "200px" },
              onError: handleImageError,
            }),
            React.createElement(
              "p",
              null,
              React.createElement("strong", null, "Ngày đăng: "),
              new Date(photo.date_time).toLocaleString()
            ),
            React.createElement(
              "p",
              null,
              React.createElement("strong", null, "Số lượng bình luận: "),
              photo.comments.length
            ),
            !isLoggedIn &&
              photo.comments.length > 0 &&
              React.createElement(
                "ul",
                null,
                photo.comments.map((comment) =>
                  React.createElement(
                    "li",
                    { key: comment._id },
                    `${comment.comment} - `,
                    React.createElement(
                      "strong",
                      null,
                      `${comment.user.first_name} ${comment.user.last_name}`
                    ),
                    ` (${new Date(comment.date_time).toLocaleString()})`
                  )
                )
              ),
            isLoggedIn &&
              React.createElement(
                "div",
                null,
                selectedPhotoId === photo._id
                  ? React.createElement(
                      "div",
                      null,
                      React.createElement("input", {
                        type: "text",
                        value: commentText,
                        onChange: (e) => setCommentText(e.target.value),
                        placeholder: "Nhập bình luận...",
                        style: { padding: "5px", marginRight: "10px" },
                      }),
                      React.createElement(
                        "button",
                        {
                          onClick: () => handleCommentSubmit(photo._id),
                          style: {
                            padding: "5px 10px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                          },
                        },
                        "Gửi"
                      ),
                      React.createElement(
                        "button",
                        {
                          onClick: () => setSelectedPhotoId(null),
                          style: {
                            padding: "5px 10px",
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            marginLeft: "10px",
                          },
                        },
                        "Hủy"
                      )
                    )
                  : React.createElement(
                      "button",
                      {
                        onClick: () => setSelectedPhotoId(photo._id),
                        style: {
                          padding: "5px 10px",
                          backgroundColor: "#28a745",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                        },
                      },
                      "Bình luận"
                    )
              )
          )
        )
  );
};

export default UserPhotos;
