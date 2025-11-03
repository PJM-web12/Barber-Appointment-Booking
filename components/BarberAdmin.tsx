import React, { useState, useMemo } from 'react';
import { useAppointments } from '../hooks/useAppointments';
import { UserIcon, PhoneIcon } from './Icons';

const BarberAdmin: React.FC = () => {
  const { shops } = useAppointments();
  const [selectedShopId, setSelectedShopId] = useState<number>(shops[0]?.id || 0);

  const selectedShop = useMemo(() => {
    return shops.find(shop => shop.id === selectedShopId);
  }, [shops, selectedShopId]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const today = new Date();

  return (
    <div>
      <div className="bg-slate-800 rounded-xl p-6 mb-8 shadow-inner">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
                <h2 className="text-3xl font-bold text-white">Today's Schedule</h2>
                <p className="text-slate-400 mt-1">{formatDate(today)}</p>
            </div>
            {shops.length > 0 && (
                <div className="mt-4 md:mt-0">
                    <label htmlFor="shop-select" className="sr-only">Select a Shop</label>
                    <select
                        id="shop-select"
                        value={selectedShopId}
                        onChange={(e) => setSelectedShopId(Number(e.target.value))}
                        className="w-full md:w-auto bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                        {shops.map(shop => (
                            <option key={shop.id} value={shop.id}>{shop.name}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
      </div>

      {selectedShop ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedShop.slots.map(slot => (
            <div
              key={slot.id}
              className={`p-5 rounded-xl shadow-lg transition-all duration-300 ${
                slot.status === 'booked'
                  ? 'bg-red-900/50 border-l-4 border-red-500'
                  : 'bg-slate-800/80 border-l-4 border-green-500'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-slate-100">{formatTime(slot.time)}</span>
                <span
                  className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${
                    slot.status === 'booked'
                      ? 'bg-red-500 text-white'
                      : 'bg-green-500 text-slate-900'
                  }`}
                >
                  {slot.status}
                </span>
              </div>
              {slot.status === 'booked' && slot.customer && (
                <div className="mt-4 pt-4 border-t border-slate-700 space-y-3">
                  <div className="flex items-center space-x-3">
                    <UserIcon className="h-5 w-5 text-slate-400 flex-shrink-0"/>
                    <p className="font-semibold text-slate-200">{slot.customer.name}</p>
                  </div>
                   <div className="flex items-center space-x-3">
                    <PhoneIcon className="h-5 w-5 text-slate-400 flex-shrink-0"/>
                    <p className="text-sm text-slate-300">{slot.customer.phone}</p>
                  </div>
                  <p className="text-sm text-slate-400 italic">
                      Reminder set for {slot.customer.notificationMinutes} mins prior.
                  </p>
                </div>
              )}
            </div>
          ))}
          {selectedShop.slots.length === 0 && (
               <div className="text-center py-16 bg-slate-800 rounded-lg md:col-span-2 lg:col-span-3">
                  <h3 className="text-xl font-semibold text-slate-300">The day has ended.</h3>
                  <p className="text-slate-400 mt-2">All slots for today are in the past.</p>
              </div>
          )}
        </div>
      ) : (
         <div className="text-center py-16 bg-slate-800 rounded-lg">
            <h3 className="text-xl font-semibold text-slate-300">No shop selected.</h3>
            <p className="text-slate-400 mt-2">Please select a shop to view its schedule.</p>
        </div>
      )}
    </div>
  );
};

export default BarberAdmin;
