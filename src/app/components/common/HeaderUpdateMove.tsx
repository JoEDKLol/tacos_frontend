'use client';

import { useRouter } from "next/navigation";



const HeaderUpdateMove = (props:any) => {
  const router = useRouter();
  function gotoScreenOnClick(){
    router.push("/" + props.name + "/headerupdate");
  }

  return(
    <>
      <div className="grid place-items-center grid-cols-1">
				<div className="flex justify-center mt-40 mb-4">
					<p className="text-[#006341]">There is no header update layout.

            <button
            onClick={()=>gotoScreenOnClick()} 
            className="cursor-pointer font-bold text-[#006341] hover:text-[#CE1126]">
            Go to headerupdate 
            </button>
          
          
          </p>
        </div>
			</div>
    </>
  ) 
}
export default HeaderUpdateMove;