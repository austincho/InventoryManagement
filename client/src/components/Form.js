import React, { useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import axios from 'axios';
  
  const Form = (props) => {
    const { open, handleClose, addItemToInventory, editItemInInventory, edit, itemObj} = props;
    const nameConditional = edit ? itemObj.name : "";
    const companyConditional = edit ? itemObj.company : "";
    const quantityConditional = edit ? itemObj.quantity : "";
    const descriptionConditional = edit ? itemObj.description : "";
    const arrivalConditional = edit ? itemObj.arrivalDate.split('T')[0] : new Date().toISOString().split('T')[0];
    const departureConditional = edit ? itemObj.departureDate.split('T')[0] : new Date().toISOString().split('T')[0];

    const [company, setCompany] = useState(companyConditional);
    const [name, setName] = useState(nameConditional);
    const [quantity, setQuantity] = useState(quantityConditional);
    const [description, setDescription] = useState(descriptionConditional);
    const [arrivalDate, setArrivalDate] = useState(arrivalConditional);
    const [departureDate, setDepartureDate] = useState(departureConditional);

    const changeCompany = (e) => {
      setCompany(e.target.value);
    }

    const changeName = (e) => {
        setName(e.target.value);
    }

    const changeArrivalDate = (e) => {
        setArrivalDate(e.target.value);
    }
    
    const changeDepartureDate = (e) => {
        setDepartureDate(e.target.value);
    }

    const changeDescription = (e) => {
        setDescription(e.target.value);
    }

    const changeQuantity = (e) => {
        setQuantity(e.target.value);
    }

    const addSaveButton = (e) => {
        let newItemObj = {
            "name" : name,
            "description" : description,
            "quantity" : quantity,
            "company" : company,
            "arrivalDate" : arrivalDate,
            "departureDate": departureDate,
        }
    
        if (edit) {
            newItemObj._id = itemObj._id;
            axios.put('/api/item/update', newItemObj).then(res => {
                editItemInInventory(res.data.updated, newItemObj);
                handleClose();
            })
        } else {
            axios.post('/api/item/add', newItemObj).then(res => {
                addItemToInventory(res.data)
                handleClose();
                changeCompany("");
                changeName("");
                changeDescription("");
                changeArrivalDate("");
                changeDepartureDate("");
                changeQuantity("");
            })
        }
    }

    return (
      <Dialog onClose={handleClose} open={open}>
        <Box>
          <DialogTitle>
            <h2 style={{textAlign : "center", marginTop: "0", marginBottom: "0"}}>
                {edit ? "Edit Item" : "Add Item"}
            </h2>
          </DialogTitle>
          <DialogContent dividers style={{textAlign : "center"}}>
          <TextField id="filled-basic"label="Name" variant="filled" onChange={changeName} value={name}/>
          <TextField id="filled-basic" label="Description" variant="filled" onChange={changeDescription} value={description}/>
          <TextField id="filled-basic" label="Quantity" type="number" variant="filled" onChange={changeQuantity} value={quantity}/>
          <TextField id="filled-basic" label="Company" variant="filled" onChange={changeCompany} value={company}/>
          <TextField id="filled-basic" label="Arrival Date" type="date" variant="filled" value={arrivalDate} onChange={changeArrivalDate}/>
          <TextField id="filled-basic" label="Departure Date" type="date" variant="filled" value={departureDate} onChange={changeDepartureDate}/>
            <Box style={{textAlign : "center", marginTop: "1rem"}}>
              <Button variant='contained' onClick={addSaveButton} style={{marginRight: "1rem"}}>{edit ? "Save" : "Add"}</Button>
              <Button variant='contained' onClick={handleClose}>Cancel</Button>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    )
  }
  
export default Form;