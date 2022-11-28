import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { action } from "../../redux/ReducerSlice";
import "./Properties.css";

const Properties = () => {
  const color = [
    "#ff0000",
    "#0000ff",
    "#3cb371",
    "#ffa500",
    "#ee82ee",
    "#6a5acd",
    "#000000",
  ];
  const dispatch = useDispatch();
  const colorChooseHandler = (color) => {
    dispatch(action.careCardProperties({ color }));
  };
  const defaultColorhandler = () => {
    dispatch(action.careCardProperties({ color: "" }));
  };
  const data = useSelector((state) => state.tileProperties);

  return (
    // <div className="itemProperties_Wrapper">
    //   {color.map((colorItem, index) => {
    //     return (
    //       <div
    //         className="boxColorIcon"
    //         key={index}
    //         style={{
    //           backgroundColor: colorItem,
    //           width: "1.5rem",
    //           height: "1.5rem",
    //           border: "1px solid #f1f1f1",
    //         }}
    //         onClick={(e) => {
    //           colorChooseHandler(colorItem);
    //         }}
    //       ></div>
    //     );
    //   })}
    //   <span onClick={(e) => defaultColorhandler()}>Default</span>
    // </div>
    <></>
  );
};

export default Properties;
