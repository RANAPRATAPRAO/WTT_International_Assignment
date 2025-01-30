import React, { useState } from 'react';
import Login from './components/LoginPage';
import MembraneSelection from './components/MembraneSelectionPage';
import Dashboard from './components/DashboardPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [membranes, setMembranes] = useState(0);

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : membranes === 0 ? (
        <MembraneSelection onSelect={(num) => setMembranes(num)} />
      ) : (
        <Dashboard membranes={membranes} />
      )}
    </div>
  );
}

export default App;
