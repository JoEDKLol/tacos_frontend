'use client';



const CommonHearder = () => {
  return(
    <>
      <div className={`sticky top-0 left-0 w-full mb-1 border-b-2 border-b-white flex justify-end items-center border h-[24px]`}>
				
        <button className="text-[10px] mr-1 px-2 py-0.5 border rounded-3xl">
        MyInfo
        </button>
        <button className="text-[10px] mr-1 px-2 py-0.5 border rounded-3xl">
        Logout
        </button>
			</div>
    </>
  ) 
}
export default CommonHearder;