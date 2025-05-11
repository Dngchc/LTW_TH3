import React, { useState, useEffect } from "react";
import { fetchModel } from "../../lib/fetchModelData";

const UserDetail = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`/user/${userId}`).then((data) => setUser(data));
  }, [userId]);

  if (!user) {
    return React.createElement("div", null, "Đang tải...");
  }

  return React.createElement(
    "div",
    null,
    React.createElement("h1", null, `${user.first_name} ${user.last_name}`),
    React.createElement(
      "p",
      null,
      React.createElement("strong", null, "Vị trí: "),
      user.location
    ),
    React.createElement(
      "p",
      null,
      React.createElement("strong", null, "Mô tả: "),
      user.description
    ),
    React.createElement(
      "p",
      null,
      React.createElement("strong", null, "Nghề nghiệp: "),
      user.occupation
    )
  );
};

export default UserDetail;
