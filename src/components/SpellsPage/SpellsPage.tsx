
import './SpellsPage.css';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { SpellFilterSettings } from './SpellFilterSettings';
import { SpellList, ISpellListInfo } from './SpellList/SpellList';
import { Filters } from '../Filters/Filters';
import { useFilter } from '../../hooks/useFilter';

export const drawerWidth = 300;
export const spellApisUrl = '/api/spells';

interface ISpellsInfo {
    spells?: Array<ISpellListInfo>
}

export interface ISpellsAppliedFilters {
    [key: string]: Array<{ value: string | number, index: number }>
}


export default function SpellsPage() {
    const [appliedFilters, addToFilter, removeFromFilter, removeCategoryFromFilter, clearAllFilters, checkIfFilterApplied] = useFilter({});
    const [spellData, setSpellData] = useState(null);
    const [fetchTimeout, setFetchTimeout] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        window.clearTimeout(fetchTimeout);
        const fetchTimeoutId = window.setTimeout(() => {
            fetch(`${spellApisUrl}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(formFilterRequest())
            })
                .then((response) => response.json())
                .then((fetchedData) => {
                    setSpellData(fetchedData);
                })
                .catch((error) => console.log(error));
        }, 500);
        setFetchTimeout(fetchTimeoutId);
    }, [appliedFilters]);

    const onFilterApplied = (category: string, value: { value: string | number, index: number }, cheked: boolean) => {
        navigate('/spells');
        if (cheked) {
            addToFilter(category, value);
        }
        else {
            removeFromFilter(category, value);
        }
    };

    function formFilterRequest() {
        const filterRequest = {};
        for (const key in appliedFilters) {
            const keyForFillter = key.toLowerCase();
            const filterCategory = filterRequest[keyForFillter] = [];

            for (let i = 0; i < appliedFilters[key].length; i++) {
                if (typeof appliedFilters[key][i].value === 'string') {
                    filterCategory.push(`${appliedFilters[key][i].value}`.toLocaleLowerCase());
                } else {
                    filterCategory.push(appliedFilters[key][i].value);
                }
            }
        }
        return filterRequest;
    }

    return (
        <Box >
            {SpellFilterSettings &&
                <Filters
                    filterSettings={SpellFilterSettings}
                    appliedFilters={appliedFilters}
                    checkFilterApplied={checkIfFilterApplied}
                    onFiltersApplied={onFilterApplied}
                    onClearFilterButton={removeCategoryFromFilter}
                    onClearAllFilterButton={clearAllFilters}>
                </Filters>}
            <Container disableGutters={true} sx={{ display: 'flex', position: 'relative', alignItems: 'flex-start' }}>
                {spellData ? <SpellList data={[...spellData.spells]}></SpellList> : ''}
            </Container>
        </Box >
    );
}
