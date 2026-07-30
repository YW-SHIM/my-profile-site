import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SRM2 - Single A/N Unified Workspace',
  description: 'Task-Oriented UI Prototype for Shipment Release Management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
