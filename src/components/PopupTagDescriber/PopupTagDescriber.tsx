import './PopupTagDescriber.css';
import { useEffect, useRef, useState } from 'react';
import { subscribe, unsubscribe } from '../../events';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { updateTraits } from '../../app/traitsSlice';

const traitsApiUrl = '/api/traits';

export function PopupTagDescriber() {
    const [isShown, setIsShown] = useState(false);
    const [elementPosition, setElementPosition] = useState<DOMRect>(null);
    const [currentTraditionUid, setCurrentTraditionUid] = useState('');
    const [traitsData, setTraitsData] = useState(null);
    const popupTagDescriver = useRef<HTMLInputElement>();
    const traitsList = useSelector((state: RootState) => { return state.traits.traits; });
    const dispatch = useDispatch();

    useEffect(() => {
        subscribe('showPopupTagDescriber', (data) => {
            setElementPosition(data.detail.target.getBoundingClientRect());
            setCurrentTraditionUid(data.detail.uid);
            setIsShown(true);
        });
        subscribe('hidePopupTagDescriber', () => { setIsShown(false); });
        return () => {
            unsubscribe('showList', () => setIsShown(false));
            unsubscribe('hideList', () => setIsShown(true));
        };
    }, []);

    useEffect(() => {
        fetch(`${traitsApiUrl}`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((fetchedData) => {
                console.log(fetchedData);
                dispatch(updateTraits({
                    traits: fetchedData.traits
                }));
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if (currentTraditionUid != '') {
            setTraitsData(traitsList[currentTraditionUid]);
        }
    }, [currentTraditionUid]);

    function setLeftOffset() {
        const popup = popupTagDescriver.current.getBoundingClientRect();
        if (elementPosition.x + popup.width > window.innerWidth) {
            return window.innerWidth - popup.width - (window.innerWidth * 0.02);
        }
        else {
            return elementPosition.x;
        }
    }

    return (
        <Box ref={popupTagDescriver} className={`popup-tag-describer ${isShown ? '' : 'Hidden'}`} sx={isShown && { top: `${elementPosition.y + elementPosition.height + 5}px`, left: `${setLeftOffset()}px` }}>
            {traitsData &&
                <div className='popup-tag-describer__wrapper'>
                    <div className='popup-tag-describer__title'>{traitsData.name}</div>
                    <div className='popup-tag-desctiber__description'>
                        {traitsData.description}
                    </div>
                </div>
            }
        </Box>
    );
}