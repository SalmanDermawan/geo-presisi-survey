import Link from 'next/link';

export const metadata = {
  title: 'Admin Panel | MM Pusaka Karya',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Admin Sidebar */}
      <aside style={{ width: '250px', backgroundColor: 'var(--primary-dark)', color: '#fff', padding: '2rem 1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem', paddingLeft: '1rem' }}>Admin Panel</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link href="/admin" style={{ padding: '0.75rem 1rem', borderRadius: '6px', display: 'block' }}>Dashboard</Link>
          <Link href="/admin/messages" style={{ padding: '0.75rem 1rem', borderRadius: '6px', display: 'block' }}>Pesan Masuk</Link>
          <Link href="/admin/settings" style={{ padding: '0.75rem 1rem', borderRadius: '6px', display: 'block' }}>Pengaturan Website</Link>
          <Link href="/admin/about" style={{ padding: '0.75rem 1rem', borderRadius: '6px', display: 'block' }}>About</Link>
          <Link href="/admin/services" style={{ padding: '0.75rem 1rem', borderRadius: '6px', display: 'block' }}>Layanan</Link>
          <Link href="/admin/portfolio" style={{ padding: '0.75rem 1rem', borderRadius: '6px', display: 'block' }}>Portofolio</Link>
          <Link href="/" style={{ padding: '0.75rem 1rem', borderRadius: '6px', display: 'block', marginTop: '2rem', color: '#a0aec0' }}>← Ke Website Utama</Link>
          
          <form action={async () => {
            'use server';
            const { logoutAction } = await import('@/app/admin/logoutAction');
            await logoutAction();
          }} style={{ marginTop: 'auto' }}>
            <button type="submit" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '6px', border: 'none', backgroundColor: '#e53e3e', color: 'white', fontWeight: 600, cursor: 'pointer', textAlign: 'left', marginTop: '1rem' }}>
              Keluar (Logout)
            </button>
          </form>
        </nav>
      </aside>
      
      {/* Admin Content */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
