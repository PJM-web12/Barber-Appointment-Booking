import React, { useState } from 'react';
import { AppointmentSlot } from '../types';
import { useAppointments } from '../hooks/useAppointments';
import { PhoneIcon, ScissorsIcon } from './Icons';

interface BookingModalProps {
  slot: AppointmentSlot;
  shopId: number;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ slot, shopId, onClose }) => {
  const { bookAppointment, notificationPermission } = useAppointments();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notificationMinutes, setNotificationMinutes] = useState(30);
  const [isBooked, setIsBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      bookAppointment(shopId, slot.id, { name, phone, notificationMinutes });
      setIsBooked(true);
      setTimeout(onClose, 3000);
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out scale-95 animate-scale-in">
        <div className="p-8">
          {isBooked ? (
            <div className="text-center">
              <div className="mx-auto bg-green-500 rounded-full h-16 w-16 flex items-center justify-center animate-pulse">
                <ScissorsIcon className="h-8 w-8 text-white"/>
              </div>
              <h2 className="text-2xl font-bold mt-6 text-white">Appointment Confirmed!</h2>
              <p className="text-slate-300 mt-2">
                We've booked your slot for <span className="font-semibold text-sky-400">{formatTime(slot.time)}</span>.
              </p>
              {notificationPermission === 'granted' && 
                <p className="text-slate-400 text-sm mt-1">A browser notification will be sent {notificationMinutes} minutes before.</p>
              }
               <p className="text-slate-400 text-sm mt-1">A reminder will also be sent to {phone}.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center text-white">Confirm Your Appointment</h2>
              <p className="text-center text-slate-400 mt-1">
                You're booking the slot for <span className="font-bold text-sky-400">{formatTime(slot.time)}</span>
              </p>
              
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="e.g., John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                   <div className="relative">
                     <PhoneIcon className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                     <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="e.g., (555) 123-4567"
                        required
                      />
                   </div>
                </div>
                {notificationPermission === 'granted' && (
                  <div>
                    <label htmlFor="notification" className="block text-sm font-medium text-slate-300 mb-2">Remind Me Before</label>
                    <select
                      id="notification"
                      value={notificationMinutes}
                      onChange={(e) => setNotificationMinutes(Number(e.target.value))}
                      className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>1 hour</option>
                    </select>
                  </div>
                )}
                <div className="flex space-x-4 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full py-3 px-4 rounded-lg bg-slate-600 hover:bg-slate-700 text-white font-semibold transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed"
                        disabled={!name.trim() || !phone.trim()}
                    >
                        Book Now
                    </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
