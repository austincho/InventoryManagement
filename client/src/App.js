import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DataTable from './components/DataTable';
import Form from './components/Form';
import Button from '@mui/material/Button';

function App() {
  const [inventory, setInventory] = useState([]);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [fileDownloadUrl, setFileDownloadUrl] = useState("");
  const doDownload = useRef(null);
  
  useEffect(() => {
    axios.get('/api/item/').then((res) => {
      setInventory(res.data);
    });
  }, []);

  const addItemToInventory = (item) => {
    setInventory([...inventory, item]);
  }

  const editItemInInventory = (success, newItem) => {
    if (success) {
      const newInventory = inventory.map(oldItem => {
        if (oldItem._id === newItem._id){
          return newItem;
        } else {
          return oldItem;
        }
    });
      setInventory(newInventory);
    }
  }

  const removeItemFromInventory = (id) => {
    setInventory(inventory.filter(item => item._id !== id));
  }

  const openAddItemForm = () => {
    setOpenAddForm(true);
  }

  const closeAddItemForm = () => {
    setOpenAddForm(false);
  }

  const downloadCsvButton = () => {
    const headers = {
      'Content-Type': 'text/csv',
    }
    axios.get('/api/item/csv', headers).then(async (res) => {
      const blob = new Blob([res.data], {type: res.headers["content-disposition"]});
      const fileURl = URL.createObjectURL(blob);
      setFileDownloadUrl(fileURl);
      doDownload.current.click();
    });
  }

  return (
    <div className="App">
      <div>
      <h2 style={{textAlign : "center"}}>Inventory Management</h2>
      <Button onClick={openAddItemForm} variant="contained" style={{ marginBottom: "1rem"}}>Add Item</Button>
      </div>

      <DataTable inventory={inventory}  removeItemFromInventory={removeItemFromInventory} editItemInInventory={editItemInInventory}/>
      {openAddForm && <Form handleClose={closeAddItemForm} open={openAddForm} addItemToInventory={addItemToInventory} edit={false}/>}
      <Button onClick={downloadCsvButton} variant="contained" color="success" style={{ marginTop: "1rem"}}>Download CSV</Button>
      <a style={{display: "none"}}
         download={"inventory.csv"}
         href={fileDownloadUrl}
         ref={doDownload}
    >download it</a>
    </div>
  );
}

export default App;
