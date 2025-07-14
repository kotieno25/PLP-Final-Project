import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getFund, getFundStatistics, getFundPerformances } from "../services/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const FundDetails = () => {
  const { id } = useParams();
  const [fund, setFund] = useState(null);
  const [stats, setStats] = useState(null);
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [fundRes, statsRes, perfRes] = await Promise.all([
        getFund(id),
        getFundStatistics(id),
        getFundPerformances({ fundId: id })
      ]);
      setFund(fundRes.data);
      setStats(statsRes.data);
      setPerformances(perfRes.data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading fund details...</div>;
  if (!fund) return <div className="p-8 text-center">Fund not found.</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{fund.name}</h1>
      <div className="mb-4 text-gray-600">Manager: {fund.manager}</div>
      <div className="mb-4">
        <div>Average NAV: <span className="font-mono">{stats?.averageNav ?? "-"}</span></div>
        <div>Average Yield: <span className="font-mono">{stats?.averageYield ?? "-"}</span></div>
      </div>
      <h2 className="text-xl font-semibold mt-6 mb-2">Performance History</h2>
      <div className="w-full h-72 mb-6 bg-white rounded shadow flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performances.map(p => ({ ...p, date: new Date(p.date).toLocaleDateString() }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" label={{ value: 'NAV', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Yield', angle: 90, position: 'insideRight' }} />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="nav" stroke="#2563eb" name="NAV" />
            <Line yAxisId="right" type="monotone" dataKey="yield" stroke="#16a34a" name="Yield" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">NAV</th>
            <th className="p-2 border">Yield</th>
          </tr>
        </thead>
        <tbody>
          {performances.map((perf) => (
            <tr key={perf.id}>
              <td className="p-2 border">{new Date(perf.date).toLocaleDateString()}</td>
              <td className="p-2 border">{perf.nav}</td>
              <td className="p-2 border">{perf.yield}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6">
        <Link to={`/funds/${id}/add-performance`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Performance</Link>
        <Link to="/" className="ml-4 text-blue-600 hover:underline">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default FundDetails; 