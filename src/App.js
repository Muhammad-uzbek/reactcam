import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { useParams,Routes, Route } from 'react-router-dom';
import Camera from './Camera';
function App({ match }) {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
 
  // get slug after url and fetch by it from api
  return (
    <div className="App">
      <header className="App-header">
      <div>
      <Routes>
          <Route path="/camera/:slug" element={<Camera />} />
      </Routes>
    </div>
      </header>
    </div>
  );
}

export default App;
