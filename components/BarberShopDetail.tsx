
import React, { useState } from 'react';
import { BarberShop, AppointmentSlot } from '../types';
import { useAppointments } from '../hooks/useAppointments';
import Rating from './Rating';
import BookingModal from './BookingModal';
import { BackIcon, LocationIcon } from './Icons';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';

interface BarberShopDetailProps {
  shop: BarberShop;
  onBack: () => void;
}

const BarberShopDetail: React.FC<BarberShopDetailProps> = ({ shop, onBack }) => {
  const [selectedSlot, setSelectedSlot] = useState<AppointmentSlot | null>(null);
  const { addReview } = useAppointments();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  
  const handleSlotClick = (slot: AppointmentSlot) => {
    if (slot.status === 'available') {
      setSelectedSlot(slot);
    }
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center space-x-2 text-sky-400 hover:text-sky-300 font-semibold mb-6 transition-colors">
        <BackIcon className="h-5 w-5" />
        <span>Back to Shops</span>
      </button>

      <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden md:flex">
        <div className="md:w-1/3">
           <img src={shop.image} alt={shop.name} className="h-48 w-full object-cover md:h-full" />
        </div>
        <div className="p-8 md:w-2/3">
          <h2 className="text-3xl font-bold text-white">{shop.name}</h2>
          <div className="flex items-center space-x-2 mt-2">
             <LocationIcon className="h-5 w-5 text-slate-400 flex-shrink-0"/>
             <p className="text-slate-400">{shop.address}</p>
          </div>
          <div className="mt-4">
             <Rating rating={shop.rating} totalRatings={shop.totalRatings} size="md" />
          </div>
          <p className="mt-4 text-slate-300">
            Select an available time slot below to book your appointment.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-white mb-4">Our Location</h3>
        <div className="rounded-xl overflow-hidden shadow-lg h-80">
          <iframe
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              shop.address
            )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            title={`Location of ${shop.name}`}
          ></iframe>
        </div>
      </div>
      
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-white mb-4">Available Slots</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {shop.slots.map(slot => (
            <button
              key={slot.id}
              onClick={() => handleSlotClick(slot)}
              disabled={slot.status === 'booked'}
              className={`p-4 rounded-lg text-center font-semibold transition-all duration-200 ${
                slot.status === 'available'
                  ? 'bg-slate-700 text-slate-100 hover:bg-sky-500 hover:scale-105'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed line-through'
              }`}
            >
              {formatTime(slot.time)}
            </button>
          ))}
           {shop.slots.length === 0 && (
             <div className="text-center py-8 bg-slate-800 rounded-lg col-span-full">
                <p className="text-slate-400">No more slots available for today.</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <div className="md:flex md:justify-between md:items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Customer Reviews</h3>
            <p className="text-slate-400 mt-1 md:mt-0">Based on {shop.totalRatings} ratings</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ReviewList reviews={shop.reviews} />
            <ReviewForm shopId={shop.id} onSubmit={addReview} />
        </div>
      </div>

      {selectedSlot && (
        <BookingModal
          slot={selectedSlot}
          shopId={shop.id}
          onClose={() => setSelectedSlot(null)}
        />
      )}
    </div>
  );
};

export default BarberShopDetail;