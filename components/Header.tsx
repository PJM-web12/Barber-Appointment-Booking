
import React from 'react';
import { View } from '../types';
import { ScissorsIcon, UserIcon } from './Icons';

interface HeaderProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const activeClass = 'bg-sky-500 text-white';
  const inactiveClass = 'bg-slate-700 hover:bg-slate-600 text-slate-300';

  return (
    <header className="bg-slate-800 shadow-lg">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <ScissorsIcon className="h-8 w-8 text-sky-400" />
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">
            Barber Bookings
          </h1>
        </div>
        <div className="flex items-center space-x-2 bg-slate-800 p-1 rounded-full">
          <button
            onClick={() => onViewChange('customer')}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 flex items-center space-x-2 ${
              currentView === 'customer' ? activeClass : inactiveClass
            }`}
          >
            <UserIcon className="h-5 w-5" />
            <span>Customer</span>
          </button>
          <button
            onClick={() => onViewChange('barber')}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 flex items-center space-x-2 ${
              currentView === 'barber' ? activeClass : inactiveClass
            }`}
          >
            <ScissorsIcon className="h-5 w-5" />
            <span>Barber</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
