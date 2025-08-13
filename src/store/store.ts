import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import contractsSlice from './slices/contractsSlice';
import rebatesSlice from './slices/rebatesSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    contracts: contractsSlice,
    rebates: rebatesSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;