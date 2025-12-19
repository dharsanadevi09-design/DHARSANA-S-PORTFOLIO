import React, { useState } from 'react';
import { PortfolioData, ConsultationTopic } from '../types';

interface ConsultationProps {
  data: PortfolioData;
  onBack?: () => void;
}

type BookingStep = 'details' | 'payment' | 'success';

const Consultation: React.FC<ConsultationProps> = ({ data, onBack }) => {
  const [selectedTopic, setSelectedTopic] = useState<ConsultationTopic | null>(null);
  const [bookingStep, setBookingStep] = useState<BookingStep>('details');
  const [userDetails, setUserDetails] = useState({ name: '', email: '', date: '', notes: '' });

  const handleConfirm = async () => {
    try {
      await fetch('http://localhost:3001/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Consultation',
          title: selectedTopic?.title,
          price: selectedTopic?.price,
          ...userDetails
        })
      });
      setBookingStep('success');
    } catch (err) { alert("Failed to save booking."); }
  };

  return (
    <section className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="container mx-auto">
        {onBack && <button onClick={onBack} className="border border-white/20 px-6 py-2 uppercase font-bold text-xs rounded-full mb-10">← Back</button>}
        <h2 className="text-5xl font-black uppercase mb-16 text-center">Let's Talk</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.consultationTopics.map((topic, i) => (
            <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h3 className="text-2xl font-bold mb-4">{topic.title}</h3>
              <p className="text-neutral-400 text-sm mb-6">{topic.description}</p>
              <div className="flex justify-between items-center pt-6 border-t border-white/10">
                <span className="text-2xl font-black">{topic.price}</span>
                <button onClick={() => { setSelectedTopic(topic); setBookingStep('details'); }} className="bg-white text-black px-6 py-2 font-bold uppercase text-xs rounded-full">Book</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="bg-neutral-900 w-full max-w-md p-10 rounded-3xl border border-white/10">
            {bookingStep === 'details' && (
              <form onSubmit={(e) => { e.preventDefault(); setBookingStep('payment'); }}>
                 <h2 className="text-xl font-bold mb-6">Details</h2>
                 <input required className="w-full bg-black border border-white/10 p-4 mb-4 text-white rounded-xl" placeholder="NAME" value={userDetails.name} onChange={e => setUserDetails({...userDetails, name: e.target.value})} />
                 <input required className="w-full bg-black border border-white/10 p-4 mb-4 text-white rounded-xl" placeholder="EMAIL" value={userDetails.email} onChange={e => setUserDetails({...userDetails, email: e.target.value})} />
                 <button className="w-full bg-white text-black py-4 font-bold rounded-xl">Next</button>
              </form>
            )}
            {bookingStep === 'payment' && (
              <div className="text-center">
                 <h2 className="text-xl font-bold mb-4">Payment</h2>
                 <p className="font-mono text-xs opacity-60 mb-8">{data.paymentDetails}</p>
                 <button onClick={handleConfirm} className="w-full bg-white text-black py-4 font-bold rounded-xl">Confirm & Save</button>
              </div>
            )}
            {bookingStep === 'success' && (
              <div className="text-center">
                <div className="text-5xl mb-6">✅</div>
                <h2 className="text-xl font-bold mb-6">Booking Recorded</h2>
                <button onClick={() => setSelectedTopic(null)} className="bg-white text-black px-10 py-2 rounded-full font-bold">Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Consultation;