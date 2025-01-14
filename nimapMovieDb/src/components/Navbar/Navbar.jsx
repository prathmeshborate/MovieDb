// src/components/Navbar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/logo.svg';
import axios from 'axios';

const MenuLinks = [
  {
    id: 1,
    name: "Popular",
    link: "/",
  },
  {
    id: 2,
    name: "Top Rated",
    link: "/top-rated",
  },
  {
    id: 3,
    name: "Upcoming",
    link: "/upcoming",
  },
];

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${searchQuery}&page=1`);
      const searchResults = response.data.results;

      // Navigate to search results page with search results as state
      navigate('/search', { state: { searchResults, searchQuery } });
    } catch (err) {
      console.error('Error fetching search results:', err.message);
    }
  };

  return (
    <nav className="bg-gray-800 text-white w-full fixed top-0 left-0 z-50">
      <div className="w-full flex justify-between items-center px-4 py-2">
        {/* Logo and Links section */}
        <div className="flex items-center gap-4">
          <a href="/" className="text-primary flex gap-2 font-semibold tracking-widest text-2xl uppercase sm:text-3xl">
            <img src={Logo} alt="Logo" className='w-10'/>
            MovieDb
          </a>
          {/* Menu Items */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-4">
              {MenuLinks.map((data) => (
                <li key={data.id}>
                  <a href={data.link} className="inline-block px-4 font-semibold text-white hover:text-gray-300 duration-200">
                    {data.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Navbar Right section */}
        <div className="flex items-center gap-4">
          {/* Search Bar section */}
          <div className="relative group hidden sm:block">
            <input
              type="text"
              placeholder="Search"
              className="p-2 bg-gray-200 text-black rounded focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          {/* Search button section */}
          <button
            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-700 duration-200"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;