export const formQuestions = [
  {
    question: "Title",
    inputType: "text",
    placeholder: "Enter Title",
    key: "title",
    required: true,
  },
  {
    question: "Description",
    inputType: "text",
    key: "desc",
    required: false,
    placeholder: "Enter Description",
  },
  {
    question: "Status",
    inputType: "select",
    key: "status",
    required: true,
    option: [
      { label: "To do", value: "todo" },
      { label: "In progress", value: "inprogress" },
      { label: "Done", value: "done" },
    ],
    placeholder: "Select Status",
  },
  {
    question: "Start date",
    inputType: "datepicker",
    key: "startdate",
    required: false,
    placeholder: "Select your start date",
  },
  {
    question: "End date",
    inputType: "datepicker",
    key: "enddate",
    required: false,
    placeholder: "Select your end date",
  },
];

export const checkEmptyObject = (object) => {
  return Object.keys(object).length === 0;
};

export const capitalizeFirstChar = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};
