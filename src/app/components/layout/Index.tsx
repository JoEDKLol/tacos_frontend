'use client';

import { usePathname } from "next/navigation";
import Header from "./Header";
// import LoadingScreen from "../common/loadingScreen/Index";



const RestaurantsMainPage = ({ children }: { children: React.ReactNode }) => {
  
  const path = usePathname();

  console.log(path);

  if(path === "/"){

  }

  return(<>  
    <>
      {
        (path !== "/")?
        <>
        test
        <Header/>{children}
        </>
        :
        <>
        test
        {children}
        </>
      }    
    
    </>
  </>
  );
};

export default RestaurantsMainPage