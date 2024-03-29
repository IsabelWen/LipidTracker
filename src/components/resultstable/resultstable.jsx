import "./resultstable.scss";
import { resultsColumns } from "../../tableSource";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase"
import { auth } from "../../firebase";

const Resultstable = () => {
  const [data, setData] = useState([]);
  const user = auth.currentUser;
  const userUID = user.uid;

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "results"), where("userID", "==", userUID)), (snapShot) => {
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
  }, [userUID]);

  const handleDelete = async (id) => {
    try{
      await deleteDoc(doc(db, "results", id));
      setData(data.filter((item) => item.id !== id));
    }catch(err){
      console.log(err);
    }
  };

  const deleteColumn = [
    {
      field: "delete",
      headerName: "Delete Test Result",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="cellDelete">
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
            columns={resultsColumns.concat(deleteColumn)}
            pageSize={10}
            disableColumnMenu 
            initialState={{
                sorting: {
                    sortModel: [{ field: 'date', sort: 'desc' }],
                },
            }}
        />
    </div>
  );
};

export default Resultstable;