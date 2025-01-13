'use client';

import { usePathname } from "next/navigation";
import Header from "./Header";



const RestaurantsMainPage = ({ children }: { children: React.ReactNode }) => {
  
  const path:any = usePathname();

  console.log(path);

  if(path === "/"){

  }

  return(<>  
    <>
      {
        (path !== "/")?
        <>
        <Header/>{children}
        </>
        :
        <>
        {children}
        </>
      }    
    
    </>
  </>
  );
};

export default RestaurantsMainPage