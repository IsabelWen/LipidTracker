export const resultsInputs = [
    {
      id: "date",
      date: "Date",
      type: "date",
      placeholder: "Test Result Date",
    },
    {
      id: "cholesterol",
      label: "Cholesterol",
      type: "number",
      max: 1000,
      placeholder: "Cholesterol",
    },
    {
      id: "hdl",
      label: "HDL-Cholesterol",
      type: "number",
      step: "0.1",
      max: 120,
      placeholder: "HDL-Cholesterol",
    },
    {
      id: "ldl",
      label: "LDL-Cholesterol",
      type: "number",
      max: 1000,
      placeholder: "LDL-Cholesterol",
    },
    {
      id: "triglycerides",
      label: "Triglycerides",
      type: "number",
      max: 1500,
      placeholder: "Triglycerides"
    },
    {
      id: "note",
      label: "Note",
      type: "text",
      maxlength: 100,
      placeholder: "Type in additional information, such as changes in medication or dietery."
    },
  ];