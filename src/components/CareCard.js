import "./CareCard.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { action } from "../redux/ReducerSlice";
import Tile from "./Tile/Tile";
import Properties from "./properties/Properties";
import Event from "./Event/Event";
import { JSONValUpdate, JSONCardKeys } from "../redux/JsonTransFormationSlice";
import { BellOutlined } from "@ant-design/icons";
import {
  filteredDataHelperFunc,
  filteredDataHelperFunc1,
  filteredDataHelperFunc2,
} from "./helperfunctions";
import Portal from "./Portal/Portal";

function CareCard() {
  const formvalue = useSelector((state) => state.UserReducer.taskList[1].tasks);
  const DragValue = useSelector((state) => state.UserReducer.taskList[0].tasks);
  const [isDragging, setIsDragging] = useState(false);
  const [itemDisplay, setItemDisplay] = useState(false);
  const [dragRow, setDragRow] = useState(false);
  const disptach = useDispatch();
  const [EventsProperties, setEventProperties] = useState(false);
  const [dragItem, setDragItem] = useState({});
  const [openPortal, setOpenPortal] = useState(false);
  const [dragBackCustomTile, setDragBackCustomTile] = useState({});

  const dragStartHandler = (e, item) => {
    setItemDisplay(true);
    setIsDragging(false);
    setDragRow(false);

    if (item.id === "EN01BottomButtonBack") {
      disptach(
        action.dragRawTile({
          e,
          item,
          length:
            filteredDataHelperFunc(DragValue, "EN01BottomButtonBack").length +
            1,
          Key: "EN01BottomButtonBack",
        })
      );
    } else if (item.id === "EN01BottomButton1") {
      disptach(
        action.dragRawTile({
          e,
          item,
          length:
            filteredDataHelperFunc(DragValue, "EN01BottomButton1").length + 1,
          Key: "EN01BottomButton1",
        })
      );
    } else if (item.id === "EN01T00N") {
      disptach(
        action.dragRawTile({
          e,
          item,
          length: filteredDataHelperFunc(DragValue, "EN01T00N").length + 1,
          Key: "EN01T00N",
        })
      );
    } else {
      disptach(
        action.dragRawTile({
          e,
          item,
        })
      );
    }
    setDragItem(item);
    disptach(action.cardClickValue({ item: null }));
  };

  const dropHandler = (e) => {
    const filter = DragValue.filter((item) => item.id === dragItem.id);
    e.preventDefault();
    if (itemDisplay) {
      setIsDragging(true);
      disptach(action.customComponent({ e, length: filter.length }));
    }
    setDragRow(true);
    disptach(action.cardClickValue({ item: null }));
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const dragHandler = (e, item) => {
    disptach(action.dragCustomComp({ e, item }));
    setDragBackCustomTile(item);
    // setTimeout(() => (e.target.className += " invisible"), 0);
    setItemDisplay(false);
    setIsDragging(false);
  };

  const DropBackHandler = (e) => {
    disptach(action.deleteCustomComp({ e }));
    disptach(action.cardClickValue({ item: null }));
    setDragRow(false);
    disptach(JSONCardKeys({ data: dragBackCustomTile }));
    // setTimeout(() => (e.target.className += " visible"), 0);
  };
  const RowDraghandler = (e, item) => {
    if (dragRow) {
      disptach(action.dragDropCustomComponent({ e, item }));
      // setCardItemClicked(true);
    }
  };
  // const previewClickHanlder = () => {
  //   setCardPreview(!cardPreview);
  // };

  const careCardJSONUpdateHandler = () => {
    setOpenPortal(true);
    disptach(
      JSONValUpdate({
        finalFilteredData: filteredDataHelperFunc1(
          DragValue,
          "EN01BottomButtonBack",
          "EN01BottomButton1"
        ),
        finalFilteredButton: filteredDataHelperFunc2(
          DragValue,
          "EN01BottomButtonBack",
          "EN01BottomButton1"
        ),
      })
    );
  };
  return (
    <div className="mainContainer">
      <div className="App">
        <div className="rawDragTiles">
          <h3 className="heading">Tiles</h3>
          <div
            className="rawDragtiles_inner"
            onDrop={(e) => DropBackHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
          >
            {formvalue.map((item) => {
              return (
                <div
                  key={item.key}
                  draggable="true"
                  onDragStart={(e) => {
                    dragStartHandler(e, item);
                  }}
                >
                  <Tile item={item} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="drop_wrapper">
          <BellOutlined className="bellIcon" />
          <button className="userIcon"></button>
          <div className="drop_cardContainer">
            <div
              className="Drop_InnerWrapper"
              onDrop={(e) => {
                dropHandler(e);
              }}
              onDragOver={(e) => dragOverHandler(e)}
            >
              {DragValue.map((item) => {
                return (
                  <div
                    className={`customcomp ${
                      item?.isDraggableButton ? "buttonCustom" : ""
                    } ${item?.isDraggableSubmitButton ? "submitButton" : ""}`}
                    draggable="true"
                    onDragStart={(e) => {
                      dragHandler(e, item);
                    }}
                    key={item.key}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => {
                      RowDraghandler(e, item);
                    }}
                    onClick={() => {
                      // CardItemClickHanlder(item);

                      disptach(action.cardClickValue({ item }));
                    }}
                  >
                    <Tile item={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="RightCom">
          <div className="PropertiesEventsContainer">
            <div
              className="inner"
              onClick={(e) => {
                setEventProperties(false);
              }}
            >
              Properties
            </div>

            <div
              onClick={(e) => {
                setEventProperties(true);
              }}
            >
              Events
            </div>
          </div>
          <div className="eventhandle_Wrapper">
            {DragValue.length ? (
              <React.Fragment>
                {!EventsProperties ? (
                  <Event draggableTaskEvent={DragValue} />
                ) : (
                  <Properties />
                )}
              </React.Fragment>
            ) : (
              <p className="eventDefaultContainer">
                Edit the Card Values from here, Drag the Tile...!
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="Json">
        <button
          className="jsonDisplayButton"
          onClick={careCardJSONUpdateHandler}
        >
          Show JSON Data
        </button>
        {openPortal && (
          <Portal
            closePortal={() => {
              setOpenPortal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default CareCard;
