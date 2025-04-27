import './globals.css';
import LayoutProvider from '@/components/LayoutProvider';

export const metadata = {
  title: 'MyShop - E-Commerce',
  description: 'Buy products at best price!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <LayoutProvider>
          {children}
        </LayoutProvider>
      </body>
    </html>
  );
}
