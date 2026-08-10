'use client';

import { useActionState } from 'react';
import { loginAction } from './actions';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f5fa' }}>
      <div style={{ background: '#fff', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center', color: '#0b355e' }}>Admin Login</h1>
        
        {state?.error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '6px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {state.error}
          </div>
        )}

        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Username</label>
            <input name="username" type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e5e5e5', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
            <input name="password" type="password" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e5e5e5', outline: 'none' }} />
          </div>
          <button type="submit" disabled={isPending} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0b355e', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: isPending ? 'not-allowed' : 'pointer', marginTop: '1rem' }}>
            {isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
