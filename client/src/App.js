import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
