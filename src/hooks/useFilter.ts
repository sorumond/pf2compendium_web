import { useState } from 'react';
import { ISpellsAppliedFilters } from '../components/SpellsPage/SpellsPage';

export function useFilter(initialFilter: ISpellsAppliedFilters) {
    const [appliedFilters, setAppliedFilter] = useState<ISpellsAppliedFilters>(initialFilter);

    function addToFilter(category: string, value: { value: string | number, index: number }) {
        setAppliedFilter({
            ...appliedFilters,
            [category]: [...appliedFilters[category] || [], value].sort((a, b) => {
                if (a.index < b.index) {
                    return -1;
                } else if (a > b) {
                    return 1;
                }
            })
        });
    }

    function removeFromFilter(category: string, value: { value: string | number, index: number }): void {
        if (appliedFilters[category].length == 1) {
            removeCategoryFromFilter(category);
        } else {
            setAppliedFilter({
                ...appliedFilters,
                [category]: [...appliedFilters[category]].filter((element) => { return element.index != value.index; })
            });
        }
    }

    function removeCategoryFromFilter(category: string) {
        setAppliedFilter((prev) => {
            const copy = { ...prev };
            delete copy[category];
            return copy;
        });
    }

    const clearAllFilters = () => {
        setAppliedFilter({});
    };

    function checkIfFilterApplied(category: string, index: number): boolean {
        return appliedFilters[category]?.findIndex((element) => { return element.index == index; }) >= 0 ? true : false;
    }

    return [appliedFilters, addToFilter, removeFromFilter, removeCategoryFromFilter, clearAllFilters, checkIfFilterApplied] as const;
}
