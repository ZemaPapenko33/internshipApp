import { combineReducers, configureStore } from '@reduxjs/toolkit';
import onClickTodoSlice from './slices/onClickTodoSlice';
import todoSlice from './slices/todoSlice';

export const rootReducer = combineReducers({
  todoSlice,
  onClickTodoSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer
});
