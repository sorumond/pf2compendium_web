import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ITraitItem {
    uid: string,
    source: string,
    description: string,
    sourceLink: string,
    name: string
}

interface TraitsState {
    traits: { [key: string]: ITraitItem }
}

const initialState: TraitsState = {
    traits: {}
};

const traitsSlice = createSlice({
    name: 'traits',
    initialState,
    reducers: {
        updateTraits: (state, action: PayloadAction<TraitsState>) => {
            state.traits = action.payload.traits;
        }
    }
});

export default traitsSlice.reducer;
export const { updateTraits } = traitsSlice.actions;