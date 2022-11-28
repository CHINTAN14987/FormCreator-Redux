import React from "react";
import "../CheckBox/CheckBox.css";

const CheckBox = ({ draggedItem }) => {
  if (draggedItem.key === "EN01OptionType4") {
    return (
      <div className="checkboxContainer">
        {draggedItem.subView[0].options.map((item, index) => {
          return (
            <div key={index} className="checkboxField">
              <input type={"checkbox"} />
              <span className="checkboxOptions">{item.text}</span>
            </div>
          );
        })}
      </div>
    );
  }
};

export default CheckBox;
