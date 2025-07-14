import axios from "axios";

const API_BASE = "http://localhost:4000/api";

export const getFunds = (params) => axios.get(`${API_BASE}/funds`, { params });
export const getFund = (id) => axios.get(`${API_BASE}/funds/${id}`);
export const createFund = (data) => axios.post(`${API_BASE}/funds`, data);
export const updateFund = (id, data) => axios.put(`${API_BASE}/funds/${id}`, data);
export const deleteFund = (id) => axios.delete(`${API_BASE}/funds/${id}`);
export const searchFunds = (params) => axios.get(`${API_BASE}/funds/search`, { params });
export const getFundStatistics = (id) => axios.get(`${API_BASE}/funds/${id}/statistics`);

export const getFundPerformances = (params) => axios.get(`${API_BASE}/fund-performances`, { params });
export const getFundPerformance = (id) => axios.get(`${API_BASE}/fund-performances/${id}`);
export const createFundPerformance = (data) => axios.post(`${API_BASE}/fund-performances`, data);
export const updateFundPerformance = (id, data) => axios.put(`${API_BASE}/fund-performances/${id}`, data);
export const deleteFundPerformance = (id) => axios.delete(`${API_BASE}/fund-performances/${id}`);
export const searchFundPerformances = (params) => axios.get(`${API_BASE}/fund-performances/search`, { params });
export const getFundPerformanceStatistics = (fundId, params) => axios.get(`${API_BASE}/fund-performances/fund/${fundId}/statistics`, { params }); 

export const getBestPerformingFund = () => axios.get(`${API_BASE}/analytics/best-performing`);
export const getWorstPerformingFund = () => axios.get(`${API_BASE}/analytics/worst-performing`);
export const getFundTrends = () => axios.get(`${API_BASE}/analytics/trends`);
export const getFundVolatility = () => axios.get(`${API_BASE}/analytics/volatility`); 