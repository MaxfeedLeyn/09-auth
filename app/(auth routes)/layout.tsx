import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from '@/components/Footer/Footer';
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export const metadata: Metadata = {
  title: "NoteHub: Auth page",
  description: "NoteHub pages for authorization",
  openGraph: {
    title: "NoteHub: Auth page",
    description: "NoteHub pages for authorization",
    url: "https://notehub.com/auth",
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1536,
      height: 1024,
      alt: "NoteHub logo"
    },
  ],
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}