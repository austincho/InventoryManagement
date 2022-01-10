import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';
import Form from './Form'

const DataTable = ({inventory, removeItemFromInventory, editItemInInventory}) => {
  const [rowObj, setRowObj] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const editButtonClick = (event) => {
      const row = inventory.filter(item => item._id === event.target.value)[0];
      setRowObj(row);
      setOpenForm(true);
    }

  const onDeleteButtonClick =(event) =>{
      axios.delete(`api/item/delete/${event.target.value}`).then((res) => {
        if (res.data.deleted) {
          removeItemFromInventory(event.target.value);
        }
      });
    }
    return (
      <Paper>
        <TableContainer component={Paper}>
        {openForm && <Form itemObj={rowObj} open={openForm} handleClose={() => {setOpenForm(false)}} edit={true} rerender={false} editItemInInventory={editItemInInventory}/> }
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Arrival Date</TableCell>
              <TableCell align="center">Departure Date</TableCell>
              <TableCell align="center">Owner</TableCell>
              <TableCell align="center">Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            inventory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">{row.arrivalDate.split('T')[0]}</TableCell>
                <TableCell align="center">{row.departureDate.split('T')[0]}</TableCell>
                <TableCell align="center">{row.owner}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" style={{marginRight: "1rem"}} value={row._id} onClick={editButtonClick}>Edit</Button>
                  <Button variant="contained" color="error" value={row._id} onClick={onDeleteButtonClick}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={inventory.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    )
}

export default DataTable;
