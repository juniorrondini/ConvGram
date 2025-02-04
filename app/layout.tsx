// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Convgram",
  description: "Become a Convgramer, your world will change.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
