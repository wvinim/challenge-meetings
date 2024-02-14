import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MeetingProvider } from "./data/contexts/MeetingContext";
import MeetingList from "./ui/pages/MeetingList";
import MeetingPage from "./ui/pages/MeetingPage";

function App() {
  return (
    <Router>
      <MeetingProvider>
        <Routes>
          <Route path="/" element={<MeetingList />} />
          <Route path="/add" element={<MeetingPage />} />
          <Route path="/edit/:id" element={<MeetingPage />} />
        </Routes>
      </MeetingProvider>
    </Router>
  );
}

export default App;
