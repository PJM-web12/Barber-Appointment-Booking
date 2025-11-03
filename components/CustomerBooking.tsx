import React, { useState } from 'react';
import { BarberShop } from '../types';
import BarberShopList from './BarberShopList';
import BarberShopDetail from './BarberShopDetail';

const CustomerBooking: React.FC = () => {
  const [selectedShop, setSelectedShop] = useState<BarberShop | null>(null);

  if (selectedShop) {
    return <BarberShopDetail shop={selectedShop} onBack={() => setSelectedShop(null)} />;
  }

  return <BarberShopList onSelectShop={setSelectedShop} />;
};

export default CustomerBooking;
