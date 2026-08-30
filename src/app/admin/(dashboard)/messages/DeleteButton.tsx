'use client';

export default function DeleteButton() {
  return (
    <button 
      type="submit" 
      style={{ 
        background: '#fee2e2', 
        color: '#991b1b', 
        border: 'none', 
        padding: '0.5rem 1rem', 
        borderRadius: '6px', 
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: 500
      }}
      onClick={(e) => {
        if (!confirm('Yakin ingin menghapus pesan ini?')) {
          e.preventDefault();
        }
      }}
    >
      Hapus
    </button>
  );
}
