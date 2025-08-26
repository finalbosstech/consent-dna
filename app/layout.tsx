export const metadata = {
  title: 'Consent DNA',
  description: 'Patent-pending consent management SaaS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
