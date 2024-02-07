import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Budget from './pages/Budget';
import Dashboard from './pages/Dashboard';
import Logout from './pages/auth/Logout';
import PasswordResetRequestPage from './pages/auth/PasswordResetRequestPage';
import PasswordResetConfirmPage from './pages/auth/PasswordResetConfirmPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/password-reset" element={<PasswordResetRequestPage />} />
          <Route path="/password-confirm/:token" element={<PasswordResetConfirmPage />} /> 
          <Route path="/budget" element={<Budget />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
