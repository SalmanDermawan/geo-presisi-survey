import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import DeleteButton from './DeleteButton';

export const metadata = {
  title: 'Pesan Masuk | Admin',
};

async function deleteMessage(formData: FormData) {
  'use server';
  const id = formData.get('id');
  if (id) {
    await prisma.contactMessage.delete({
      where: { id: parseInt(id.toString(), 10) }
    });
    revalidatePath('/admin/messages');
  }
}

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--primary-dark)' }}>Pesan Masuk</h1>
      
      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', backgroundColor: '#f9fafb' }}>
                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-color)' }}>Tanggal</th>
                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-color)' }}>Pengirim</th>
                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-color)' }}>Pesan</th>
                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-color)' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-light)' }}>
                    Belum ada pesan masuk.
                  </td>
                </tr>
              ) : (
                messages.map((message) => (
                  <tr key={message.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem', whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                      {new Date(message.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      <br />
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                        {new Date(message.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                      <div style={{ fontWeight: 600 }}>{message.name}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                        <a href={`mailto:${message.email}`} style={{ color: 'var(--primary)' }}>{message.email}</a>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', verticalAlign: 'top', minWidth: '300px' }}>
                      <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{message.message}</p>
                    </td>
                    <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                      <form action={deleteMessage}>
                        <input type="hidden" name="id" value={message.id} />
                        <DeleteButton />
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
