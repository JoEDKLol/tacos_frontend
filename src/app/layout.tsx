import type { Metadata } from "next";
import "./globals.css";
import LoadingScreen from "./components/common/loadingScreen/Index";
import ErrorScreen from "./components/common/errorScreen/Index";
import AuthSession from "./api/auth/AuthSession";
import CommonTransaction from "./api/common/Index";




export const metadata: Metadata = {
  title: "taco oaxaca",
  description: "taco oaxaca",
  icons: {
    icon: "/tacos.ico",
  },  
};



export default function RootLayout({
  children,
 }: {
  children: React.ReactNode
 }) {
  
  return (
   <html lang="en">
    <body>
    <AuthSession>
      <CommonTransaction>
      <LoadingScreen/>
      <ErrorScreen/>
      <div id="portal" />{children}
      {/* <RestaurantsMainPage>{children}</RestaurantsMainPage> */}
      </CommonTransaction>
    </AuthSession>
    </body>
   </html>
  )
 }
