"use client";

import { useState } from 'react';

export default function ContactForm({ whatsappNumber }: { whatsappNumber?: string }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Terjadi kesalahan');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Terjadi kesalahan saat mengirim pesan.');
    }
  };

  const handleWhatsAppClick = () => {
    if (!whatsappNumber) {
      alert('Nomor WhatsApp belum dikonfigurasi.');
      return;
    }
    
    // Hapus karakter non-digit (seperti + atau spasi)
    let phone = whatsappNumber.replace(/\D/g, '');
    
    // Jika dimulai dengan '0', ganti dengan '62' (kode negara Indonesia)
    if (phone.startsWith('0')) {
      phone = '62' + phone.substring(1);
    }

    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent('Halo, saya ingin bertanya mengenai layanan Anda.')}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {status === 'success' && (
          <div style={{ padding: '1rem', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '6px' }}>
            Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.
          </div>
        )}
        {status === 'error' && (
          <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px' }}>
            {errorMessage}
          </div>
        )}

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Nama Lengkap</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Masukkan nama" 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }} 
            disabled={status === 'loading'}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
          <input 
            type="email" 
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Masukkan email" 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }} 
            disabled={status === 'loading'}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Pesan</label>
          <textarea 
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Pesan Anda" 
            rows={4} 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', resize: 'vertical' }}
            disabled={status === 'loading'}
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className="btn" 
          style={{ width: '100%', opacity: status === 'loading' ? 0.7 : 1 }}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan'}
        </button>
      </form>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
        <span style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>ATAU</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
      </div>

      <button 
        type="button" 
        onClick={handleWhatsAppClick}
        style={{ 
          width: '100%', 
          padding: '0.75rem 1.5rem', 
          backgroundColor: '#25D366', 
          color: 'white', 
          border: 'none', 
          borderRadius: '8px', 
          fontWeight: 600, 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 6px -1px rgba(37, 211, 102, 0.3)'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#128C7E'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
      >
        <svg xmlns="http://www.w3.org/-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        Kontak via WhatsApp
      </button>
    </div>
  );
}
