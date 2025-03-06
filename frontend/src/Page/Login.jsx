// src/App.js

import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Modal } from '@mui/material';

import LoginModal from '../components/LoginModal';
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
      <Container sx={{ display: 'flex', width: '100%', padding: '10%' }}>
        {isWholeScreen ? '' : (<>
          <Box sx={{ width: '100%', padding: '5%' }}>
            <Typography variant='h2' color='primary' fontWeight='bold'>chatAI</Typography>
            <Typography variant='h5' color='#424242' sx={{ width: '80%' }} fontWeight='bold'>Connect with friends and the world with similar mentality around you through the chatAI</Typography>
            
          </Box>
        </>)}

        <Box sx={{ width: '80%', marginTop: '-10%' }}>
          <LoginModal></LoginModal>
        </Box>
      </Container>
    </>
  );
};

export default App;
