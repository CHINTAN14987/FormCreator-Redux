import uuid from "react-uuid";

const data = {
  taskList: [
    {
      groupName: "Drag",
      tasks: [],
    },
    {
      groupName: "Drop",
      tasks: [
        {
          id: uuid(),
          key: "EN01T00N",
          isSearchable: false,
          subView: [{ title: { text: "title", textKey: "00t1v1" } }],
          order: 1,
          type: "CONTAINER",
          uiAction: "",
        },
        {
          id: uuid(),
          key: "EN01T01N",
          isSearchable: false,
          subView: [
            {
              title: {
                textKey: "00t1v2",
                text: "Title",
              },
              subTitle: {
                textKey: "00t1v3",
                text: "subTitle",
              },
            },
          ],
          order: 1,
          type: "CONTAINER",
          uiAction: "",
        },
        {
          key: "EN01OptionType4",
          id: uuid(),
          isSearchable: false,
          subView: [
            {
              title: {
                text: "",
              },
              options: [
                {
                  text: "appointmentTime",
                  textKey: "00t1v4",
                },
                {
                  text: "appointmentTime",
                  textKey: "00t1v5",
                },
                {
                  text: "appointmentTime",
                  textKey: "00t1v6",
                },
              ],
            },
          ],
          order: 3,
          type: "CONTAINER",
          uiAction: "",
        },
        {
          id: uuid(),
          key: "EN01TTA00RH",
          isSearchable: false,
          subView: [
            {
              title: {
                textKey: "00t1v7",
                text: "title",
              },
              body: [
                {
                  textKey: "00t1v8",
                  text: "subTitle",
                },
                {
                  text: "$patientMobilePhone",
                  textKey: "00t1v9",
                  keyboard: "phone",
                },
              ],
            },
          ],
          order: 1,
          type: "CONTAINER",
          uiAction: "",
        },
        {
          key: "EN01BottomButtonBack",
          id: uuid(),
          isSearchable: false,
          subView: [
            {
              title: {
                text: "",
              },
            },
          ],
          order: 1,
          type: "BACK_BUTTON",
          uiAction: "${action2}",
        },
        {
          key: "EN01BottomButton1",
          id: uuid(),
          isSearchable: false,
          subView: [
            {
              title: {
                text: "Preview",
                textKey: "00f1v1",
              },
            },
          ],
          order: 2,
          type: "BUTTON",
          uiAction: "action1",
        },
      ],
    },
  ],
};
export default data;
