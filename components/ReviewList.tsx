
import React from 'react';
import { Review } from '../types';
import Rating from './Rating';
import { UserIcon } from './Icons';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
    
  return (
    <div className="space-y-6">
        {reviews.length === 0 && (
            <div className="bg-slate-800/50 p-6 rounded-lg text-center">
                <p className="text-slate-400">Be the first to leave a review!</p>
            </div>
        )}
        {reviews.map(review => (
            <div key={review.id} className="bg-slate-800/50 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center space-x-3">
                            <div className="bg-slate-700 rounded-full h-10 w-10 flex items-center justify-center">
                                <UserIcon className="h-6 w-6 text-slate-400"/>
                            </div>
                            <div>
                                <p className="font-semibold text-white">{review.author}</p>
                                <p className="text-xs text-slate-400">{formatDate(review.date)}</p>
                            </div>
                        </div>
                    </div>
                    <Rating rating={review.rating} size="sm" />
                </div>
                <p className="mt-4 text-slate-300 italic">"{review.comment}"</p>
            </div>
        ))}
    </div>
  );
};

export default ReviewList;
