import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header.tsx';
import './App.css';
import { NavigationBar } from './components/NavigationBar/NavigationBar.tsx';
import { Box } from '@mui/material';
import { PopupTagDescriber } from './components/PopupTagDescriber/PopupTagDescriber.tsx';
import { SideNotification } from './components/SideNotification/SideNotification.tsx';

function App() {
  return (
    <Box className='Pf2Compendium'>
      <Header></Header>
      <PopupTagDescriber></PopupTagDescriber>
      <Box
        component={'main'}
        className='main'
        sx={{
        }}>
        <NavigationBar ></NavigationBar>
        <Box sx={{ maxWidth: '1200px', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Outlet />
        </Box>
        <SideNotification></SideNotification>
      </Box>
    </Box >
  );
}

export default App;
