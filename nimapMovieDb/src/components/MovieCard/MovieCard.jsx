// src/components/MovieCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="p-2 md:p-3 lg:p-4">
      <Link to={`/movie/${movie.id}`} className="block overflow-hidden">
        <div
          style={{
            position: 'relative',
            width: '100%', 
            maxWidth: '250px', 
            paddingBottom: '150%',
            overflow: 'hidden',
            borderRadius: '8px',
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        <h3 className="text-md font-bold text-white mt-2">{movie.title}</h3>
        <p className="text-sm text-gray-400">Rating: {movie.vote_average}</p>
      </Link>
    </div>
  );
};

export default MovieCard;