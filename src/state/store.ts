import { combineReducers, configureStore } from '@reduxjs/toolkit';
import progressReducer from './reducers/progressSlice';
import playerReducer from './reducers/playerSlice';
import battleReducer from './reducers/battleSlice';
import modalReducer from './reducers/gameOverModalSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["player", "progress"],
};

// Combine all reducers
const rootReducer = combineReducers({
  progress: progressReducer,
  player: playerReducer,
  battle: battleReducer,
  modal: modalReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for Redux Persist
    }),
});

// Create persistor for Redux Persist
export const persistor = persistStore(store);

// Export store
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
