import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./screens/Home";
import Gallery from "./screens/Gallery";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/gallery" element={<Gallery />} exact />
      </Routes>
    </Router>
  );
}

export default App;
