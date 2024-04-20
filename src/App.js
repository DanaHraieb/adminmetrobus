import './App.css';
import LoginScreenadmin from './Pages/LoginScreenadmin';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Profile from './Pages/Profile';
import Dashboard from './Pages/Dashboard';
import Notification from './Pages/Notification';
import Utilisateur from './Pages/Utilisateur';
import Trajet from './Pages/Trajet';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/Utilisateur" element={<Utilisateur />} />
        <Route path="/Trajet" element={<Trajet />} />
        <Route path="/login" element={<LoginScreenadmin />} />




      </Routes>
    </Router>
  );



}

export default App;
