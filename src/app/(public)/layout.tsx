import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/settings";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <>
      <Navbar logoUrl={settings.logoUrl} companyName={settings.companyName} />
      <main>
        {children}
      </main>
      <Footer 
        companyName={settings.companyName}
        contactAddress={settings.contactAddress}
        contactEmail={settings.contactEmail}
        contactPhone={settings.contactPhone}
      />
    </>
  );
}
