import React, { useState } from 'react';
import { PortfolioData, ConsultationTopic } from '../types';

interface TalkProps {
  data: PortfolioData;
  onBack: () => void;
}

type BookingStep = 'details' | 'payment' | 'success';

const Talk: React.FC<TalkProps> = ({ data, onBack }) => {
  const [selectedTopic, setSelectedTopic] = useState<ConsultationTopic | null>(null);
  const [bookingStep, setBookingStep] = useState<BookingStep>('details');
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    date: '',
    notes: ''
  });

  const openBooking = (topic: ConsultationTopic) => {
    setSelectedTopic(topic);
    setBookingStep('details');
    setUserDetails({ name: '', email: '', date: '', notes: '' });
  };

  const closeBooking = () => {
    setSelectedTopic(null);
    setBookingStep('details');
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStep('payment');
  };

  const handlePaymentConfirm = () => {
    setBookingStep('success');
  };

  return (
    <div className="min-h-screen bg-black animate-fade-in font-sans text-white">
      {/* Header */}
      <div className="bg-black border-b border-white sticky top-0 z-40">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs hover:text-neutral-400 transition-colors border border-white px-4 py-2"
          >
            Back
          </button>
          <div className="text-xl font-black uppercase tracking-tighter text-white">
            Services
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 md:py-20">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
            Services
          </h1>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white">
          {data.consultationTopics.map((topic, index) => (
            <div key={index} className="bg-black border-r border-b border-white p-12 hover:bg-white hover:text-black transition-all group flex flex-col justify-between h-full relative">
              
              <div>
                <h3 className="text-2xl font-bold uppercase mb-6 tracking-wide group-hover:text-black text-white">{topic.title}</h3>
                <p className="text-neutral-400 mb-8 leading-relaxed font-light text-sm group-hover:text-neutral-600 font-mono">{topic.description}</p>
              </div>
              
              <div className="flex items-center justify-start pt-6 border-t border-white/20 group-hover:border-black/20">
                {/* Price Hidden as requested */}
                <button 
                  onClick={() => openBooking(topic)}
                  className="w-full bg-white text-black border border-black group-hover:bg-black group-hover:text-white px-6 py-4 font-bold uppercase tracking-widest text-xs transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
          <div className="bg-black w-full max-w-md p-10 relative animate-fade-in border border-white max-h-[90vh] overflow-y-auto">
            <button 
              onClick={closeBooking}
              className="absolute top-4 right-4 text-white hover:text-neutral-400 transition-colors font-mono"
            >
              [CLOSE]
            </button>

            {bookingStep === 'details' && (
              <form onSubmit={handleDetailsSubmit}>
                <h2 className="text-3xl font-black uppercase text-white mb-8 border-b border-white pb-4">Booking</h2>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-xs uppercase font-bold text-neutral-500 mb-2 tracking-widest">Service</label>
                    <div className="text-xl font-bold text-white uppercase">{selectedTopic.title}</div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-neutral-500 mb-2 tracking-widest">Name</label>
                    <input 
                      required
                      type="text"
                      value={userDetails.name}
                      onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                      className="w-full bg-black border-b border-white p-3 text-white focus:outline-none focus:bg-white focus:text-black transition-colors rounded-none placeholder-neutral-700"
                      placeholder="ENTER FULL NAME"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-neutral-500 mb-2 tracking-widest">Email</label>
                    <input 
                      required
                      type="email"
                      value={userDetails.email}
                      onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                      className="w-full bg-black border-b border-white p-3 text-white focus:outline-none focus:bg-white focus:text-black transition-colors rounded-none placeholder-neutral-700"
                      placeholder="ENTER EMAIL ADDRESS"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-neutral-500 mb-2 tracking-widest">Date</label>
                    <input 
                      required
                      type="date"
                      value={userDetails.date}
                      onChange={(e) => setUserDetails({...userDetails, date: e.target.value})}
                      className="w-full bg-black border-b border-white p-3 text-white focus:outline-none focus:bg-white focus:text-black transition-colors rounded-none text-white/50"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-neutral-300 transition-colors"
                >
                  Continue
                </button>
              </form>
            )}

            {bookingStep === 'payment' && (
              <div>
                <h2 className="text-3xl font-black uppercase text-white mb-8 border-b border-white pb-4">Payment</h2>
                
                <div className="bg-neutral-900/50 p-6 mb-8 border border-white/20">
                    {/* Price is deliberately hidden here as well, showing general payment instructions */}
                    <p className="text-xs font-bold uppercase text-neutral-500 tracking-widest mb-4">Instructions</p>
                    <div className="font-mono text-sm text-white whitespace-pre-wrap leading-relaxed">
                        {data.paymentDetails || "Please contact admin for payment details."}
                    </div>
                </div>

                <div className="flex gap-4">
                    <button 
                        onClick={() => setBookingStep('details')}
                        className="flex-1 bg-transparent border border-white text-white py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                    >
                        Back
                    </button>
                    <button 
                        onClick={handlePaymentConfirm}
                        className="flex-1 bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-neutral-300 transition-colors"
                    >
                        Confirm
                    </button>
                </div>
              </div>
            )}

            {bookingStep === 'success' && (
                <div className="text-center py-12">
                    <div className="text-6xl mb-6 text-white">✓</div>
                    <h2 className="text-3xl font-black uppercase text-white mb-4">Confirmed</h2>
                    <p className="text-neutral-400 mb-12 text-sm font-mono leading-relaxed">
                        Your request for <span className="text-white font-bold">{selectedTopic.title}</span> has been received.<br/>
                        We will contact you at <span className="underline">{userDetails.email}</span> shortly.
                    </p>
                    <button 
                        onClick={closeBooking}
                        className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-neutral-300 transition-colors"
                    >
                        Return
                    </button>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Talk;