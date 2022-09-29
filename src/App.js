import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useState } from "react";

function App() {
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [dishScore, setDishScore] = useState([]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <Dashboard
                selectedDishes={selectedDishes}
                setSelectedDishes={setSelectedDishes}
                dishScore={dishScore}
                setDishScore={setDishScore}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
