import React, { useState } from 'react';
import { StarIcon } from './Icons';

interface RatingProps {
  rating: number;
  totalRatings?: number;
  size?: 'sm' | 'md' | 'lg';
  onRate?: (rating: number) => void;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({ rating, totalRatings, size = 'md', onRate, className = '' }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const starSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const handleRate = (rate: number) => {
    if (onRate) {
      onRate(rate);
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = (hoverRating || rating) >= star;
          const starClasses = `
            ${starSizeClasses[size]}
            ${isFilled ? 'text-yellow-400 fill-current' : 'text-slate-500'}
            ${onRate ? 'cursor-pointer transition-transform duration-150 hover:scale-125' : ''}
          `;

          return onRate ? (
            <button
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => handleRate(star)}
              className="focus:outline-none"
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            >
              <StarIcon className={starClasses} />
            </button>
          ) : (
            <StarIcon key={star} className={starClasses} />
          );
        })}
      </div>
      {typeof totalRatings !== 'undefined' && (
        <span className="text-sm text-slate-400">({totalRatings})</span>
      )}
    </div>
  );
};

export default Rating;
