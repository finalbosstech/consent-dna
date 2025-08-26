// app/layout.tsx
export const metadata = {
  title: "Consent DNA",
  description: "Dashboard app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
