import React from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard/MovieCard';

const SearchResultsPage = () => {
  const location = useLocation();
  const { searchResults, searchQuery } = location.state || { searchResults: [], searchQuery: '' };

  return (
    <div className="bg-gray-900 min-h-screen pt-16 w-full mx-0 px-0">
      <div className="w-full px-4">
        <h2 className="text-3xl font-bold text-white">Search Results for "{searchQuery}"</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 mt-4">
          {searchResults.length > 0 ? (
            searchResults.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p className="text-white">No results found for "{searchQuery}".</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
