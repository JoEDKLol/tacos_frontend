

import Portal from "./Portal";

const TEST = (props:any) => {
  
  function fcTreeStructure(){
    props.setConfirm(true);
    props.handleModal();
  }

  return (
    
    

    <Portal
      selector="portal"
        show={props.show}
    >
      <div className='absolute w-[100px] z-10'>
        test
        <button
        onClick={()=>fcTreeStructure()}
        >test</button>
        </div> 
    </Portal>

  );
}

export default TEST;



