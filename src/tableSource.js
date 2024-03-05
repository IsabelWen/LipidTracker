export const resultsColumns = [
    {
      field: "date",
      headerName: "Date",
      width: 120,
      renderCell: (params) => {
        const { date } = params.row;
        const formatedDate = new Date(date).toLocaleDateString('en-GB');
        return (
          <div>
            {formatedDate}
          </div>
        );
        }
      },
    {
      field: "cholesterol",
      headerName: "Cholesterol",
      type: "number",
      width: 160,
    },
  
    {
      field: "hdl",
      headerName: "HDL-Cholesterol",
      type: "number",
      width: 160,
    },
    {
      field: "ldl",
      headerName: "LDL-Cholesterol",
      type: "number",
      width: 160,
    },
    {
      field: "triglycerides",
      headerName: "Triglycerides",
      type: "number",
      width: 160,
    },
    {
      field: "note",
      headerName: "Note",
      width: 300,
      sortable: false,
    },
  ];