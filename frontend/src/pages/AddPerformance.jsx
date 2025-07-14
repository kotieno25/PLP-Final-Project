import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createFundPerformance } from "../services/api";

const AddPerformance = () => {
  const { fundId } = useParams();
  const [date, setDate] = useState("");
  const [nav, setNav] = useState("");
  const [yieldValue, setYieldValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createFundPerformance({ date, nav: Number(nav), yield: Number(yieldValue), fundId: Number(fundId) });
      navigate(`/funds/${fundId}`);
    } catch (err) {
      setError("Failed to add performance");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Performance</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="NAV"
          value={nav}
          onChange={(e) => setNav(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Yield"
          value={yieldValue}
          onChange={(e) => setYieldValue(e.target.value)}
          className="border p-2 rounded"
          required
        />
        {error && <div className="text-red-600">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={loading}>
          {loading ? "Adding..." : "Add Performance"}
        </button>
      </form>
    </div>
  );
};

export default AddPerformance; 