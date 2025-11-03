
import React, { useState } from 'react';
import { Review } from '../types';
import Rating from './Rating';

interface ReviewFormProps {
  shopId: number;
  onSubmit: (shopId: number, reviewData: Omit<Review, 'id' | 'date'>) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ shopId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && comment.trim() && author.trim()) {
      onSubmit(shopId, { rating, comment, author });
      setSubmitted(true);
      // Reset form after a delay for the thank you message
      setTimeout(() => {
        setRating(0);
        setComment('');
        setAuthor('');
        setSubmitted(false);
      }, 4000);
    }
  };

  if (submitted) {
    return (
        <div className="bg-slate-800 p-8 rounded-lg flex flex-col items-center justify-center text-center h-full">
            <div className="mx-auto bg-green-500 rounded-full h-16 w-16 flex items-center justify-center animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h4 className="text-xl font-bold mt-6 text-white">Thank You!</h4>
            <p className="text-slate-300 mt-2">Your review has been submitted.</p>
        </div>
    );
  }

  return (
    <div className="bg-slate-800 p-8 rounded-lg">
      <h4 className="text-xl font-bold text-white mb-1">Leave a Review</h4>
      <p className="text-slate-400 mb-6 text-sm">Share your experience with the community.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Your Rating</label>
            <Rating rating={rating} onRate={setRating} size="lg" />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="e.g., Jane Smith"
            required
          />
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-slate-300 mb-2">Your Comments</label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Tell us about your visit..."
            required
          />
        </div>
        <button
          type="submit"
          disabled={!rating || !comment.trim() || !author.trim()}
          className="w-full py-3 px-4 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
