"use client";
import { useState, useEffect } from "react";

export default function FetchPostsPage() {
  const [posts, setPosts] = useState([]);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/external")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPosts(data.data);
        } else {
          setError(data.message);
        }
      })
      .catch((err) => setError("An expected error"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div  className="container mx-auto p-6">
      <h1  className="text-3xl font-semibold text-center mb-6 text-blue-600 underline hover:underline-offset-8">Posts</h1>
      <ul  className="space-y-4">
        {posts.map((post: { id: number; title: string; body: string }) => (
          <li key={post.id} className="bg-white p-4 rounded-lg shadow-lg hover:bg-gray-200">
             <h2 className="text-xl font-semibold text-fuchsia-700">{post.title}</h2>
             <p className="text-gray-600 mt-2">{post.body}</p>
            </li>
        ))}
      </ul>
    </div>
  );
}