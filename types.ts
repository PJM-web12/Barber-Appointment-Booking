
export type View = 'customer' | 'barber';

export interface Customer {
  name: string;
  phone: string;
  notificationMinutes: number;
}

export interface AppointmentSlot {
  id: number;
  time: Date;
  status: 'available' | 'booked';
  customer?: Customer;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface BarberShop {
  id: number;
  name: string;
  address: string;
  rating: number;
  totalRatings: number;
  availableSlots: number;
  image: string;
  slots: AppointmentSlot[];
  reviews: Review[];
}
