import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const selectTodoState = (state: RootState) => state.todoSlice;
export const selectProjects = (state: RootState) => state.projectSlice.projects;

export const selectFilteredTodos = createSelector(
  [selectTodoState, (_, statusFilter: string | null) => statusFilter],
  (todoState, statusFilter) => {
    const { todos } = todoState;

    return statusFilter ? todos.filter((todo) => todo.status === statusFilter) : todos;
  }
);

export const selectTodoById = (id: string) =>
  createSelector([selectTodoState], ({ todos }) => todos.find((todo) => todo.id === id) || null);

export const selectProjectByName = (name: string) =>
  createSelector([selectProjects], (projects) => projects.find((project) => project.name === name));
