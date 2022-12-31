import './App.css'
import Navbar from './components/Navbar';
import Draft from './pages/Draft';
import {HashRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';
import About from './pages/About';

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Draft />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}/>
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
