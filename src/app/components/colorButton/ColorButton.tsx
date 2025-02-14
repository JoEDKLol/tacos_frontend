
import * as ColorPicker from "react-colorful";

const ColorButton = (props:any) => {
  return (
    <div className="">
      <ColorPicker.HexColorPicker 
        color={props.color}
        onChange={props.setColor}
      />
    </div>
  );
};

export default ColorButton;