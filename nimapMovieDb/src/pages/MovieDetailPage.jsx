// src/pages/MovieDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CastCard from '../components/CastCard/CastCard';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`);
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchCast = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`);
        setCast(response.data.cast);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovie();
    fetchCast();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const genres = movie.genres.map(genre => genre.name).join(", ");

  return (
    <div className="bg-gray-900 min-h-screen pt-16 w-full mx-0 px-0 flex flex-col items-center mt-4">
      <div className="w-full max-w-6xl bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg mx-1 flex flex-col md:flex-row">
        {/* Left Side - Movie Details */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="w-1/3 md:w-1/4 rounded-lg"
            />
            <div>
              <h2 className="text-3xl font-bold text-white">{movie.title}</h2>
              <p className="text-xl text-blue-500 mt-2">Rating: {movie.vote_average}</p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-400 bg-gray-800 border border-gray-600 px-2 py-1 rounded">98 min</p>
                </div>
                <div>
                  <p className="text-lg text-blue-500">Genres: {genres}</p>
                </div>
              </div>
              <p className="text-lg text-gray-400 mt-4">Release Date: {movie.release_date}</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mt-6">Overview</h2>
          <p className="text-md text-gray-400">{movie.overview}</p>
        </div>

        {/* Right Side - Backdrop Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Cast List */}
      <div className="w-full max-w-6xl bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg mt-4">
        <h2 className="text-2xl font-bold text-white">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {cast.map((member) => (
            <CastCard key={member.cast_id} cast={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
