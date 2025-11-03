
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { BarberShop, AppointmentSlot, Customer, Review } from '../types';

// Initial mock data
const initialShops: BarberShop[] = [
  {
    id: 1,
    name: "The Dapper Den",
    address: "123 Main Street, Anytown, USA",
    rating: 4.8,
    totalRatings: 152,
    availableSlots: 5,
    image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slots: generateTimeSlots(8, 1),
    reviews: [
        { id: 1, author: "John D.", rating: 5, comment: "Best haircut I've ever had!", date: new Date("2023-10-26T10:00:00Z") },
        { id: 2, author: "Jane S.", rating: 4, comment: "Great service and friendly staff.", date: new Date("2023-10-25T14:30:00Z") },
    ],
  },
  {
    id: 2,
    name: "Clipper Kings",
    address: "456 Oak Avenue, Anytown, USA",
    rating: 4.5,
    totalRatings: 98,
    availableSlots: 8,
    image: "https://images.unsplash.com/photo-1622288432454-2415493c049d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slots: generateTimeSlots(12, 2),
    reviews: [
        { id: 1, author: "Mike R.", rating: 5, comment: "Modern shop, great vibes.", date: new Date("2023-10-26T11:00:00Z") },
    ],
  },
   {
    id: 3,
    name: "Sharp Styles",
    address: "789 Pine Lane, Anytown, USA",
    rating: 4.9,
    totalRatings: 210,
    availableSlots: 3,
    image: "https://images.unsplash.com/photo-1621605815971-fbc333ab683d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slots: generateTimeSlots(6, 3),
    reviews: [
        { id: 1, author: "Emily W.", rating: 5, comment: "Perfection every time.", date: new Date("2023-10-24T09:00:00Z") },
        { id: 2, author: "Chris P.", rating: 5, comment: "Won't go anywhere else.", date: new Date("2023-10-22T16:00:00Z") },
    ],
  }
].map(shop => ({
  ...shop,
  availableSlots: shop.slots.filter(s => s.status === 'available').length
}));

function generateTimeSlots(count: number, shopId: number): AppointmentSlot[] {
    const slots: AppointmentSlot[] = [];
    const today = new Date();
    today.setHours(9, 0, 0, 0); // Start at 9:00 AM

    for (let i = 0; i < count; i++) {
        const slotTime = new Date(today.getTime() + i * 45 * 60 * 1000); // 45-minute intervals
        if (slotTime.getHours() < 17) { // Don't create slots past 5 PM
             slots.push({
                id: i + 1,
                time: slotTime,
                status: 'available'
            });
        }
    }
    // Let's pre-book a few for demonstration, ensuring some variety
    if (shopId === 1 && slots.length > 4) {
        slots[1].status = 'booked';
        slots[1].customer = { name: 'Alex Johnson', phone: '555-0101', notificationMinutes: 30 };
        slots[4].status = 'booked';
        slots[4].customer = { name: 'Samantha Bee', phone: '555-0102', notificationMinutes: 15 };
    }
     if (shopId === 2 && slots.length > 6) {
        slots[2].status = 'booked';
        slots[2].customer = { name: 'Tom Wilson', phone: '555-0103', notificationMinutes: 60 };
        slots[5].status = 'booked';
        slots[5].customer = { name: 'Maria Garcia', phone: '555-0104', notificationMinutes: 30 };
    }
    return slots.filter(slot => slot.time > new Date()); // Only show future slots
}


interface AppointmentContextType {
  shops: BarberShop[];
  bookAppointment: (shopId: number, slotId: number, customer: Customer) => void;
  addReview: (shopId: number, review: Omit<Review, 'id' | 'date'>) => void;
  notificationPermission: NotificationPermission;
}

export const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

interface AppointmentProviderProps {
  children: ReactNode;
}

export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
  const [shops, setShops] = useState<BarberShop[]>(initialShops);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(setNotificationPermission);
    }
  }, []);

  const bookAppointment = (shopId: number, slotId: number, customer: Customer) => {
    setShops(prevShops => {
      return prevShops.map(shop => {
        if (shop.id === shopId) {
          const updatedSlots = shop.slots.map(slot => {
            if (slot.id === slotId) {
              if (notificationPermission === 'granted') {
                const notificationTime = new Date(slot.time.getTime() - customer.notificationMinutes * 60000);
                if (notificationTime > new Date()) {
                  setTimeout(() => {
                    new Notification('Barber Appointment Reminder', {
                      body: `Your appointment at ${shop.name} is in ${customer.notificationMinutes} minutes.`,
                    });
                  }, notificationTime.getTime() - new Date().getTime());
                }
              }
              return { ...slot, status: 'booked', customer };
            }
            return slot;
          });
          const availableSlots = updatedSlots.filter(s => s.status === 'available').length;
          return { ...shop, slots: updatedSlots, availableSlots };
        }
        return shop;
      });
    });
  };
  
  const addReview = (shopId: number, reviewData: Omit<Review, 'id'|'date'>) => {
    setShops(prevShops => 
      prevShops.map(shop => {
        if (shop.id === shopId) {
          const newReview: Review = {
            ...reviewData,
            id: shop.reviews.length + 1,
            date: new Date(),
          };
          const updatedReviews = [newReview, ...shop.reviews];
          const totalRatingSum = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
          const newAverageRating = parseFloat((totalRatingSum / updatedReviews.length).toFixed(1));

          return {
            ...shop,
            reviews: updatedReviews,
            rating: newAverageRating,
            totalRatings: updatedReviews.length,
          };
        }
        return shop;
      })
    );
  };


  const value = { shops, bookAppointment, addReview, notificationPermission };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};
