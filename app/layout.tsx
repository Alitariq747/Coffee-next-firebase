import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Providers } from "@/providers";
import { Toaster } from "sonner";


export const metadata: Metadata = {
  title: "Cafe",
  description: "Get instant coffee by a click",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en">
			<body className="bg-[#fff7ed]">
			  <Providers>
				  <Toaster position="top-right"/>
					<Navbar />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
