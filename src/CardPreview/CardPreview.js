import React from "react";
import "./CardPreview.css";
import { useSelector } from "react-redux";
import { EnterOutlined } from "@ant-design/icons";
const CardPreview = ({ DragCard }) => {
  const cardData = useSelector(
    (state) => state.JsonTransFormationReducer.CareCardData.cardData
  );

  return (
    <div className="cardPreviewContainer">
      {Object.keys(cardData).map((item, index) => {
        return <span key={index}>{cardData[item]}</span>;
      })}
      <button
        className="buttonBackContainer"
        onClick={() => {
          DragCard();
        }}
      >
        <EnterOutlined className="buttonIcon" />
      </button>
    </div>
  );
};

export default CardPreview;
