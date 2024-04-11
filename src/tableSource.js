export const resultsColumns = [
    {
      field: "date",
      headerName: "Date",
      width: 100,
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
      width: 140,
    },
  
    {
      field: "hdl",
      headerName: "HDL-Cholesterol",
      type: "number",
      width: 140,
    },
    {
      field: "ldl",
      headerName: "LDL-Cholesterol",
      type: "number",
      width: 140,
    },
    {
      field: "triglycerides",
      headerName: "Triglycerides",
      type: "number",
      width: 140,
    },
    {
      field: "note",
      headerName: "Note",
      width: 250,
      sortable: false,
    },
  ];