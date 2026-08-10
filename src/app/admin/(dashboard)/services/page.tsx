import prisma from '@/lib/prisma';
import { addServiceAction, deleteServiceAction } from './actions';

export const metadata = {
  title: 'Manajemen Layanan | Admin',
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { id: 'desc' } });

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--primary-dark)' }}>Manajemen Layanan</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)' }}>Tambah Layanan Baru</h2>
          <form action={addServiceAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="text" name="title" placeholder="Nama Layanan" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }} />
            <textarea name="description" placeholder="Deskripsi Singkat" required rows={3} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', resize: 'vertical' }}></textarea>
            <button type="submit" className="btn" style={{ alignSelf: 'flex-start' }}>Tambah Layanan</button>
          </form>
        </div>

        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)' }}>Daftar Layanan</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {services.map((svc) => (
              <div key={svc.id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--primary-dark)' }}>{svc.title}</h3>
                  <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>{svc.description}</p>
                </div>
                <form action={deleteServiceAction}>
                  <input type="hidden" name="id" value={svc.id} />
                  <button type="submit" style={{ backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 500, cursor: 'pointer' }}>Hapus</button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
