import React from "react";

const UserList = ({ users }) => {
  console.log("users", users);
  return (
    <section className="userList">
      <h3>Online Users</h3>
      <ul>
        {users.map(({ username }, index) => (
          <li key={username + index}>{username}</li>
        ))}
      </ul>
    </section>
  );
};

export default UserList;
