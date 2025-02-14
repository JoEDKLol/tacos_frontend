'use client';

const InputNomal = (props:any) => {
  return (

    <input type="text" 
      ref={props.ref}
      onChange={props.onChange}
      className="border px-2 py-1 rounded outline-none " 
      value={props.value}/>
  );
}


export {InputNomal};



