import React, { useEffect, useState } from "react";
import { getFunds, getFundStatistics } from "../services/api";
import { getBestPerformingFund, getWorstPerformingFund, getFundTrends, getFundVolatility } from "../services/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Dashboard = () => {
  const [funds, setFunds] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({ best: null, worst: null, volatility: [], trends: {} });
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const to = new Date();
      const from = new Date();
      from.setFullYear(to.getFullYear() - 5);
      const res = await getFunds();
      setFunds(res.data);
      // Fetch statistics for each fund
      const statsObj = {};
      await Promise.all(
        res.data.map(async (fund) => {
          try {
            const statRes = await getFundStatistics(fund.id, from.toISOString().slice(0,10), to.toISOString().slice(0,10));
            statsObj[fund.id] = statRes.data;
          } catch {
            statsObj[fund.id] = { averageNav: "-", averageYield: "-" };
          }
        })
      );
      setStats(statsObj);
      setLoading(false);
    }
    fetchData();
    const interval = setInterval(fetchData, 24 * 60 * 60 * 1000); // Refresh every 24 hours
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchAnalytics() {
      setAnalyticsLoading(true);
      const to = new Date();
      const from = new Date();
      from.setFullYear(to.getFullYear() - 5);
      const [best, worst, volatility, trends] = await Promise.all([
        getBestPerformingFund(from, to),
        getWorstPerformingFund(from, to),
        getFundVolatility(from, to),
        getFundTrends(from, to)
      ]);
      setAnalytics({
        best: best.data,
        worst: worst.data,
        volatility: volatility.data,
        trends: trends.data
      });
      setAnalyticsLoading(false);
    }
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 24 * 60 * 60 * 1000); // Refresh every 24 hours
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="p-8">
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <Skeleton height={24} width={180} className="mb-2" />
            <Skeleton height={18} width={120} />
          </div>
        ))}
        <div className="card col-span-1 md:col-span-2">
          <Skeleton height={24} width={200} className="mb-2" />
          <Skeleton count={4} height={18} className="mb-1" />
        </div>
        <div className="card col-span-1 md:col-span-2">
          <Skeleton height={24} width={200} className="mb-2" />
          <Skeleton height={300} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card animate-pulse flex flex-col gap-2">
            <Skeleton height={20} width={120} />
            <Skeleton height={16} width={100} />
            <Skeleton height={16} width={80} />
            <Skeleton height={16} width={80} />
            <Skeleton height={16} width={60} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-white p-0">
      <header className="w-full py-12 px-4 bg-gradient-to-r from-blue-700 via-blue-500 to-emerald-400 text-white text-center shadow-lg mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow">Fund Dashboard</h1>
        <p className="text-lg md:text-xl text-blue-100 font-medium drop-shadow">Explore analytics and performance of Kenya's leading money market funds.</p>
      </header>
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card border-l-8 border-blue-500">
            <h2 className="font-semibold mb-2 text-blue-700">Best Performing Fund</h2>
            {analyticsLoading ? <div>Loading...</div> : analytics.best?.fund ? (
              <div>
                <div className="font-bold text-2xl text-emerald-700">{analytics.best.fund.name}</div>
                <div className="text-lg">Avg Yield: <span className="font-mono text-emerald-600">{analytics.best.averageYield?.toFixed(2)}</span></div>
              </div>
            ) : <div>No data</div>}
          </div>
          <div className="card border-l-8 border-rose-500">
            <h2 className="font-semibold mb-2 text-rose-700">Worst Performing Fund</h2>
            {analyticsLoading ? <div>Loading...</div> : analytics.worst?.fund ? (
              <div>
                <div className="font-bold text-2xl text-rose-700">{analytics.worst.fund.name}</div>
                <div className="text-lg">Avg Yield: <span className="font-mono text-rose-600">{analytics.worst.averageYield?.toFixed(2)}</span></div>
              </div>
            ) : <div>No data</div>}
          </div>
        </div>
        <div className="card mb-8">
          <h2 className="font-semibold mb-2 text-blue-700">Fund Volatility</h2>
          {analyticsLoading ? <div>Loading...</div> : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.volatility} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="volatility" stroke="#2563eb" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="card mb-8">
          <h2 className="font-semibold mb-2 text-emerald-700">Fund Trends</h2>
          {analyticsLoading ? <div>Loading...</div> : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={Object.values(analytics.trends)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="averageYield" stroke="#16a34a" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {funds.map((fund) => (
            <div key={fund.id} className="card flex flex-col gap-2 border-l-4 border-blue-200 hover:border-blue-500 transition">
              <div className="font-semibold text-lg text-blue-800">{fund.name}</div>
              <div className="text-gray-600">Manager: {fund.manager}</div>
              <div className="text-sm">Avg NAV: <span className="font-mono text-blue-700">{stats[fund.id]?.averageNav ?? "-"}</span></div>
              <div className="text-sm">Avg Yield: <span className="font-mono text-emerald-700">{stats[fund.id]?.averageYield ?? "-"}</span></div>
              <a href={`/funds/${fund.id}`} className="btn bg-emerald-50 text-blue-700 font-semibold px-4 py-2 rounded hover:bg-blue-100 transition mt-2">View Details</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 