import { getSettings } from '@/lib/settings';

export const metadata = {
  title: 'Tentang Kami',
};

export default async function About() {
  const settings = await getSettings();

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}>
      <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>Tentang {settings.companyName || 'Perusahaan'}</h1>
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--text-light)' }}>
          {settings.aboutText || 'Belum ada informasi tentang kami.'}
        </p>
      </div>
    </div>
  );
}
