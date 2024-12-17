import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddQuestion from "./components/AddQuestion";
import ViewQuestions from "./components/ViewQuestions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-question" element={<AddQuestion />} />
        <Route path="/view-questions" element={<ViewQuestions />} />
      </Routes>
    </Router>
  );
}

export default App;
