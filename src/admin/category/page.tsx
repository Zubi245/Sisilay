import React, { useEffect, useState } from "react";
import Layout from "../layout";
import axios from "axios";

interface Category {
  _id: string;
  name: string;
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios.get("/api/admin/categories/route")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Categories</h2>
      <ul className="bg-white rounded shadow divide-y">
        {categories.map(cat => (
          <li key={cat._id} className="p-4 hover:bg-gray-100 transition">{cat.name}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default CategoriesPage;
