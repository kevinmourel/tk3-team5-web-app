import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';

function App() {

  const [user, setUser] = useState({})

  return (
    <>
    <Routes>
        <Route exact path="/" element={ <Home user={user}/> } />
        <Route exact path="/login" element={ <Login setUser={setUser}/> } />
     </Routes>
     </>
  );
}

export default App;
