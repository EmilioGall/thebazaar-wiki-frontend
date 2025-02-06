import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Items from './pages/Items';
import Skills from './pages/Skills';
import Merchants from './pages/Merchants';
import Monsters from './pages/Monsters';
import Encounters from './pages/Encounters';
import Shops from './pages/Shops';
import Contacts from './pages/Contacts';

function App() {

  return (

    <Router>

      <header>

        <nav className="bg-gray-800 text-white p-4">

          <div className="container mx-auto flex justify-between items-center">

            <div className="text-lg font-bold">The Bazaar - Wiki</div>

            <div className="flex space-x-4">

              <Link to="/">Home</Link>
              <Link to="/items">Items</Link>
              <Link to="/skills">Skills</Link>
              <Link to="/merchants">Merchants</Link>
              <Link to="/monsters">Monsters</Link>
              <Link to="/encounters">Encounters</Link>
              <Link to="/shops">Shops</Link>
              <Link to="/contacts">Contacts</Link>

            </div>

          </div>

        </nav>

      </header>

      <main>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/merchants" element={<Merchants />} />
          <Route path="/monsters" element={<Monsters />} />
          <Route path="/encounters" element={<Encounters />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/contacts" element={<Contacts />} />


        </Routes>

      </main>

      <footer className="text-white bg-gray-800 p-4">

        <h5 className='text-center'>Footer</h5>

      </footer>

    </Router>

  );
}

export default App;