'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to subscribe. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-0">
        <input 
          type="email" 
          className="subscribe-input flex-1" 
          placeholder="your@email.com"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          required
        />
        <button 
          type="submit" 
          className="subscribe-button"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? '...' : 'Join'}
        </button>
      </div>
      {message && (
        <p 
          className="text-xs mt-2" 
          style={{ 
            color: status === 'success' ? 'var(--accent)' : '#c53030' 
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
