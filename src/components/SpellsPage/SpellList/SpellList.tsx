import './SpellList.css';
import { Suspense, lazy, useEffect, useState, useRef } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, IconButton, List, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import RenderIfVisible from 'react-render-if-visible';
import { useNavigate, useParams } from 'react-router-dom';
import SpellPopup from '../SpellPopup/SpellPopup.tsx';


let searchTimeoutId = 0;

const SpellListItem = lazy(() => import('../SpellListItem/SpellListItem.tsx'));

export interface ISpellListInfo {
    category: string,
    level: number,
    name: string,
    rarity: string,
    spellUuid: string,
    traditions: Array<string>,
    type: string,
    uid: string
}

export function SpellList(props: { data: Array<ISpellListInfo> }) {
    const linkId = useParams().id;
    const [search, setSearch] = useState('');
    const [spellObject, setSpellObject] = useState(null);

    useEffect(() => {
        const spellObj = {};
        const data = props.data;
        data.forEach((spellItem) => {
            if (search == '' || spellSearch(spellItem.name)) {
                if (!spellObj[spellItem.category]) {
                    spellObj[spellItem.category] = {};
                }

                if (!spellObj[spellItem.category][spellItem.level]) {
                    spellObj[spellItem.category][spellItem.level] = [];
                }

                spellObj[spellItem.category][spellItem.level].push(spellItem);
            }
        });
        setSpellObject({ ...spellObj });
    }, [props.data, search]);

    function onSearchUpdate(value: string) {
        window.clearTimeout(searchTimeoutId);
        searchTimeoutId = window.setTimeout(() => {
            setSearch(value);
            window.clearTimeout(searchTimeoutId);
        }, 500);
    }

    function spellSearch(spell: string): boolean {
        if (search == '')
            return true;

        const itemJoined = spell.toLowerCase().split(' ').join('');
        const searchJoined = search.toLowerCase().split(' ').join('');
        return itemJoined.includes(searchJoined);
    }

    return (
        <Container disableGutters={true}
            sx={{
                position: 'relative',
                width: '100%',
                flexGrow: 0,
                flexShrink: 0,
                marginTop: '10px'
            }}>
            {linkId && (
                <SpellPopup spellUid={linkId}></SpellPopup>
            )}
            <Box sx={{ display: 'flex', width: '100%', position: 'sticky', top: 160, background: 'white', zIndex: 2 }}>
                <TextField id="outlined-basic" label="Search" variant="outlined" fullWidth={true}
                    onChange={(event) => {
                        onSearchUpdate(event.target.value);
                    }} />
            </Box>
            <List key={'SpellList'}>
                {spellObject && Object.keys(spellObject).map((category) => {
                    return (
                        <div key={category} className='spell-list__category'>
                            <div className='spell-list__category-title'>{category}</div>
                            {Object.keys(spellObject[category]).map((level) => {
                                const filteredArray = spellObject[category][level];
                                if (filteredArray.length > 0) {
                                    return (
                                        <div key={`spell_category_$${level}`} className='spell-list__level'>
                                            <div className='spell-list__level-title'>{+level == 0 ? 'Cantrips' : `Level: ${level}`}</div>
                                            {filteredArray.map((spell) => {
                                                return (
                                                    <RenderIfVisible placeholderElementClass={`${spell.uid}`}>
                                                        <Suspense >
                                                            <SpellListItem key={spell.uid} spell={spell}></SpellListItem>
                                                        </Suspense>
                                                    </RenderIfVisible>
                                                );
                                            })}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    );
                })}
            </List>
        </Container >
    );
}