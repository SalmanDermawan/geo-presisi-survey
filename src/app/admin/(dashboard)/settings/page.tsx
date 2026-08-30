import prisma from '@/lib/prisma';
import { updateSettingsAction } from './actions';

export const metadata = {
  title: 'Pengaturan Website | Admin',
};

export default async function SettingsPage() {
  const settings = await prisma.setting.findMany();

  const getValue = (key: string): string => {
    return settings.find((s) => s.key === key)?.value || '';
  };

  const logoUrl = getValue('logoUrl');

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>Pengaturan Website</h1>
      <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Kelola pengaturan utama website seperti logo, identitas, dan kontak.</p>
      
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-color)', maxWidth: '900px' }}>
        <form action={updateSettingsAction} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* IDENTITAS & BERANDA */}
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-dark)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>Identitas & Beranda</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--primary-dark)' }}>Logo Website</label>
                <input 
                  type="file" 
                  name="logoUrl" 
                  accept="image/*"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: '#f9fafb' }}
                />
                {logoUrl && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-light)', display: 'block', marginBottom: '0.25rem' }}>Logo saat ini:</span>
                    <img src={logoUrl} alt="Current Logo" style={{ height: '50px', objectFit: 'contain', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.25rem', background: '#fff' }} />
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--primary-dark)' }}>Nama Perusahaan</label>
                <input 
                  type="text" 
                  name="companyName" 
                  defaultValue={getValue('companyName')} 
                  placeholder="Contoh: PT. CV Geo Presisi Survey"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: '#f9fafb' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--primary-dark)' }}>Judul Hero (Beranda)</label>
                <input 
                  type="text" 
                  name="heroTitle" 
                  defaultValue={getValue('heroTitle')} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: '#f9fafb' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--primary-dark)' }}>Subjudul Hero (Beranda)</label>
                <textarea 
                  name="heroSubtitle" 
                  defaultValue={getValue('heroSubtitle')} 
                  rows={3}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', resize: 'vertical', backgroundColor: '#f9fafb' }}
                />
              </div>
            </div>
          </div>

          {/* KONTAK & SOSIAL MEDIA */}
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-dark)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>Kontak & Informasi Tambahan</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--primary-dark)' }}>Nomor Telepon / WhatsApp</label>
                <input 
                  type="text" 
                  name="contactPhone" 
                  defaultValue={getValue('contactPhone')} 
                  placeholder="Contoh: 081234567890"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: '#f9fafb' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--primary-dark)' }}>Email Perusahaan</label>
                <input 
                  type="email" 
                  name="contactEmail" 
                  defaultValue={getValue('contactEmail')} 
                  placeholder="Contoh: info@perusahaan.com"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: '#f9fafb' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--primary-dark)' }}>Alamat Lengkap</label>
                <textarea 
                  name="contactAddress" 
                  defaultValue={getValue('contactAddress')} 
                  rows={3}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', resize: 'vertical', backgroundColor: '#f9fafb' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--primary-dark)' }}>Teks Singkat Footer (Opsional)</label>
                <textarea 
                  name="aboutText" 
                  defaultValue={getValue('aboutText')} 
                  rows={3}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', resize: 'vertical', backgroundColor: '#f9fafb' }}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn" style={{ alignSelf: 'flex-start', marginTop: '1rem', padding: '0.75rem 2rem' }}>
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
