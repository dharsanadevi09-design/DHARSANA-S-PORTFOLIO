import React, { useState } from 'react';
import { PortfolioData, ServiceItem } from '../types';

interface ServicesProps {
  data: PortfolioData;
}

type BookingStep = 'details' | 'payment' | 'success';

const Services: React.FC<ServicesProps> = ({ data }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [bookingStep, setBookingStep] = useState<BookingStep>('details');
  const [userDetails, setUserDetails] = useState({ name: '', email: '', date: '' });

  const confirmBooking = async () => {
    try {
      await fetch('http://localhost:3001/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Service',
          title: selectedService?.title,
          price: selectedService?.price,
          ...userDetails
        })
      });
      setBookingStep('success');
    } catch (e) { alert("Error."); }
  };

  return (
    <section id="services" className="py-24 bg-black relative">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-7xl font-black uppercase text-white mb-20 reveal">Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.offeredServices?.map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-3xl flex flex-col justify-between reveal">
              <div className="text-left">
                <h3 className="text-2xl font-bold uppercase text-white mb-4">{s.title}</h3>
                <p className="text-neutral-500 font-mono text-sm leading-relaxed">{s.description}</p>
              </div>
              <div className="flex justify-between items-center mt-10 border-t border-white/10 pt-6">
                <span className="text-xl font-bold text-white">{s.price}</span>
                <button onClick={() => { setSelectedService(s); setBookingStep('details'); }} className="bg-white text-black px-6 py-2 font-bold uppercase text-xs rounded-full">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-neutral-900 w-full max-w-md p-10 rounded-3xl border border-white/10">
            {bookingStep === 'details' && (
              <form onSubmit={e => { e.preventDefault(); setBookingStep('payment'); }}>
                <h3 className="text-xl font-bold text-white mb-6 uppercase">Step 1: Details</h3>
                <input required className="w-full bg-black border border-white/10 p-4 mb-4 text-white rounded-xl" placeholder="NAME" value={userDetails.name} onChange={e => setUserDetails({...userDetails, name: e.target.value})} />
                <input required type="email" className="w-full bg-black border border-white/10 p-4 mb-4 text-white rounded-xl" placeholder="EMAIL" value={userDetails.email} onChange={e => setUserDetails({...userDetails, email: e.target.value})} />
                <input required type="date" className="w-full bg-black border border-white/10 p-4 mb-6 text-white rounded-xl" value={userDetails.date} onChange={e => setUserDetails({...userDetails, date: e.target.value})} />
                <button className="w-full bg-white text-black py-4 font-bold rounded-xl uppercase">Next</button>
              </form>
            )}
            {bookingStep === 'payment' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-6 uppercase">Step 2: Payment</h3>
                <div className="bg-black p-6 rounded-xl border border-white/10 mb-8">
                    <p className="text-xs text-neutral-500 mb-2 uppercase tracking-widest">Payment Info</p>
                    <p className="text-sm font-mono text-white whitespace-pre-wrap">{data.paymentDetails}</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => setBookingStep('details')} className="flex-1 bg-transparent border border-white text-white py-4 rounded-xl font-bold">BACK</button>
                    <button onClick={confirmBooking} className="flex-1 bg-white text-black py-4 rounded-xl font-bold">CONFIRM</button>
                </div>
              </div>
            )}
            {bookingStep === 'success' && (
              <div className="text-center">
                <div className="text-5xl mb-6">✅</div>
                <h3 className="text-xl font-bold text-white mb-6">Request Recorded!</h3>
                <button onClick={() => setSelectedService(null)} className="w-full bg-white text-black py-3 rounded-full font-bold">DONE</button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;