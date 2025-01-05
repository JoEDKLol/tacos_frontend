import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "taco oaxaca",
  description: "taco oaxaca",
  // icons: {
  //   icon: "/tacos.ico",
  // },  
};

export default function RootLayout({
  children,
 }: {
  children: React.ReactNode
 }) {
  return (
   <html lang="en">
    <body>
      <div id="portal" />
      {children}
    </body>
   </html>
  )
 }
