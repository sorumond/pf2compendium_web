import './SpellListItem.css';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ISpellListInfo } from '../SpellList/SpellList.tsx';
import { spellApisUrl } from '../SpellsPage.tsx';
import { publish } from '../../../events.ts';

const SpellDescriber = lazy(() => import('../SpellDescriber/SpellDescriber.tsx'));

export default function SpellListItem(params: { spell: ISpellListInfo }) {
    const [expanded, setExpanded] = useState(false);
    const [spellShorInfo, setSpellShortInfo] = useState(params.spell);
    const [spellData, setSpellData] = useState(null);
    const [showDescriber, setShowDescriber] = useState(false);

    function handleSpellExpanded(event: React.SyntheticEvent) {
        setExpanded(!expanded);
    }

    useEffect(() => {
        if ((expanded && !spellData)) {
            fetch(`${spellApisUrl}/${params.spell.uid}`)
                .then((response) => response.json())
                .then((fetchedData) => {
                    setSpellData(fetchedData);
                })
                .then(() => {
                    setShowDescriber(expanded);
                })
                .catch((error) => console.log(error));
        } else {
            setShowDescriber(expanded);
        }
    }, [expanded]);

    return (
        (
            <Box sx={{ paddingTop: '250px', marginTop: '-250px', marginBottom: '10px' }}>
                <Accordion expanded={showDescriber} sx={{ backgroundColor: '#ede3c8' }}>
                    <AccordionSummary
                        onClick={handleSpellExpanded}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0, paddingRight: '10px' }}
                    >
                        <Box className='spell-list-item__wrapper'>
                            <Container disableGutters={true} className='spell-list-item__label-wrapper'>
                                <Box className='spell-list-item__level-container'>
                                    <Typography className='spell-list-item__level'>{spellShorInfo.level}</Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{ fontWeight: 'bold' }}>{spellShorInfo.name}</Typography>
                                    <Typography sx={{ fontStyle: 'italic' }}>{spellShorInfo.category}</Typography>
                                </Box>
                            </Container>
                            <Box className='spell-list-item__tag-wrapper'>
                                <Box sx={{ display: 'flex' }}>
                                    {spellShorInfo.traditions?.map((tradition) => {
                                        return (
                                            <div key={`${spellShorInfo.uid}+${tradition}`} className='spell-list-item__tag' onMouseOver={(event) => { publish('showPopupTagDescriber', { target: event.target, uid: tradition }); }} onMouseOut={() => { publish('hidePopupTagDescriber'); }}>
                                                {tradition}
                                            </div>
                                        );
                                    })}
                                </Box>
                            </Box>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails style={{}}>
                        {spellData && (
                            <SpellDescriber key={`describer_${spellShorInfo.uid}`} spellData={spellData} />)}
                    </AccordionDetails>
                </Accordion>
            </Box>
        )
    );
}