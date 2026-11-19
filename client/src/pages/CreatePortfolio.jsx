import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const categories = ["flooring", "wall-colours", "tiles", "stairs", "kitchen", "bedroom", "living-room", "exterior"];

export default function CreatePortfolio() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "flooring",
    style: "modern",
    imageUrl: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, description, category, style, imageUrl } = form;
      await API.post("/portfolios", {
        title,
        description,
        category,
        style,
        images: imageUrl ? [imageUrl] : [],
      });
      navigate("/designer/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create portfolio");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-bold">Create Portfolio</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input name="title" placeholder="Title" onChange={handleChange} className="w-full border p-2 rounded" required />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full border p-2 rounded" rows="4" required />
        <select name="category" onChange={handleChange} className="w-full border p-2 rounded">
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input name="style" placeholder="Style (modern, classic...)" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="imageUrl" placeholder="Image URL" onChange={handleChange} className="w-full border p-2 rounded" />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Create</button>
      </form>
    </div>
  );
}
