// src/App.js

import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Modal } from '@mui/material';

import RegisterModal from '../components/RegisterModal';
import { useMediaQuery } from '@mui/material';
const App = () => {
  const [modalOpen, setModalOpen] = useState(true);

  const handleClose = () => {
    setModalOpen(false);
  };
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleProceed = () => {
    window.location.hash='/login';
  };

  useEffect(() => {
    setModalOpen(true);
  }, []);
  const modalStyle = {
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

  const isRightScreen = useMediaQuery('(max-width:900px)');
  const isWholeScreen = useMediaQuery('(max-width:1200px)');
  return (
    <>
      <Container  sx={{ display: 'flex', alignItems: "center",
        justifyContent: "center", width: '100%', padding: '10%' }}>
       
        <Box sx={{ width: '50%', marginTop: '-10%' }}>
         <Typography variant='h2' color='primary' fontWeight='bold' textAlign="center">chatAI</Typography>
            {/*<Typography variant='h5' color='#424242' sx={{ width: '80%' }} fontWeight='bold'>Connect with friends and the world around you through the facebook</Typography>*/}
           
          <RegisterModal></RegisterModal>
        </Box>
      </Container>
    </>
  );
};
 
export default App;
