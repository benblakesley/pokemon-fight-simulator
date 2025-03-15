// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import progressReducer from './reducers/progressSlice';
import playerReducer from './reducers/playerSlice';
import fightReducer from './reducers/fightSlice';

// Create the store
const store = configureStore({
  reducer: {
    progress: progressReducer,
    player: playerReducer,
    fight: fightReducer
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;