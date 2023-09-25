import React from "react";
import Landing from "./pages/Landing";
import StudentDashboard from "./pages/StudentDasboard";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/studentDashboard" element={<StudentDashboard />} />
        <Route path="/professorDashboard" element={<ProfessorDashboard />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
