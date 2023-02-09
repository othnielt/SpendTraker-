
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {  WelcomePage,LoginUI, SIgnUpUI } from './Components/Welcome.js';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { BudgetCard } from './Components/BudgetCard';
import RenderingCard from './Components/RenderingCard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/budgetCard" element={<BudgetCard/>} />
          <Route path="/RenderingCard" element={< RenderingCard/>} />
             
      </Routes>
    </BrowserRouter>);
}

export default App;
