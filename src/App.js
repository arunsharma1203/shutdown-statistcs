import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import KilnForm from "./components/AddData";
import Navbar from "./components/Navbar";
import MasterRoute from "./components/Statistics";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import MasterEdit from "./components/AddSection";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="App">
          <div>
            <h2>Shutdown Statistics</h2>
          </div>
          <div style={{ textAlign: "center", width: "90%", margin: "10%" }}>
            <div
              style={{ textAlign: "center", width: "100%" }}
             
            >
              <Routes>
                <Route exact path="/" element={<MasterRoute />} />
                <Route exact path="/master-view" element={<MasterEdit />} />
                <Route exact path="/master-edit" element={<KilnForm />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
