
import * as ColorPicker from "react-colorful";

const ColorButton = (props:any) => {

  

  return (
    <div>
      <ColorPicker.HexColorPicker 
        color={props.color}
        onChange={props.setColor}
      />
    </div>
  );
};

export default ColorButton;