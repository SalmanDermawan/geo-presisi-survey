import prisma from '@/lib/prisma';
import { addPortfolioAction, deletePortfolioAction } from './actions';

export const metadata = {
  title: 'Manajemen Portofolio | Admin',
};

export default async function PortfolioPage() {
  const portfolios = await prisma.portfolio.findMany({ orderBy: { id: 'desc' } });

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--primary-dark)' }}>Manajemen Portofolio</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)' }}>Tambah Portofolio Baru</h2>
          <form
            action={addPortfolioAction}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <input
              type="text"
              name="title"
              placeholder="Nama Proyek"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                outline: 'none'
              }}
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                outline: 'none',
                backgroundColor: '#f9fafb'
              }}
            />

            <textarea
              name="description"
              placeholder="Deskripsi Singkat"
              required
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                outline: 'none',
                resize: 'vertical'
              }}
            />

            <button
              type="submit"
              className="btn"
              style={{ alignSelf: 'flex-start' }}
            >
              Tambah Portofolio
            </button>
          </form>
        </div>

        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)' }}>Daftar Portofolio</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {portfolios.map((port) => (
              <div key={port.id} style={{ background: '#fff', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                <img src={port.imageUrl} alt={port.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>{port.title}</h3>
                  <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>{port.description}</p>
                  <form action={deletePortfolioAction}>
                    <input type="hidden" name="id" value={port.id} />
                    <button type="submit" style={{ backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 500, cursor: 'pointer', width: '100%' }}>Hapus Portofolio</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
