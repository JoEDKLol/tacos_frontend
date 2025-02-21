
import * as ColorPicker from "react-colorful";
const ColorButton = (props:any) => {
  return (
    <div className="">
      <ColorPicker.HexColorPicker 
        color={props.color}
        onChange={props.setColor}
        style={{ width: 130, height: 130 }}
      />
    </div>
  );
};

export default ColorButton;