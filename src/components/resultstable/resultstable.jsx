import "./resultstable.scss";
import { resultsColumns } from "../../tableSource";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase"

const Resultstable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "results"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setData(list);
      }, (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try{
      await deleteDoc(doc(db, "results", id));
      setData(data.filter((item) => item.id !== id));
    }catch(err){
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
        <div className="title">
            Test Results
            <Link to="/results/newresults" className="link">
                Add Test Result
            </Link>
        </div>
        <DataGrid
            className="datagrid"
            rows={data}
            columns={resultsColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
        />
    </div>
  );
};

export default Resultstable;