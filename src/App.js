import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import Create from "./components/Create";
import Navigation from "./components/Navigation";
import Task from "./components/Task";
import Modify from "./components/Modify";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="content" >
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/create" Component={Create} />
            <Route path="/task/:id" Component={Task} />
            <Route path="/task/modify/:id" Component={Modify} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
