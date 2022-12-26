import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
