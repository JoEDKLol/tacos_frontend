import Portal from "./Portal";
import styles from './LoadingScreenlayout.module.scss';
// import { FcGoogle } from "react-icons/fc";

const LodingScreen = (props:any) => {
  
  
  // useEffect(() => {
    
  //   if(props.show){
  //     setBlock("visible transform translate-y-8 ease-out duration-700 ");
  //   }else{
  //     setBlock("invisible  ");
  //   }

  // }, [props.show]);





  return (
    <Portal
      selector="portal"
      show={props.show}>
        <div className= " flex flex-col overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className={styles.loaderStyle}></div>
        </div>
    </Portal>
  );
}

export default LodingScreen;



