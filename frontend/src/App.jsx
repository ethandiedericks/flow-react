import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Budget from './pages/Budget';
import Dashboard from './pages/Dashboard';
import Logout from './pages/auth/Logout';
import ForgotPassword from './components/auth/ForgotPassword';

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/forgot_password" element={<ForgotPassword/>} />
          <Route path="/budget" element={<Budget/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
