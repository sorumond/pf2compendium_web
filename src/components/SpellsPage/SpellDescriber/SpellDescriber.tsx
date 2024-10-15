import './SpellDescriber.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, IconButton, Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { publish } from '../../../events';
import { addFavourite, removeFavourite } from '../../../app/favouriteSlice';
import { RootState } from '../../../app/store';

export interface ISpellInfo {
    spell: {
        spellUUID: string,
        name: string,
        uid: string,
        description: string,
        source: string,
        category: string,
        type: string,
        cost: string,
        level: number,
        traditions: null,
        rarity: string,
        schools: string,
        range: string,
        duration: string,
        damageType: string
    }
}

export default function SpellDescriber(params: { spellData?: ISpellInfo }) {
    const [spellData, setSpellData] = useState(params.spellData);
    const favouritesList = useSelector((state: RootState) => { return state.favourites.favourites; });
    const [isFavourite, setFavourite] = useState(favouritesList.findIndex((item) => { return item.uid === spellData.spell.uid; }) > -1);
    const [link, setLink] = useState(`/spells/${spellData.spell.uid}`);
    const dispatch = useDispatch();

    function onCopyLinkButtonClick() {
        publish('sideNotificationCreateItem', { text: 'Link copied to clipboard' });
        navigator.clipboard.writeText(`${window.location.origin}${link}`);
    }

    function onFavouriteButtonClick() {
        if (isFavourite) {
            dispatch(removeFavourite({
                uid: spellData.spell.uid
            }));
        }
        else {
            dispatch(addFavourite({
                uid: spellData.spell.uid,
                link: link,
                name: spellData.spell.name
            }));
        }
    }

    useEffect(() => {
        setFavourite(favouritesList.findIndex((item) => { return item.uid === spellData.spell.uid; }) > -1);
    }, [favouritesList]);

    return (
        <Box className='spell-describer'>
            <IconButton
                sx={{ position: 'absolute' }}
                className='spell-describer__copy-link-button'
                color="primary"
                onClick={(event) => {
                    onCopyLinkButtonClick();
                    event.stopPropagation();
                }}
            >
                <LinkIcon fontSize='large' style={{ pointerEvents: 'none' }}></LinkIcon>
            </IconButton>
            <IconButton
                sx={{ position: 'absolute' }}
                className='spell-describer__favourite-link-button'
                onClick={(event) => {
                    onFavouriteButtonClick();
                    event.stopPropagation();
                }}
            >
                {isFavourite ? <TurnedInIcon fontSize='large'></TurnedInIcon> : <TurnedInNotIcon fontSize='large'></TurnedInNotIcon>}
            </IconButton>
            <div dangerouslySetInnerHTML={{ __html: spellData?.spell?.description }} className='spell_describer__text'></div>
        </Box>
    );
}