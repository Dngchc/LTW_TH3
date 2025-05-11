import React, { useState, useEffect } from "react";
import { fetchModel } from "../../lib/fetchModelData";
import { Link } from "react-router-dom";

const UserComments = ({ userId, isLoggedIn }) => {
  const [commentsWithPhotos, setCommentsWithPhotos] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);

  useEffect(() => {
    fetchModel(`/photos/photosOfUser/${userId}`).then((data) => {
      const comments = [];
      (data || []).forEach((photo) => {
        photo.comments.forEach((comment) => {
          if (comment.user._id === userId) {
            comments.push({ ...comment, photo });
          }
        });
      });
      setCommentsWithPhotos(comments);
    });
  }, [userId]);

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/100";
  };

  const handleCommentSubmit = (photoId) => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để bình luận.");
      return;
    }
    console.log(`Gửi bình luận "${commentText}" cho ảnh ${photoId}`);
    setCommentText("");
    setSelectedPhotoId(null);
  };

  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, "Bình luận của người dùng"),
    commentsWithPhotos.length === 0
      ? React.createElement("p", null, "Không có bình luận nào.")
      : commentsWithPhotos.map((comment) =>
          React.createElement(
            "div",
            { key: comment._id, style: { marginBottom: "20px" } },
            React.createElement(
              Link,
              { to: `/photos/${comment.photo.user_id}` },
              React.createElement("img", {
                src: `/images/${comment.photo.file_name}`,
                alt: "Thumbnail",
                style: { width: "100px" },
                onError: handleImageError,
              })
            ),
            React.createElement(
              "p",
              null,
              `${comment.comment} - (${new Date(
                comment.date_time
              ).toLocaleString()})`
            ),
            isLoggedIn &&
              comment.photo._id === selectedPhotoId &&
              React.createElement(
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
                    onClick: () => handleCommentSubmit(comment.photo._id),
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
              ),
            isLoggedIn &&
              comment.photo._id !== selectedPhotoId &&
              React.createElement(
                "button",
                {
                  onClick: () => setSelectedPhotoId(comment.photo._id),
                  style: {
                    padding: "5px 10px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                  },
                },
                "Thêm Bình luận"
              )
          )
        )
  );
};

export default UserComments;
