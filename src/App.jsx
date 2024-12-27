import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Body from "./componenets/Body";
import Header from "./componenets/Header";
import History from "./componenets/History";

const App = () => {
  const [history, setHistory] = useState([]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Body history={history} setHistory={setHistory} />}
        />
        <Route path="/history" element={<History history={history} />} />
      </Routes>
    </Router>
  );
};

export default App;
