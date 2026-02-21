"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props { children: ReactNode; }

const navItems = [
  { name: "Dashboard", href: "/admin" },
  { name: "Products", href: "/admin/products" },
  { name: "Categories", href: "/admin/categories" },
  { name: "Orders", href: "/admin/orders" },
  { name: "Users", href: "/admin/users" },
];

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg p-5 hidden md:block">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-all"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-5">{children}</main>
    </div>
  );
}
