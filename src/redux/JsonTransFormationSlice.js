import { createSlice } from "@reduxjs/toolkit";
import cardData from "../card.json";

const initialState = { CareCardData: cardData };

const JsonTransFormationSlice = createSlice({
  name: "JSON",
  initialState,
  reducers: {
    JSONValUpdate: (state, action) => {
      const { finalFilteredData, finalFilteredButton } = action.payload;

      return {
        ...state,
        CareCardData: {
          ...state.CareCardData,
          cardLayout: {
            ...state.CareCardData.cardLayout,
            body: [
              {
                ...state.CareCardData.cardLayout.body[0],
                tileComponent: [...finalFilteredData],
              },
            ],
            footer: {
              ...state.CareCardData.cardLayout.footer,
              menu: [...finalFilteredButton],
            },
          },
        },
      };
    },
    JSONCarddata: (state, action) => {
      const {
        data: { text, textKey },
      } = action.payload;

      return {
        ...state,
        CareCardData: {
          ...state.CareCardData,
          cardData: { ...state.CareCardData.cardData, [textKey]: text },
        },
      };
    },
    JSONCardKeys: (state, action) => {
      Object.keys(state.CareCardData.cardData).forEach((i) => {
        if (JSON.stringify(action.payload.data).includes(i)) {
          delete state.CareCardData.cardData[i];
          // delete [i];
        }

        // return state.CareCardData.cardData[i];
      });
      return state;
    },
  },
});
export const { JSONValUpdate, JSONCarddata, JSONCardKeys } =
  JsonTransFormationSlice.actions;
export default JsonTransFormationSlice.reducer;
