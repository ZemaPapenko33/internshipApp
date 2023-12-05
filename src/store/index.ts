import { combineReducers, configureStore } from '@reduxjs/toolkit';
import labelsSlice from './slices/labelsSlice';
import projectSlice from './slices/projectSlice';
import todoSlice from './slices/todoSlice';

export const rootReducer = combineReducers({
  todoSlice,
  projectSlice,
  labelsSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer
});
