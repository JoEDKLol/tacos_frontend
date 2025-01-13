import type { Metadata } from "next";
import "./globals.css";
import RestaurantsMainPage from "./components/layout/Index";


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
      <div id="portal" />{children}
      {/* <RestaurantsMainPage>{children}</RestaurantsMainPage> */}
       
    </body>
   </html>
  )
 }
