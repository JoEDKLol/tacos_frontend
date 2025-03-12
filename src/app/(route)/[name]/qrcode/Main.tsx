'use client';
import { useQRCode } from 'next-qrcode';
import { usePathname } from 'next/navigation';

const Main = () => {
  const path = usePathname();
  const restaurantName = decodeURIComponent(path.split("/")[1]);
  const { Canvas } = useQRCode();

  const restaurantURL = process.env.NEXTAUTH_URL+restaurantName

  return(
    <div className="">  
      
      <div className=' flex justify-center items-center h-[100vh]'>
        <div>
          <p className='font-bold text-center text-2xl text-[#006341]'>{restaurantName + " QR code"}</p>
          <div className='border-2 rounded-lg mt-3 p-0.5 border-[#006341]'>
          <Canvas
          text={restaurantURL}
            options={{
              errorCorrectionLevel: 'M',
              margin: 3,
              scale: 4,
              width: 400,
              color: {
                dark: '#006341',
                // light: '#FFBF60FF',
              },
            }}
          />
          </div>
        </div>
      </div>

    </div>
  );
};
  
  export default Main