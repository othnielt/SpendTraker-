
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Components/Signup';
import Login from './Components/LoginComponent';
import { BudgetCard } from './Components/BudgetCard';
import RenderingCard from './Components/RenderingCard';
import { AuthProvider } from "./Provider/AuthContext"


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>


          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/budgetCard" element={<BudgetCard />} />
          <Route path="/RenderingCard" element={< RenderingCard />} />



        </Routes>
      </BrowserRouter>;

    </AuthProvider>
  )
}

export default App;
