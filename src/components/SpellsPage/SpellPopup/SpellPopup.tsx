import './SpellPopup.css';
import { useEffect, useState, useRef } from 'react';
import SpellDescriber, { ISpellInfo } from '../SpellDescriber/SpellDescriber';
import { spellApisUrl } from '../SpellsPage';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function SpellPopup(props: { spellUid: string }) {
    const [spellData, setSpellData] = useState<ISpellInfo>(null);
    const navigate = useNavigate();
    const popupRef = useRef<HTMLInputElement>();

    function onCloseButtonClick() {
        navigate('/spells');
    }

    function onKeyDown(event) {
        if (event.code === 'Escape') {
            onCloseButtonClick();
        }
    }

    function handleClickout(event) {
        if (!popupRef.current.contains(event.target)) {
            onCloseButtonClick();
        }
    }

    useEffect(() => {
        fetch(`${spellApisUrl}/${props.spellUid}`)
            .then((response) => response.json())
            .then((fetchedData) => {
                setSpellData({ ...fetchedData });
            })
            .catch((error) => console.log(error));
    }, [props.spellUid]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('mousedown', handleClickout);

        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
            document.removeEventListener('mousedown', handleClickout, false);
        };
    }, []);

    return (
        spellData &&
        <div className='spell-list-popup' ref={popupRef}>
            <div onKeyDown={onKeyDown} className='spell-list-popup__wrapper'>
                <div className='spell-list-popup__title-wrapper'>
                    <div className='spell-list-popup__title'>{spellData.spell.name}</div>
                    <IconButton
                        className='spells-page__filter-clear-button'
                        color="primary"
                        onClick={(event) => {
                            onCloseButtonClick();
                            event.stopPropagation();
                        }}
                    >
                        <CloseIcon fontSize='large'></CloseIcon>
                    </IconButton>
                </div>
                <div className='spell-list-popup__describer-wrapper'>
                    <SpellDescriber spellData={spellData}></SpellDescriber>
                </div>
            </div>
        </div>
    );
}