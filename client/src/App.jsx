import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// pages
import Home from "./page/home";
import NearMissForm from "./page/NearMissForm";
import Dashboard from "./page/dashboard";
import Login from "./page/Login"; 
import RecordPage from "./page/record";
import TrackingPage from "./page/tracking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/nearmissform" element={<NearMissForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;