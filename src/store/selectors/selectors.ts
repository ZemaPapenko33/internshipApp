import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const selectTodoState = (state: RootState) => state.todoSlice;

export const selectFilteredTodos = createSelector(
  [selectTodoState, (_, statusFilter: string | null) => statusFilter],
  (todoState, statusFilter) => {
    const { todos } = todoState;
    return statusFilter ? todos.filter((todo) => todo.status === statusFilter) : todos;
  }
);
