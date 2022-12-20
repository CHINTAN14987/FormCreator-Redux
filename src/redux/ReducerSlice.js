import { createSlice } from "@reduxjs/toolkit";
import data from "../data";
import uuid from "react-uuid";
const initialState = data;

const reducerSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    dragRawTile: (state, action) => {
      const { e, item, length, Key } = action.payload;
      const dt = e.dataTransfer;
      if (length >= 2 && item.id === Key) {
        dt.setData("text/plain", JSON.stringify());
        return state;
      } else {
        dt.setData("text/plain", JSON.stringify(item));
        return state;
      }
    },
    customComponent: (state, action) => {
      const { e, length } = action.payload;

      const dt = e.dataTransfer;
      const text = dt.getData("text/plain");
      const data = JSON.parse(text);

      if (
        data.subView[0].hasOwnProperty("title") &&
        !data.subView[0].hasOwnProperty("subTitle") &&
        !data.subView[0].hasOwnProperty("options") &&
        !data.subView[0].hasOwnProperty("body")
      ) {
        if (data.id === "EN01BottomButtonBack") {
          const newData = {
            ...data,
            key: uuid(),
            isDraggableButton: true,
            subView: [
              {
                ...data.subView[0],
                title: {
                  ...data.subView[0].title,
                  textKey: data.subView[0].title.textKey,
                },
              },
            ],
          };

          state.taskList[0].tasks.push(newData);
        } else if (data.id === "EN01BottomButton1") {
          const newData = {
            ...data,
            key: uuid(),
            isDraggableSubmitButton: true,
            subView: [
              {
                ...data.subView[0],
                title: {
                  ...data.subView[0].title,
                  textKey: data.subView[0].title.textKey,
                },
              },
            ],
          };

          state.taskList[0].tasks.push(newData);
        } else {
          const newData = {
            ...data,
            key: uuid(),
            subView: [
              {
                ...data.subView[0],
                title: {
                  ...data.subView[0].title,
                  textKey:
                    length === 0
                      ? data.subView[0].title.textKey
                      : data.subView[0].title.textKey.substring(
                          0,
                          data.subView[0].title.textKey.length
                        ) + length,
                },
              },
            ],
            isDraggable: true,
          };
          state.taskList[0].tasks.push(newData);
        }
      } else if (data.subView[0].hasOwnProperty("subTitle")) {
        const newData = {
          ...data,
          key: uuid(),
          subView: [
            {
              ...data.subView[0],
              title: {
                ...data.subView[0].title,
                textKey:
                  length === 0
                    ? data.subView[0].title.textKey
                    : data.subView[0].title.textKey.substring(
                        0,
                        data.subView[0].title.textKey.length
                      ) + length,
              },
              subTitle: {
                ...data.subView[0].subTitle,
                textKey:
                  length === 0
                    ? data.subView[0].subTitle.textKey
                    : data.subView[0].subTitle.textKey.substring(
                        0,
                        data.subView[0].subTitle.textKey.length
                      ) + length,
              },
            },
          ],
          isDraggable: true,
        };

        state.taskList[0].tasks.push(newData);
      } else if (data.subView[0].hasOwnProperty("options")) {
        const newData = {
          ...data,
          key: uuid(),
          subView: [
            {
              ...data.subView[0],
              options: data.subView[0].options.map((item) => {
                return {
                  ...item,
                  textKey:
                    length === 0
                      ? item.textKey
                      : item.textKey.substring(0, item.textKey.length) + length,
                };
              }),
            },
          ],
          isDraggable: true,
        };

        state.taskList[0].tasks.push(newData);
      } else {
        const newData = {
          ...data,
          key: uuid(),
          subView: [
            {
              ...data.subView[0],
              title: {
                ...data.subView[0].title,
                textKey:
                  length === 0
                    ? data.subView[0].title.textKey
                    : data.subView[0].title.textKey.substring(
                        0,
                        data.subView[0].title.textKey.length
                      ) + length,
              },
              body: data.subView[0].body.map((item) => {
                return {
                  ...item,
                  textKey:
                    length === 0
                      ? item.textKey
                      : item.textKey.substring(0, item.textKey.length) + length,
                };
              }),
            },
          ],
          isDraggable: true,
        };

        state.taskList[0].tasks.push(newData);
      }
    },
    dragCustomComp: (state, action) => {
      const { e, item } = action.payload;
      const dt = e.dataTransfer;
      dt.setData("text/plain", JSON.stringify(item));
      return state;
    },
    deleteCustomComp: (state, action) => {
      const { e } = action.payload;

      const dt = e.dataTransfer;
      const text = dt.getData("text/plain");
      const data = JSON.parse(text);

      return {
        ...state,
        taskList: [
          {
            ...state.taskList[0],
            tasks: state.taskList[0].tasks.filter(
              (item) => item.key !== data.key
            ),
          },
          state.taskList[1],
        ],
      };
    },
    componentUpdateTileVal: (state, action) => {
      const updatedData = state.taskList[0].tasks.map((item) => {
        if (item.key === action.payload.key) {
          return {
            ...item,
            subView: [
              {
                ...item.subView[0],
                title: { ...item.subView[0].title, text: action.payload.data },
              },
            ],
          };
        } else {
          return item;
        }
      });

      return {
        ...state,
        taskList: [
          {
            ...state.taskList[0],

            tasks: updatedData,
          },
          state.taskList[1],
        ],
      };
    },
    componentupdatetitleTitleBody: (state, action) => {
      const { e } = action.payload;
      const updatedData = state.taskList[0].tasks.map((item) => {
        if (item.key === action.payload.key) {
          return {
            ...item,
            subView: [
              {
                ...item.subView[0],
                [e.target.name]: {
                  ...item.subView[0][e.target.name],
                  text: e.target.value,
                },
              },
            ],
            tilePosition: action.payload.tilePosition,
          };
        } else {
          return item;
        }
      });

      return {
        ...state,
        taskList: [
          {
            ...state.taskList[0],

            tasks: updatedData,
          },
          state.taskList[1],
        ],
      };
    },
    checkBoxComponentValUpdate: (state, action) => {
      const { e, key } = action.payload;
      const updatedData = state.taskList[0].tasks.map((item) => {
        if (item.key === key) {
          const newdata = item.subView[0].options.map((newI) => {
            if (newI.textKey === e.target.name) {
              return { ...newI, text: e.target.value };
            }
            return newI;
          });

          return {
            ...item,
            subView: [
              {
                ...item.subView[0],
                options: newdata,
              },
            ],
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        taskList: [
          {
            ...state.taskList[0],

            tasks: updatedData,
          },
          state.taskList[1],
        ],
      };
    },
    componentUpdatetileContact: (state, action) => {
      const { e, key } = action.payload;

      const updatedData = state.taskList[0].tasks.map((item) => {
        if (item.key === key) {
          const bodyData = item.subView[0].body.map((newItem) => {
            if (newItem.textKey === e.target.name) {
              return { ...newItem, text: e.target.value };
            }
            return newItem;
          });

          return {
            ...item,
            subView: [
              {
                ...item.subView[0],
                body: bodyData,
              },
            ],
          };
        } else {
          return item;
        }
      });

      return {
        ...state,
        taskList: [
          {
            ...state.taskList[0],

            tasks: updatedData,
          },
          state.taskList[1],
        ],
      };
    },
    dragDropCustomComponent: (state, action) => {
      const { e, item } = action.payload;

      const findItemIndex = state.taskList[0].tasks.findIndex((dragItem) => {
        return dragItem.key === item.key;
      });

      const dt = e.dataTransfer;
      const text = dt.getData("text/plain");
      const data = JSON.parse(text);
      const sourceItemIndex = state.taskList[0].tasks.findIndex((item) => {
        return item.key === data.key;
      });

      state.taskList[0].tasks.splice(sourceItemIndex, 1);
      const newDestinationGroupTasks = state.taskList[0].tasks.splice(
        findItemIndex,
        0,
        data
      );

      state = {
        ...state,
        taskList: [
          {
            ...state.taskList[0],

            tasks: newDestinationGroupTasks,
          },
          state.taskList[1],
        ],
      };
    },
    cardClickValue: (state, action) => {
      state.cardClickItem = action.payload.item;
      return state;
    },
    checkBoxComponentlUpdate: (state, action) => {
      const { e, key } = action.payload;

      const updatedData = state.taskList[0].tasks.map((item) => {
        if (item.key === key) {
          const newdata = item.subView[0].options.map((newI) => {
            if (newI.textKey === e.target.name) {
              return { ...newI, text: e.target.value };
            }
            return newI;
          });

          return {
            ...item,
            subView: [
              {
                ...item.subView[0],
                options: newdata,
              },
            ],
          };
        } else {
          return item;
        }
      });

      return {
        ...state,
        taskList: [
          {
            ...state.taskList[0],

            tasks: updatedData,
          },
          state.taskList[1],
        ],
      };
    },
  },
});
export const action = reducerSlice.actions;
export default reducerSlice.reducer;
