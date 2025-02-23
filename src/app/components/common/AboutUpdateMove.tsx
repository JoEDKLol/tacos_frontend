'use client';

import { useRouter } from "next/navigation";



const AboutUpdateMove = (props:any) => {
  const router = useRouter();
  function gotoScreenOnClick(){
    router.push("/" + props.name + "/aboutupdate");
  }

  return(
    <>
      <div className="grid place-items-center grid-cols-1">
				<div className="flex justify-center mt-40 mb-4">
					<p className="text-[#006341]">There is no about update layout.
          <button
          onClick={()=>gotoScreenOnClick()} 
          className="cursor-pointer font-bold text-[#006341] hover:text-[#CE1126]">
          Go to aboutupdate 
          </button>
          </p>
        </div>
			</div>
    </>
  ) 
}
export default AboutUpdateMove;