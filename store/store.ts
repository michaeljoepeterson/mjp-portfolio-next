import { configureStore } from '@reduxjs/toolkit'
import { gameSlice } from './game-state/game-slice';

export const store = configureStore({
  reducer: {
    [gameSlice.name]: gameSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;