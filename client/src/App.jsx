import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PackageDetails from './pages/PackageDetails';
import AdminPanel from './pages/AdminPanel';
import Navbar from './pages/Navbar';
import AdminLogin from './pages/admin_login';
const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/packages" element={<AdminLogin />} />
      <Route path="/packages/:id" element={<PackageDetails />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  </Router>
);

export default App;
