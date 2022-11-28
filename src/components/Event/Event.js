import React from "react";
import CareCardEvent from "./CareCardEvent/CareCardEvent";
const Event = ({ draggableTaskEvent }) => {
  const TaskEvent = draggableTaskEvent[draggableTaskEvent.length - 1];
  switch (TaskEvent.key) {
    case "EN01OptionType4":
    case "EN01T00N":
    case "EN01T01N":
    case "SubmitButtonField":
    case "EN01BottomButton1":
    case "EN01TTA00RH":
      return <CareCardEvent item={TaskEvent} />;

    default:
      return null;
  }
};
export default Event;
