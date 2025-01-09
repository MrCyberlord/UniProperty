// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Header Placeholder</h1> 
        </header>
        {children}
        <footer>
          <p>Footer Placeholder</p>
        </footer>
      </body>
    </html>
  );
}
