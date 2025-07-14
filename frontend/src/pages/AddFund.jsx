import React, { useState } from "react";
import { createFund } from "../services/api";
import { useNavigate } from "react-router-dom";

const AddFund = () => {
  const [name, setName] = useState("");
  const [manager, setManager] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createFund({ name, manager });
      navigate("/");
    } catch (err) {
      setError("Failed to add fund");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Fund</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Fund Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Manager"
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          className="border p-2 rounded"
          required
        />
        {error && <div className="text-red-600">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={loading}>
          {loading ? "Adding..." : "Add Fund"}
        </button>
      </form>
    </div>
  );
};

export default AddFund; 