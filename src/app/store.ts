import { configureStore } from '@reduxjs/toolkit';
import favouriteSlice from './favouriteSlice';
import traitsSlice from './traitsSlice';

export const store = configureStore({
    reducer: {
        favourites: favouriteSlice,
        traits: traitsSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;