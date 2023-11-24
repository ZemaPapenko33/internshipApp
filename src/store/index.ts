import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todoSlice from './slices/todoSlice';

export const rootReducer = combineReducers({
  todoSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer
});
