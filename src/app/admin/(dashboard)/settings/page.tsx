import prisma from '@/lib/prisma';
import { updateSettingsAction } from './actions';

export const metadata = {
  title: 'Pengaturan Website | Admin',
};

export default async function SettingsPage() {
  const settings = await prisma.setting.findMany();

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--primary-dark)' }}>Pengaturan Website</h1>
      
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-color)', maxWidth: '800px' }}>
        <form action={updateSettingsAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {settings.map((s) => (
            <div key={s.id}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--primary-dark)' }}>
                {s.description || s.key}
              </label>
              {s.key === 'logoUrl' ? (
                <div>
                  <input 
                    type="file" 
                    name={s.key} 
                    accept="image/*"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: '#f9fafb' }}
                  />
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>Logo saat ini: {s.value}</p>
                  {s.value && <img src={s.value} alt="Current Logo" style={{ height: '40px', marginTop: '0.5rem', objectFit: 'contain' }} />}
                </div>
              ) : s.value.length > 50 || s.key === 'aboutText' ? (
                <textarea 
                  name={s.key} 
                  defaultValue={s.value} 
                  rows={4}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', resize: 'vertical' }}
                />
              ) : (
                <input 
                  type="text" 
                  name={s.key} 
                  defaultValue={s.value} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }}
                />
              )}
            </div>
          ))}
          
          <button type="submit" className="btn" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
