import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Dashboard | Admin Panel',
};

export default async function AdminDashboard() {
  const serviceCount = await prisma.service.count();
  const portfolioCount = await prisma.portfolio.count();

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--primary-dark)' }}>Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Total Layanan</h2>
          <p style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)' }}>{serviceCount}</p>
        </div>
        
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Total Portofolio</h2>
          <p style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)' }}>{portfolioCount}</p>
        </div>
      </div>
    </div>
  );
}
