import "./resultstable.scss";
import Update from "../update/update";
import { resultsColumns } from "../../tableSource";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase"
import { AuthContext } from "../../context/authContext";

// MUI imports
import { DataGrid } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const Resultstable = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const {currentUser} = useContext(AuthContext)
  const user = currentUser;
  const userUID = user.uid;

  // Get users test results
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

  // Function to handle open delete confirmation modal
  const handleConfirmation = async (id) => {
    setSelectedId(id);
    setConfirm(true);
  }

  // Function to Delete test results
  const handleDelete = async () => {
    try{
      await deleteDoc(doc(db, "results", selectedId));
      setData(data.filter((item) => item.id !== selectedId));
      setConfirm(false);
    }catch(err){
      console.log(err);
    }
  };

  // Function to handle open update dialog
  const handleUpdate = async (id) => {
    setSelectedId(id);
    setOpen(true);
  }

  // Function to handle close update dialog
  const handleClose = () => {
    setOpen(false);
  };

  const buttonsColumn = [
    {
      field: "buttons",
      headerName: "Actions",
      width: 140,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="cellButtons">
            <div
              className="deleteButton"
              onClick={() => handleConfirmation(params.row.id)}
            >
              Delete
            </div>
            <Dialog open={confirm} onClose={() => setConfirm(false)} aria-labelledby="dialog-confirm-delete">
              <DialogTitle>
                {"Delete Test Result"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText >Are you sure you want to delete this test results?</DialogContentText >
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setConfirm(false)}
                  sx={{color:"rgb(99, 99, 99)",
                  '&:hover': {
                    backgroundColor: 'rgba(99, 99, 99, 0.1)',
                  }}}
                  autoFocus>
                    Cancel
                </Button>
                <Button
                  onClick={() => handleDelete(params.row.id)}
                  sx={{color:"rgb(170, 12, 12)",
                  '&:hover': {
                    backgroundColor: 'rgba(170, 12, 12, 0.1);',
                  }}}>
                    Delete
                </Button>
              </DialogActions>
            </Dialog>

            <div
              className="updateButton"
              onClick={() => handleUpdate(params.row.id)}
            >
              Update
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="content">
        <div className="title">
            Test Results
            <Link to="/results/newresults" className="link">
                Add Test Result
            </Link>
        </div>
        <DataGrid
            className="datagrid"
            rows={data}
            columns={resultsColumns.concat(buttonsColumn)}
            pageSize={10}
            disableColumnMenu 
            initialState={{
                sorting: {
                    sortModel: [{ field: 'date', sort: 'desc' }],
                },
            }}
        />
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
          <Update id={selectedId} handleClose={handleClose}></Update>
        </Dialog>
    </div>
  );
};

export default Resultstable;