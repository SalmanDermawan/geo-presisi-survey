import { getSettings } from '@/lib/settings';

export const metadata = {
  title: 'Hubungi Kami',
};

export default async function Contact() {
  const settings = await getSettings();

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}>
      <h1 className="section-title">Hubungi Kami</h1>
      
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        <div className="card">
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Informasi Kontak</h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {settings.contactAddress && (
              <li>
                <strong style={{ display: 'block', color: 'var(--primary-dark)', marginBottom: '0.25rem' }}>Alamat:</strong>
                <span className="text-light">{settings.contactAddress}</span>
              </li>
            )}
            {settings.contactPhone && (
              <li>
                <strong style={{ display: 'block', color: 'var(--primary-dark)', marginBottom: '0.25rem' }}>Telepon:</strong>
                <span className="text-light">{settings.contactPhone}</span>
              </li>
            )}
            {settings.contactEmail && (
              <li>
                <strong style={{ display: 'block', color: 'var(--primary-dark)', marginBottom: '0.25rem' }}>Email:</strong>
                <span className="text-light">{settings.contactEmail}</span>
              </li>
            )}
          </ul>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Kirim Pesan</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Nama Lengkap</label>
              <input type="text" placeholder="Masukkan nama" style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
              <input type="email" placeholder="Masukkan email" style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Pesan</label>
              <textarea placeholder="Pesan Anda" rows={4} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', resize: 'vertical' }}></textarea>
            </div>
            <button type="button" className="btn" style={{ width: '100%' }}>Kirim Pesan</button>
          </form>
        </div>
      </div>
    </div>
  );
}
