import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Sam Fabrics Admin</h1>
      <p className="text-gray-600">Welcome! Use the link below to open the admin dashboard.</p>
      <Link
        href="/admin"
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Go to Admin
      </Link>
    </main>
  );
}


