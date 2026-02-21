import React, { useEffect, useState } from "react";
import Layout from "./layout";
import axios from "axios";

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalProducts: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    axios.get("/api/admin/dashboard/route")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats && Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-gray-500">{key.replace("total","")}</h3>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
