
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHead, TableRow, TableCell, Button } from '@mui/material';
import axiosInstance from '../utils/axios';
import { Modal } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [Image, setImage] = useState('');
  const [open, setOpen] = useState(false);
  const [approveStatus, setApproveStatus] = useState(false);
  const [rejectStatus, setRejectStatus] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // Function to handle opening the modal
  const handleOpen = (item, imgType) => {
    setOpen(true);
    setImage(item[imgType]);
  };

  // Function to handle closing the modal
  const handleClose = () => {
    setOpen(false);
  };

  // Fetch users data
  const fetchUsers = async () => {
    try {
      const result = await axiosInstance.get('/user/getUsers');
      setUsers(result.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

const handleStatus =(id,status)=>{

  setUsers(users.map((user)=>{
    if(user._id === id){
      user.status = status

    }
    return user
  }))

}

 

  return (
    <div>
      <div style={{ width: '100%', backgroundColor: 'purple', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h3>Banking Application</h3>
          <span style={{ marginLeft: '1000px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Logout
            </Link>
          </span>
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Nominee</TableCell>
            <TableCell>Aadharcard</TableCell>
            <TableCell>Pancard</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.mobile}</TableCell>
              <TableCell>{item.nominee}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(item, 'aadharcard')} variant="contained">
                  Aadharcard
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(item, 'pancard')} variant="contained">
                  Pancard
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={item?.status === "rejected" ? true :false }
                  onClick={()=>handleStatus(item._id,"approved")}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  disabled={item?.status === "approved" ? true :false}
                  onClick={()=>handleStatus(item._id,"rejected")}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <img style={{ width: '100%' }} src={Image} />
        </Box>
      </Modal>
    </div>
  );
};

export default Dashboard;






















          



   
     

           
