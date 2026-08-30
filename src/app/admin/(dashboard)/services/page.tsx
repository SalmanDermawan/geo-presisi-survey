import prisma from '@/lib/prisma';
import {
  addServiceAction,
  deleteServiceAction,
  updateServiceAction,
} from './actions';

export const metadata = {
  title: 'Manajemen Layanan | Admin',
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { id: 'desc' },
  });

  return (
    <div>
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '2rem',
          color: 'var(--primary-dark)',
        }}
      >
        Manajemen Layanan
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
        }}
      >

        {/* =========================
            TAMBAH LAYANAN
        ========================= */}

        <div
          style={{
            background: '#fff',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: 'var(--shadow)',
            border: '1px solid var(--border-color)',
          }}
        >
          <h2
            style={{
              fontSize: '1.25rem',
              marginBottom: '1rem',
              color: 'var(--primary)',
            }}
          >
            Tambah Layanan Baru
          </h2>

          <form
            action={addServiceAction}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <input
              type="text"
              name="title"
              placeholder="Nama Layanan"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                outline: 'none',
              }}
            />

            <textarea
              name="description"
              placeholder="Contoh: Pemetaan Topografi • Pengukuran Situasi • Pengolahan Data"
              required
              rows={4}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                outline: 'none',
                resize: 'vertical',
              }}
            />

            <small
              style={{
                color: 'var(--text-light)',
                marginTop: '-0.5rem',
              }}
            >
              Gunakan tanda <strong>•</strong> untuk memisahkan
              setiap poin layanan.
            </small>

            <button
              type="submit"
              className="btn"
              style={{
                alignSelf: 'flex-start',
              }}
            >
              Tambah Layanan
            </button>
          </form>
        </div>


        {/* =========================
            DAFTAR LAYANAN
        ========================= */}

        <div>
          <h2
            style={{
              fontSize: '1.25rem',
              marginBottom: '1rem',
              color: 'var(--primary)',
            }}
          >
            Daftar Layanan
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >

            {services.length === 0 ? (

              <div
                style={{
                  background: '#fff',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-light)',
                  textAlign: 'center',
                }}
              >
                Belum ada layanan yang ditambahkan.
              </div>

            ) : (

              services.map((svc) => {

                // Pecah description berdasarkan bullet •
                const descriptionItems = svc.description
                  .split('•')
                  .map((item) => item.trim())
                  .filter(Boolean);

                return (
                  <div
                    key={svc.id}
                    style={{
                      background: '#fff',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow-sm)',
                      border: '1px solid var(--border-color)',
                    }}
                  >

                    {/* =========================
                        FORM EDIT
                    ========================= */}

                    <form
                      action={updateServiceAction}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                      }}
                    >

                      <input
                        type="hidden"
                        name="id"
                        value={svc.id}
                      />

                      <input
                        type="text"
                        name="title"
                        defaultValue={svc.title}
                        placeholder="Nama Layanan"
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '6px',
                          border: '1px solid var(--border-color)',
                          outline: 'none',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          color: 'var(--primary-dark)',
                        }}
                      />


                      {/* =========================
                          DESCRIPTION
                      ========================= */}

                      <textarea
                        name="description"
                        defaultValue={svc.description}
                        placeholder="Contoh: Pemetaan Topografi • Pengukuran Situasi • Pengolahan Data"
                        required
                        rows={4}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '6px',
                          border: '1px solid var(--border-color)',
                          outline: 'none',
                          resize: 'vertical',
                          lineHeight: 1.6,
                        }}
                      />


                      {/* =========================
                          PREVIEW BULLET
                      ========================= */}

                      {descriptionItems.length > 1 && (
                        <div
                          style={{
                            background: '#f8fafc',
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                          }}
                        >
                          <small
                            style={{
                              display: 'block',
                              marginBottom: '0.5rem',
                              fontWeight: 600,
                              color: 'var(--primary-dark)',
                            }}
                          >
                            Preview:
                          </small>

                          <ul
                            style={{
                              margin: 0,
                              paddingLeft: '1.25rem',
                              color: 'var(--text-light)',
                              lineHeight: 1.7,
                            }}
                          >
                            {descriptionItems.map((item, index) => (
                              <li key={`${svc.id}-preview-${index}`}>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}


                      {/* =========================
                          BUTTON
                      ========================= */}

                      <div
                        style={{
                          display: 'flex',
                          gap: '0.75rem',
                          alignItems: 'center',
                        }}
                      >

                        <button
                          type="submit"
                          className="btn"
                        >
                          Simpan Perubahan
                        </button>

                      </div>

                    </form>


                    {/* =========================
                        DELETE
                    ========================= */}

                    <form
                      action={deleteServiceAction}
                      style={{
                        marginTop: '0.75rem',
                      }}
                    >
                      <input
                        type="hidden"
                        name="id"
                        value={svc.id}
                      />

                      <button
                        type="submit"
                        style={{
                          backgroundColor: '#fee2e2',
                          color: '#b91c1c',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          fontWeight: 500,
                          cursor: 'pointer',
                        }}
                      >
                        Hapus Layanan
                      </button>
                    </form>

                  </div>
                );
              })

            )}

          </div>
        </div>

      </div>
    </div>
  );
}

