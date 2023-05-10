export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, boxSizing: "border-box", overflow: "visible" }}>
        {children}
      </body>
    </html>
  );
}
