
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (success: boolean) => void;
  onCancel: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === 'admin@2007' && password.trim() === 'Dharsana15@#') {
      onLogin(true);
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-black border border-white p-10 w-full max-w-sm relative shadow-2xl">
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 text-white hover:text-neutral-400 transition-colors font-mono"
        >
          [X]
        </button>
        
        <div className="text-center mb-8">
            <h2 className="text-2xl font-black uppercase mb-1 text-white">System Access</h2>
            <div className="h-0.5 w-10 bg-white mx-auto"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold tracking-wider text-neutral-500">ID</label>
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white p-3 text-white focus:bg-white focus:text-black focus:outline-none transition-all font-mono rounded-none"
              autoFocus
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold tracking-wider text-neutral-500">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white p-3 text-white focus:bg-white focus:text-black focus:outline-none transition-all font-mono rounded-none"
            />
          </div>

          {error && <div className="p-2 border border-white text-white bg-white/10 text-xs font-mono text-center uppercase">{error}</div>}

          <button 
            type="submit"
            className="w-full bg-white text-black font-bold uppercase tracking-[0.2em] py-4 hover:bg-neutral-300 transition-colors mt-2 border border-white"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
