import "./CareCard.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { action } from "../redux/ReducerSlice";
import Tile from "./Tile/Tile";
import Properties from "./properties/Properties";
import Event from "./Event/Event";
import { JSONValUpdate } from "../redux/JsonTransFormationSlice";
import CardPreview from "../CardPreview/CardPreview";

function CareCard() {
  const formvalue = useSelector((state) => state.UserReducer.taskList[1].tasks);
  const DragValue = useSelector((state) => state.UserReducer.taskList[0].tasks);
  const [isDragging, setIsDragging] = useState(false);
  const JSONData = useSelector((state) => state.JsonTransFormationReducer);
  const [itemDisplay, setItemDisplay] = useState(false);
  const [dragRow, setDragRow] = useState(false);
  const disptach = useDispatch();
  const [EventsProperties, setEventProperties] = useState(false);
  const [dragItem, setDragItem] = useState({});
  const [JSOnvalue, setJSonValue] = useState(false);
  const [cardPreview, setCardPreview] = useState(false);

  const finalFilteredData = DragValue.filter(
    (item) =>
      item.key !== "EN01BottomButtonBack" && item.key !== "EN01BottomButton1"
  );
  const finalFilteredButton = DragValue.filter(
    (item) =>
      item.key === "EN01BottomButtonBack" || item.key === "EN01BottomButton1"
  );
  const dragStartHandler = (e, item) => {
    setItemDisplay(true);
    setIsDragging(false);
    setDragRow(false);
    const filteredBackButton = DragValue.filter(
      (item) => item.key === "EN01BottomButtonBack"
    );

    const filteredSubmitButton = DragValue.filter(
      (item) => item.key === "EN01BottomButton1"
    );
    if (item.key === "EN01BottomButtonBack") {
      disptach(
        action.dragRawTile({
          e,
          item,
          length: filteredBackButton.length + 1,
          buttonKey: "EN01BottomButtonBack",
        })
      );
    } else if (item.key === "EN01BottomButton1") {
      disptach(
        action.dragRawTile({
          e,
          item,
          length: filteredSubmitButton.length + 1,
          buttonKey: "EN01BottomButton1",
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
  };

  const dropHandler = (e) => {
    const filter = DragValue.filter((item) => item.key === dragItem.key);

    e.preventDefault();

    if (itemDisplay) {
      setIsDragging(true);
      disptach(action.customComponent({ e, length: filter.length }));
    }
    setDragRow(true);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const dragHandler = (e, item) => {
    disptach(action.dragCustomComp({ e, item }));

    // setTimeout(() => (e.target.className += " invisible"), 0);
    setItemDisplay(false);
    setIsDragging(false);
  };

  const DropBackHandler = (e) => {
    disptach(action.deleteCustomComp({ e }));
    setDragRow(false);
    // setTimeout(() => (e.target.className += " visible"), 0);
  };
  const RowDraghandler = (e, item) => {
    if (dragRow) {
      disptach(action.dragDropCustomComponent({ e, item }));
    }
  };
  const previewClickHanlder = (key) => {
    setCardPreview(key === "EN01BottomButton1" ? true : false);
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
            {formvalue.map((item, index) => {
              return (
                <div
                  key={index}
                  id={item.subtype}
                  draggable="true"
                  onDragStart={(e) => {
                    dragStartHandler(e, item);
                  }}
                  // className={`${dragPos ? "dragstart" : ""}`}
                >
                  <Tile item={item} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="drop_wrapper">
          <div className="drop_cardContainer">
            <h3 className="heading">Care.Card</h3>
            {cardPreview ? (
              <CardPreview
                DragCard={() => {
                  setCardPreview(false);
                }}
              />
            ) : (
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
                      } ${
                        item?.isDraggablePreviewButton
                          ? "previewCustomButtom"
                          : ""
                      }`}
                      draggable="true"
                      onDragStart={(e) => {
                        dragHandler(e, item);
                      }}
                      key={item.id}
                      style={{ minWidth: "10rem" }}
                      onDragOver={(e) => dragOverHandler(e)}
                      onDrop={(e) => {
                        RowDraghandler(e, item);
                      }}
                      onClick={() => {
                        item?.subView[0]?.title?.text.toUpperCase() ===
                          "PREVIEW" && previewClickHanlder(item.key);
                      }}
                    >
                      <Tile item={item} />
                    </div>
                  );
                })}
              </div>
            )}
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
          onClick={() => {
            disptach(
              JSONValUpdate({
                finalFilteredData: finalFilteredData,
                finalFilteredButton: finalFilteredButton,
              })
            );
            setJSonValue(!JSOnvalue);
          }}
        >
          Show JSON Data
        </button>
        {JSOnvalue && <pre>{JSON.stringify(JSONData, undefined, 2)}</pre>}
      </div>
    </div>
  );
}

export default CareCard;
