import './NavigationBar.css';
import { Link, NavLink, useHref } from 'react-router-dom';
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { subscribe, unsubscribe } from '../../events';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';
import { removeFavourite } from '../../app/favouriteSlice';
import { RootState } from '../../app/store';

const drawerWidth = '230px';

const navigation = [
    {
        text: 'Home',
        path: '/'
    },
    {
        text: 'Spells',
        path: '/spells'
    },
    {
        text: 'Races',
        path: '/races'
    }
];

export function NavigationBar() {
    const [isShown, setIsShown] = useState(false);
    const favouritesList = useSelector((state: RootState) => { return state.favourites.favourites; });
    const dispatch = useDispatch();

    useEffect(() => {
        subscribe('toggleSidebar', () => {
            setIsShown((prev) => {
                return !prev;
            });
        });

        return () => {
            unsubscribe('toggleSidebar', () => setIsShown(false));
        };
    }, []);

    function onFavouriteDeleteButtonClick(uid: string) {
        dispatch(removeFavourite({
            uid: uid
        }));
    }

    return (
        <Box
            className={`navigation-bar ${isShown ? 'Show' : 'Hide'}`}>
            <List>
                {navigation.map((link, index) => (
                    <ListItem key={link.text} disablePadding className='navigation-bar__item'>
                        <Link to={link.path} style={{ display: 'flex', width: drawerWidth, height: '100%', position: 'relative', padding: '8px 16px', color: 'inherit', fontWeight: 'inherit' }}>
                            <ListItemButton>
                                <ListItemIcon >
                                    {index % 2 === 0 ? <InboxIcon color="info" /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={link.text} classes={{}} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
            <div className='navigation-bar__divider'></div>
            {
                favouritesList.length > 0 &&
                <div className='navigation-bar__favourite-list'>
                    <div className='navigation-bar__favourite-list-title'>Favourite</div>
                    <div className='navigation-bar__favourite-list-container'>
                        {favouritesList.map((item) => {
                            return <div key={item.uid} className='navigation-bar__favourite-item'>
                                <Link className='navigation-bar__favourite-item-link' to={item.link}>{item.name}</Link>
                                <IconButton
                                    className='navigation-bar__favourite-item-delete'
                                    onClick={(event) => {
                                        onFavouriteDeleteButtonClick(item.uid);
                                        event.stopPropagation();
                                    }}
                                >
                                    <ClearIcon></ClearIcon>
                                </IconButton>
                            </div>;
                        })}
                    </div>
                </div>
            }

        </Box >

    );
}