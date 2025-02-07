import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
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

      <header className='fixed start-0 top-0 w-full'>

        <nav className="bg-gray-800 text-white p-4">

          <div className="container mx-auto flex justify-between items-center">

            <div className="text-lg font-bold">The Bazaar - Wiki</div>

            <div className="flex space-x-4">

              <NavLink
                className={({ isActive }) => isActive ? 'rounded text-yellow-500 border border-yellow-500 px-2' : 'border border-gray-800 px-2'}
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) => isActive ? 'rounded text-yellow-500 border border-yellow-500 px-2' : 'border border-gray-800 px-2'}
                to="/items"
              >
                Items
              </NavLink>
              <NavLink
                className={({ isActive }) => isActive ? 'rounded text-yellow-500 border border-yellow-500 px-2' : 'border border-gray-800 px-2'}
                to="/skills"
              >
                Skills
              </NavLink>
              <NavLink
                className={({ isActive }) => isActive ? 'rounded text-yellow-500 border border-yellow-500 px-2' : 'border border-gray-800 px-2'}
                to="/merchants"
              >
                Merchants
              </NavLink>
              <NavLink
                className={({ isActive }) => isActive ? 'rounded text-yellow-500 border border-yellow-500 px-2' : 'border border-gray-800 px-2'}
                to="/monsters"
              >
                Monsters
              </NavLink>
              <NavLink
                className={({ isActive }) => isActive ? 'rounded text-yellow-500 border border-yellow-500 px-2' : 'border border-gray-800 px-2'}
                to="/encounters"
              >
                Encounters
              </NavLink>
              <NavLink
                className={({ isActive }) => isActive ? 'rounded text-yellow-500 border border-yellow-500 px-2' : 'border border-gray-800 px-2'}
                to="/shops"
              >
                Shops
              </NavLink>
              <NavLink
                className={({ isActive }) => isActive ? 'rounded text-yellow-500 border border-yellow-500 px-2' : 'border border-gray-800 px-2'}
                to="/contacts"
              >
                Contacts
              </NavLink>

            </div>

          </div>

        </nav>

      </header>

      <main className='mt-20'>

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