import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { publish } from '../events';

export interface IFavouriteItem {
    uid: string,
    link: string,
    name: string
}

interface FavouriteState {
    favourites: IFavouriteItem[]
}

const initialState: FavouriteState = {
    favourites: JSON.parse(window.localStorage.getItem('favourites')) || []
};

const favouriteSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        addFavourite: (state, action: PayloadAction<{ uid: string, link: string, name: string }>) => {
            state.favourites.push({
                uid: action.payload.uid,
                link: action.payload.link,
                name: action.payload.name
            });
            window.localStorage.setItem('favourites', JSON.stringify([...state.favourites]));
            publish('sideNotificationCreateItem', { text: 'Added to favourites' });
        },
        removeFavourite: (state, action: PayloadAction<{ uid: string }>) => {
            state.favourites = [...state.favourites.filter((item) => item.uid !== action.payload.uid)];
            window.localStorage.setItem('favourites', JSON.stringify([...state.favourites]));
            publish('sideNotificationCreateItem', { text: 'Removed from favourites' });
        }
    }
});

export default favouriteSlice.reducer;
export const { addFavourite, removeFavourite } = favouriteSlice.actions;