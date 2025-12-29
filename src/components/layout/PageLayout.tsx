import { Header } from './Header';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="page-container">
      <Header />
      <main className="content-wrapper">
        {children}
      </main>
    </div>
  );
}
