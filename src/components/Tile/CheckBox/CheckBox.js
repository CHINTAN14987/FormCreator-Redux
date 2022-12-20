import React from "react";
import "../CheckBox/CheckBox.css";

const CheckBox = ({ draggedItem }) => {
  if (draggedItem.id === "EN01OptionType4") {
    return (
      <>
        {draggedItem.subView[0].options.map((item, index) => {
          return (
            <div
              key={index}
              className={`checkboxField ${
                draggedItem.isDraggable === true ? "customCheckboxField" : ""
              } `}
            >
              <input type={"checkbox"} />
              <span className="checkboxOptions">{item.text}</span>
            </div>
          );
        })}
      </>
    );
  }
};

export default CheckBox;
