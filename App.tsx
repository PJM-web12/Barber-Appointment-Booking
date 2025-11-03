
import React, { useState } from 'react';
import { View } from './types';
import Header from './components/Header';
import CustomerBooking from './components/CustomerBooking';
import BarberAdmin from './components/BarberAdmin';

const App: React.FC = () => {
  const [view, setView] = useState<View>('customer');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <Header currentView={view} onViewChange={setView} />
      <main className="container mx-auto p-4 md:p-8">
        {view === 'customer' ? <CustomerBooking /> : <BarberAdmin />}
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Powered by Modern Tech Barber Solutions</p>
      </footer>
    </div>
  );
};

export default App;
