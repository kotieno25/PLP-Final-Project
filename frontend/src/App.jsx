import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const FundDetails = lazy(() => import("./pages/FundDetails"));
const AddFund = lazy(() => import("./pages/AddFund"));
const AddPerformance = lazy(() => import("./pages/AddPerformance"));
const About = lazy(() => import("./pages/About"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const Resources = lazy(() => import("./pages/Resources"));
const FundManagers = lazy(() => import("./pages/FundManagers"));

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/funds/new" element={<AddFund />} />
          <Route path="/funds/:id" element={<FundDetails />} />
          <Route path="/funds/:fundId/add-performance" element={<AddPerformance />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/fund-managers" element={<FundManagers />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
