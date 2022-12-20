import React from "react";
import "../Label/Label.css";
import { EnterOutlined } from "@ant-design/icons";
const Label = ({ draggedItem }) => {
  if (draggedItem.id === "EN01T00N") {
    return (
      <div
        className={` labelContainer ${
          draggedItem.isTitledraggable ? "customTileheading" : ""
        } ${draggedItem.isDraggable === true ? "customTileHeadingMain" : ""} `}
      >
        {draggedItem.subView.map((item, index) => {
          return <span key={index}>{item.title.text}</span>;
        })}
      </div>
    );
  }

  if (draggedItem.id === "EN01T01N") {
    return (
      <div
        className={`labelContainer bodyTitleTile ${
          draggedItem.isDraggable === true ? "customTileBodyWrapper" : ""
        } `}
      >
        {Object.keys(draggedItem?.subView[0]).map((item, index) => {
          return <span key={index}>{draggedItem.subView[0][item].text}</span>;
        })}
      </div>
    );
  }

  if (draggedItem.id === "EN01TTA00RH") {
    return (
      <div
        className={`labelContainer bodyTitleTile ${
          draggedItem.isDraggable === true ? "customTileBodyContactWrapper" : ""
        } `}
      >
        <span>{draggedItem.subView[0].title.text}</span>
        <div className="mobileWrapper">
          {draggedItem.subView[0].body.map((item, index) => {
            return <span key={index}>{item.text}</span>;
          })}
        </div>
      </div>
    );
  }
  if (draggedItem.id === "EN01BottomButtonBack") {
    return (
      <button
        className={`buttonContainer  ${
          draggedItem.isDraggable === true ? "customBackButtonField" : ""
        }`}
      >
        <EnterOutlined className="buttonIcon" />
      </button>
    );
  }
  if (draggedItem.id === "EN01BottomButton1") {
    return (
      <button
        className={`buttonContainer submitbutton ${
          draggedItem?.isDraggableSubmitButton ? "customButtonField" : ""
        }`}
      >
        {draggedItem.subView[0].title.text}
      </button>
    );
  }
};

export default Label;
