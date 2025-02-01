import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Items from './pages/Items';
import Contacts from './pages/Contacts';

function App() {

  return (

    <Router>

      <div>

        <nav className="bg-gray-800 p-4">

          <div className="container mx-auto flex justify-between items-center">

            <div className="text-white text-lg font-bold">My Website</div>

            <div className="flex space-x-4">

              <Link to="/" className="text-white">Home</Link>
              <Link to="/items" className="text-white">Items</Link>
              <Link to="/contacts" className="text-white">Contacts</Link>

            </div>
          </div>

        </nav>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="/contacts" element={<Contacts />} />

        </Routes>

      </div>

    </Router>

  );
}

export default App;