import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from './components/DataTable';
import Form from './components/Form';
import Button from '@mui/material/Button';

function App() {
  const [inventory, setInventory] = useState([]);
  const [openAddForm, setOpenAddForm] = useState(false);

  useEffect(() => {
    axios.get('/api/item/').then((res) => {
      setInventory(res.data);
    });
  }, []);

  function addItemToInventory(item) {
    setInventory([...inventory, item]);
  }

  function editItemInInventory(success, newItem) {
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

  function removeItemFromInventory(id) {
    setInventory(inventory.filter(item => item._id !== id));
  }

  function openAddItemForm() {
    setOpenAddForm(true);
  }

  function closeAddItemForm() {
    setOpenAddForm(false);
  }
  
  return (
    <div className="App">
      <div>
      <h2 style={{textAlign : "center"}}>Inventory Management</h2>
      <Button onClick={openAddItemForm} variant="contained" style={{ marginBottom: "1rem"}}>Add Item</Button>
      </div>

      <DataTable inventory={inventory}  removeItemFromInventory={removeItemFromInventory} editItemInInventory={editItemInInventory}/>
      {openAddForm && <Form handleClose={closeAddItemForm} open={openAddForm} addItemToInventory={addItemToInventory} edit={false}/>}
      <Button variant="contained" color="success" style={{ marginTop: "1rem"}}>Print CSV</Button>
    </div>
  );
}

export default App;
