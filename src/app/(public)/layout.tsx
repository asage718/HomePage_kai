import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 'var(--header-height)' }}>{children}</main>
      <Footer />
    </>
  );
}
