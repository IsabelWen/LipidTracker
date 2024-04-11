export const resultsInputs = [
    {
      id: "date",
      label: "Date",
      type: "date",
      placeholder: "Test Result Date",
      required: true
    },
    {
      id: "cholesterol",
      label: "Cholesterol",
      unitLabel: "(mg/ml)",
      type: "number",
      min: 0,
      max: 1500,
      placeholder: "Cholesterol",
    },
    {
      id: "hdl",
      label: "HDL-Cholesterol",
      unitLabel: "(mg/ml)",
      type: "number",
      step: "0.1",
      min: 0,
      max: 500,
      placeholder: "HDL-Cholesterol between (example: 39.3)",
    },
    {
      id: "ldl",
      label: "LDL-Cholesterol",
      unitLabel: "(mg/ml)",
      type: "number",
      min: 0,
      max: 1500,
      placeholder: "LDL-Cholesterol",
    },
    {
      id: "triglycerides",
      label: "Triglycerides",
      unitLabel: "(mg/ml)",
      type: "number",
      min: 0,
      max: 10000,
      placeholder: "Triglycerides"
    },
    {
      id: "note",
      label: "Note",
      type: "text",
      maxLength: 100,
      placeholder: "Type in additional information, such as changes in medication or dietery."
    },
  ];