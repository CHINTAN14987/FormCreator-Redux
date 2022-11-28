import React from "react";

import CheckBox from "./CheckBox/CheckBox";
import Label from "./Label/Label";

const Tile = ({ item }) => {
  switch (item.key) {
    case "EN01T00N":
    case "EN01T01N":
    case "EN01TTA00RH":
    case "EN01BottomButtonBack":
    case "EN01BottomButton1":
      return <Label draggedItem={item} />;
    case "EN01OptionType4":
      return <CheckBox draggedItem={item} />;

    default:
      return null;
  }
};

export default Tile;
