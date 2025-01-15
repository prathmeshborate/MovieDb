import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";

const MovieList = ({ endpoint }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const maxPages = 50;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${endpoint}&page=${currentPage}`);
        setMovies(response.data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchMovies();
  }, [endpoint, currentPage]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handlePageChange = (page) => {
    if (page > 0 && page <= maxPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(startPage + 4, maxPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-3 py-1 ${
            currentPage === i ? "bg-blue-700" : "bg-blue-500"
          } text-white rounded mx-1`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center mt-8 mb-16">
        <button
          className="px-3 py-1 bg-gray-500 text-white rounded mx-1"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          className="px-3 py-1 bg-gray-500 text-white rounded mx-1"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === maxPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;
