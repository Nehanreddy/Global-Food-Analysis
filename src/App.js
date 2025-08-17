import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SinglePredict from "./pages/SinglePredict";
import BatchPredict from "./pages/BatchPredict";

function Navbar() {
  return (
    <div className="w-full bg-[#1D1042] text-white px-6 py-3 flex items-center justify-between">
      <div className="text-[18px] font-semibold">Global Food Analysis</div>
      <div className="flex gap-6 text-sm">
        <a href="/" className="hover:underline">Home</a>
        <a href="/single" className="hover:underline">Single Prediction</a>
        <a href="/batch" className="hover:underline">Batch Prediction</a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/single" element={<SinglePredict />} />
          <Route path="/batch" element={<BatchPredict />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
