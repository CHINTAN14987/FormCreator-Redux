import React from "react";
import { useSelector } from "react-redux";
import CareCardEvent from "./CareCardEvent/CareCardEvent";
const Event = ({ draggableTaskEvent }) => {
  const TaskEvent = draggableTaskEvent[draggableTaskEvent.length - 1];
  const clickItem = useSelector((state) => state?.UserReducer?.cardClickItem);

  const value = draggableTaskEvent.find((item) => item?.key === clickItem?.key);
  const newitem = clickItem !== null ? value : TaskEvent;
  switch (newitem.id) {
    case "EN01OptionType4":
    case "EN01T00N":
    case "EN01T01N":
    case "SubmitButtonField":
    case "EN01BottomButton1":
    case "EN01TTA00RH":
      return <CareCardEvent item={newitem} />;

    default:
      return null;
  }
};
export default Event;
