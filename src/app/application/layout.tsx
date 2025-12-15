import { Toaster } from "@/components/ui/sonner";

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full max-w-150">
      {children}
      <Toaster />
    </main>
  );
}
