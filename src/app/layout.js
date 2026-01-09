import "./globals.css";

export const metadata = {
  title: "mindless.pr - Coming Soon",
  description: "Something new is coming. Stay tuned.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
