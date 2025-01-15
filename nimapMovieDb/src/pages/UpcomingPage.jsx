import React from 'react';
import MovieList from '../components/MovieList/MovieList';

const UpcomingPage = () => {
  const endpoint = 'https://api.themoviedb.org/3/movie/upcoming?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US';
  
  return (
    <div className="bg-gray-900 min-h-screen pt-16 w-full mx-0 px-0">
      <div className="w-full px-4 overflow-x-hidden">
        <MovieList endpoint={endpoint} />
      </div>
    </div>
  );
};

export default UpcomingPage;