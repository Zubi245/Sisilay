import React, { useEffect, useState } from "react";
import Layout from "../layout";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get("/api/admin/users/route")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Users</h2>
      <ul className="bg-white rounded shadow divide-y">
        {users.map(u => (
          <li key={u._id} className="p-4 hover:bg-gray-100 transition">{u.name} - {u.email}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default UsersPage;
