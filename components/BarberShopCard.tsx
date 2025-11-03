
import React from 'react';
import { BarberShop } from '../types';
import Rating from './Rating';
import { LocationIcon, ClockIcon } from './Icons';

interface BarberShopCardProps {
  shop: BarberShop;
  onClick: () => void;
}

const BarberShopCard: React.FC<BarberShopCardProps> = ({ shop, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-sky-500/20 hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={shop.image} 
          alt={shop.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors">{shop.name}</h3>
        <div className="flex items-center space-x-2 mt-2">
          <LocationIcon className="h-4 w-4 text-slate-400 flex-shrink-0"/>
          <p className="text-sm text-slate-400 truncate">{shop.address}</p>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <Rating rating={shop.rating} totalRatings={shop.totalRatings} size="sm" />
          <div className="flex items-center space-x-2 text-sm">
            <ClockIcon className="h-4 w-4 text-green-400"/>
            <span className="font-semibold text-green-400">{shop.availableSlots} slots available</span>
          </div>
        </div>

        <button 
          className="mt-6 w-full py-2 px-4 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-colors"
        >
          Book Your Slot
        </button>
      </div>
    </div>
  );
};

export default BarberShopCard;