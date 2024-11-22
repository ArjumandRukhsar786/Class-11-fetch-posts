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

  if (loading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-semibold text-blue-600">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-semibold text-red-600">{error}</h1>
      </div>
    );
  }

  return (
    <div  className="container mx-auto p-6">
      <h1  className="text-3xl font-semibold text-center mb-6 text-blue-600 underline hover:underline-offset-8">
        Latest Posts</h1>
      <ul  className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: { id: number; title: string; body: string }) => (
          <li key={post.id} className="bg-pink-300 p-4 rounded-lg shadow-lg hover:bg-gray-200">
             <h2 className="text-xl font-semibold text-fuchsia-700">{post.title}</h2>
             <p className="text-gray-600 mt-2">{post.body}</p>
            </li>
        ))}
      </ul>
    </div>
  );
}