import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { JSONCarddata } from "../../../redux/JsonTransFormationSlice";
import { action } from "../../../redux/ReducerSlice";

import "./CareCardEvent.css";
const CareCardEvent = ({ item }) => {
  const dispatch = useDispatch();
  const [focus, setFocus] = useState(true);
  const DragValue = useSelector((state) => state.UserReducer.taskList[0].tasks);

  const ChangeHandler = (e) => {
    setFocus(false);
    dispatch(action.componentUpdateTileVal({ data: e, id: item.id }));
  };

  const tileBodyChangeHandler = (e) => {
    setFocus(false);
    dispatch(action.componentupdatetitleTitleBody({ e, id: item.id }));
  };

  const contactChangeHanlder = (e) => {
    setFocus(false);
    dispatch(action.componentUpdatetileContact({ e, id: item.id }));
  };

  if (item.key === "EN01TTA00RH") {
    return (
      <div className="event-wrapper">
        <input
          className="eventInput"
          value={item.subView[0].title.text}
          onChange={(e) => {
            ChangeHandler(e.target.value);
          }}
          name={item.subView[0].title.textKey}
          readOnly={focus}
          onFocus={() => {
            setFocus(false);
          }}
          onBlur={() => {
            setFocus(true);
            dispatch(JSONCarddata({ data: item.subView[0].title }));
          }}
        />
        {item.subView[0].body.map((draggedItemEdited, index) => {
          return (
            <input
              className="eventInput"
              value={draggedItemEdited.text}
              key={index}
              name={draggedItemEdited.textKey}
              onChange={(e) => {
                contactChangeHanlder(e);
              }}
              readOnly={focus}
              onFocus={() => {
                setFocus(false);
              }}
              onBlur={(e) => {
                setFocus(true);
                dispatch(JSONCarddata({ data: draggedItemEdited }));
              }}
            />
          );
        })}
      </div>
    );
  }

  if (item.key === "EN01T00N" || item.key === "EN01BottomButton1") {
    return (
      <div className="event-wrapper">
        <input
          className="eventInput"
          value={item.subView[0].title.text}
          onChange={(e) => {
            ChangeHandler(e.target.value);
          }}
          readOnly={focus}
          onFocus={() => {
            setFocus(false);
          }}
          onBlur={() => {
            setFocus(true);
            dispatch(JSONCarddata({ data: item.subView[0].title }));
            if (item.key === "EN01BottomButton1") {
              dispatch(JSONCarddata({ data: item.subView[0].title }));
            }
          }}
        />
      </div>
    );
  }
  if (item.key === "EN01T01N") {
    return (
      <div className="event-wrapper">
        {Object.keys(item?.subView[0]).map((draggedItemEdited, index) => {
          return (
            <input
              className="eventInput"
              key={index}
              value={item.subView[0][draggedItemEdited].text}
              name={draggedItemEdited}
              onChange={(e) => {
                tileBodyChangeHandler(e);
              }}
              readOnly={focus}
              onFocus={() => {
                setFocus(false);
              }}
              onBlur={() => {
                setFocus(true);
                dispatch(
                  JSONCarddata({ data: item.subView[0][draggedItemEdited] })
                );
              }}
            />
          );
        })}
      </div>
    );
  }

  if (item.key === "EN01OptionType4") {
    return (
      <div className="groupEvent_Wrapper event-wrapper">
        {item.subView[0].options.map((checkboxItem, index) => {
          return (
            <input
              className="eventInput"
              key={index}
              value={checkboxItem.text}
              name={checkboxItem.textKey}
              onChange={(e) => {
                dispatch(action.checkBoxComponentValUpdate({ e, id: item.id }));
              }}
              readOnly={focus}
              onFocus={() => {
                setFocus(false);
              }}
              onBlur={() => {
                setFocus(true);
                dispatch(JSONCarddata({ data: checkboxItem }));
              }}
            />
          );
        })}
      </div>
    );
  }
};

export default CareCardEvent;
