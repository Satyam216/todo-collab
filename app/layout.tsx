import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Import LinkedIn icon
import "./globals.css";
import packageJson from "../package.json"; // Import version

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo-collab",
  description: "Collaborative Task Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">{children}</main>
          <footer className="text-center p-4 text-gray-500 text-sm border-t border-gray-700">
            <div>todo-collab v{packageJson.version}</div>
            <div className="mt-2">
              Made by <span className="font-bold">SJ</span>
            </div>
            <div className="flex items-center justify-center mt-2 space-x-3">
              <a
                href="https://github.com/Satyam216"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-500"
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/satyam-jain-874b66143"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-500"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
