export const filteredDataHelperFunc = (value, tileId) => {
  if (tileId === "EN01T00N") {
    return value.filter((item) => item.id === tileId);
  } else if ((tileId = "EN01BottomButton1")) {
    return value.filter((item) => item.id === tileId);
  } else if (tileId === "EN01BottomButtonBack") {
    return value.filter((item) => item.id === tileId);
  } else return;
};

export const filteredDataHelperFunc1 = (value, tileID1, tileId2) => {
  return value.filter((item) => item.id !== tileID1 && item.id !== tileId2);
};
export const filteredDataHelperFunc2 = (value, tileID1, tileId2) => {
  return value.filter((item) => item.id === tileID1 || item.id === tileId2);
};
