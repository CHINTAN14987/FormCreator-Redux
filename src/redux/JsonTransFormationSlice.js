import { createSlice, current } from "@reduxjs/toolkit";
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
  },
});
export const { JSONValUpdate, JSONCarddata } = JsonTransFormationSlice.actions;
export default JsonTransFormationSlice.reducer;
