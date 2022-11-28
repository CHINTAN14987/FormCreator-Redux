import React from "react";
import "../Label/Label.css";
import { EnterOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
const Label = ({ draggedItem }) => {
  const value = useSelector(
    (state) => state.JsonTransFormationReducer.CareCardData.cardData
  );
  if (draggedItem.key === "EN01T00N") {
    return (
      <div className="labelContainer">
        {draggedItem.subView.map((item, index) => {
          return <span key={index}>{item.title.text}</span>;
        })}
      </div>
    );
  }

  if (draggedItem.key === "EN01T01N") {
    return (
      <div className="labelWrapper">
        <div className="labelContainer  bodyTitleTile">
          {Object.keys(draggedItem?.subView[0]).map((item, index) => {
            return <span key={index}>{draggedItem.subView[0][item].text}</span>;
          })}
        </div>
      </div>
    );
  }

  if (draggedItem.key === "EN01TTA00RH") {
    return (
      <div className="labelContainer  bodyTitleTile">
        <span>{draggedItem.subView[0].title.text}</span>
        <div className="mobileWrapper">
          {draggedItem.subView[0].body.map((item, index) => {
            return <span key={index}>{item.text}</span>;
          })}
        </div>
      </div>
    );
  }
  if (draggedItem.key === "EN01BottomButtonBack") {
    return (
      <button className="buttonContainer">
        <EnterOutlined className="buttonIcon" />
      </button>
    );
  }
  if (draggedItem.key === "EN01BottomButton1") {
    return (
      <button className="buttonContainer submitbutton">
        {draggedItem.subView[0].title.text}
      </button>
    );
  }
};

export default Label;
