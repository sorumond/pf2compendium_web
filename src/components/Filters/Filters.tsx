import './Filters.css';
import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { CompendiumCheckbox } from '../CompendiumCheckbox/CompendiumCheckbox';
import { ISpellsAppliedFilters } from '../SpellsPage/SpellsPage';

export function Filters(props: { filterSettings, appliedFilters, checkFilterApplied, onFiltersApplied, onClearFilterButton, onClearAllFilterButton }) {
    const { filterSettings, appliedFilters, checkFilterApplied, onFiltersApplied, onClearFilterButton, onClearAllFilterButton } = props;
    const [filterExpanded, setFilterExpanded] = useState(false);
    const formFilterString = (appliedFilters: ISpellsAppliedFilters, isFilterExpanded: boolean) => {
        if (isFilterExpanded)
            return 'Filters';

        let label = '';

        for (const key in appliedFilters) {
            let labelFilter = `${key}: `;
            for (let i = 1; i <= appliedFilters[key].length; i++) {
                labelFilter += `'${appliedFilters[key][i - 1].value}' `;
            }
            labelFilter += '; ';

            label += labelFilter;
        }

        return label != '' ? `Filters: ${label}` : 'Filters';
    };
    return (
        <Accordion onChange={((event, expanded) => { setFilterExpanded(expanded); })} sx={{ position: 'sticky', top: 90, zIndex: 3, marginBottom: '20px' }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"

            >
                <Typography sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, minHeight: '40px' }}>{formFilterString(appliedFilters, filterExpanded)}</Typography>
                <IconButton
                    className={Object.keys(appliedFilters).length ? '' : 'Hidden'}
                    color="primary"
                    aria-label="clear all filters"
                    onClick={(event) => {
                        onClearAllFilterButton();
                        event.stopPropagation();
                    }}
                >
                    <DeleteSweepIcon />
                </IconButton>
            </AccordionSummary>
            <AccordionDetails>
                {filterSettings.map((filter) => {
                    return (
                        <div key={`${filter}_category`} className='filters__category-filter-container'>
                            <div className='filters__category-filter-title-container'>
                                <div className='filters__category-filter-title'>{filter.categoryName}</div>
                                <div className='filters__category-filter-clear-button'>
                                    <IconButton
                                        className={appliedFilters[filter.categoryName] ? '' : 'Hidden'}
                                        color="primary"
                                        aria-label="remove filters"
                                        onClick={(event) => {
                                            onClearFilterButton(filter.categoryName);
                                            event.stopPropagation();
                                        }}
                                    >
                                        <DeleteSweepIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <div className='filters__category-filter-items-container'>
                                {filter.filters.map((singleFilter, index) => {
                                    return (
                                        <CompendiumCheckbox
                                            key={`${filter}_${singleFilter}}`}
                                            checked={checkFilterApplied(filter.categoryName, index)}
                                            onChange={(checked: boolean) => {
                                                onFiltersApplied(filter.categoryName, { value: singleFilter, index: index }, checked);
                                            }}
                                            label={`${singleFilter}`}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </AccordionDetails>
        </Accordion>
    );
}