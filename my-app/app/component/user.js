import { useEffect, useState } from "react";

const User = ({ state }) => {
  const [users, setUsers] = useState([]);
  const { contract } = state || {};

  useEffect(() => {
    const userInfo = async () => {
      const users = await contract.getUser();
      setUsers(users);
      console.log(users[0].email);
    };
    contract && userInfo();
  }, [contract]);

  return (
    <div className="user-info">
      {users.map((user, i) => (
        <div key={i}>
          <h3>{user.name}</h3>
          <h3>{user.email}</h3>
        </div>
      ))}
    </div>
  );
};

export default User;
