'use client';

import { useRouter } from "next/navigation";



const ManageMove = () => {
  const router = useRouter();
  function gotoRegScreenOnClick(){
    router.push("/management");
  }

  return(
    <>
      <div className="grid place-items-center grid-cols-1">
				<div className="flex justify-center mt-40 mb-4">
					<p className="text-[#006341]">This is a restaurant without one.
          <button
          onClick={()=>gotoRegScreenOnClick()} 
          className="cursor-pointer font-bold text-[#006341] hover:text-[#CE1126]">
          Go to management 
          </button>
          </p>
        </div>
			</div>
    </>
  ) 
}
export default ManageMove;