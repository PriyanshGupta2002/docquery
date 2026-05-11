export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {children}
    </main>
  );
}
