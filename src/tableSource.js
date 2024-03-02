export const resultsColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "date",
      headerName: "Date",
      width: 160,
      renderCell: (params) => {
        const { date } = params.row;
        if (date && date.seconds) {
          const jsDate = new Date(date.seconds * 1000);
          return (
            <div className="cellWithImg">
              {jsDate.toLocaleDateString()}
            </div>
          );
        } else {
          return (
            <div className="cellWithImg">
              {params.row.date}
            </div>
          );
        }
      },
    },
    {
      field: "cholesterol",
      headerName: "Cholesterol",
      width: 160,
    },
  
    {
      field: "hdl",
      headerName: "HDL-Cholesterol",
      width: 160,
    },
    {
      field: "ldl",
      headerName: "LDL-Cholesterol",
      width: 160,
    },
    {
      field: "triglycerides",
      headerName: "Triglycerides",
      width: 160,
    },
    {
      field: "note",
      headerName: "Note",
      width: 200,
    },
  ];