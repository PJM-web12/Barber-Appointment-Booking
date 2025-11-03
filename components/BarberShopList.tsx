import React from 'react';
import { useAppointments } from '../hooks/useAppointments';
import { BarberShop } from '../types';
import BarberShopCard from './BarberShopCard';

interface BarberShopListProps {
    onSelectShop: (shop: BarberShop) => void;
}

const BarberShopList: React.FC<BarberShopListProps> = ({ onSelectShop }) => {
  const { shops } = useAppointments();
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  };
  
  const today = new Date();

  return (
    <div>
      <div className="bg-slate-800 rounded-xl p-6 mb-8 shadow-inner">
        <h2 className="text-3xl font-bold text-white">Find a Barber Near You</h2>
        <p className="text-slate-400 mt-1">Appointments available for {formatDate(today)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shops.map(shop => (
            <BarberShopCard key={shop.id} shop={shop} onClick={() => onSelectShop(shop)}/>
        ))}
      </div>
    </div>
  );
};

export default BarberShopList;
