interface ISpellFilterSetting {
    categoryName: string,
    filters: Array<string | number>
}

export const SpellFilterSettings: Array<ISpellFilterSetting> =
    [
        {
            categoryName: 'Levels',
            filters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            categoryName: 'Traditions',
            filters: ['Arcane', 'Primal', 'Occult', 'Divine']
        },
        {
            categoryName: 'Rarity',
            filters: ['Common', 'Uncommon', 'Rare']
        }
    ];