import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe',
  description: 'Play the classic Tic-Tac-Toe game with modern features including time travel, move history, and beautiful animations. Built with Next.js 14 and TypeScript.',
  keywords: 'tic-tac-toe, game, react, nextjs, typescript, time travel, classic game',
  authors: [{ name: 'Jm Pintin' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}