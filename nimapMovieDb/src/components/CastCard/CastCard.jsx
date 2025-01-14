// src/components/CastCard.jsx
import React from 'react';

const CastCard = ({ cast }) => {
  return (
    <div className="flex flex-col items-center bg-gray-800 p-2 rounded-lg shadow-lg">
      <img
        src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
        alt={cast.name}
        className="w-full h-auto rounded-lg object-cover"
      />
      <h3 className="text-lg font-semibold text-white mt-2">{cast.name}</h3>
      <p className="text-sm text-gray-400">{cast.character}</p>
    </div>
  );
};

export default CastCard;