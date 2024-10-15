import './Header.css';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { publish } from '../../events';


export default function Header() {
  return (
    <AppBar position='sticky' className='header' style={{ backgroundColor: '#600001' }}>
      <Toolbar>
        <IconButton className='header__side-bar-button' onClick={() => {
          publish('toggleSidebar');
        }}>
          <DensitySmallIcon></DensitySmallIcon>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}