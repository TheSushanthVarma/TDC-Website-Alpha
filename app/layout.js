import '@fontsource-variable/manrope';
import './globals.css';

export const metadata = {
  title: 'TechDemocracy — Identity security, advised, implemented and run',
  description: 'TechDemocracy secures every identity — people, machines and AI agents. Advisory, implementation and 24/7 managed identity services.',
  icons: { icon: '/mark.svg' },
  metadataBase: new URL('https://www.techdemocracy.com'),
  openGraph: { title: 'TechDemocracy — Every identity, governed.', description: 'Identity security — advised, implemented and run, for people, machines and AI agents.', images: [{ url: '/og.png', width: 1200, height: 630 }], type: 'website' },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
