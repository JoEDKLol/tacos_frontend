

import Portal from "./Portal";

const CustomConfirm = (props:any) => {
  
  function fcTreeStructure(){
    props.setConfirm(true);
    props.handleModal();
  }

  return (
    <Portal
      selector="portal"
        show={props.show}
    >
      <div className='w-[full] h-[full] border'>
        confirm
        <button
        onClick={()=>fcTreeStructure()}
        ></button>
        </div> 
    </Portal>
  );
}

export default CustomConfirm;



