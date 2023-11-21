import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ITodoPayload {
  status: string;
  title: string;
  description: string;
  importance: string;
  id: string;
}

interface ITodoState {
  todos: ITodoPayload[];
}

const initialState: ITodoState = {
  todos: []
};

const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodoPayload>) => {
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    },
    setTodo: (state, action: PayloadAction<ITodoPayload[]>) => {
      return {
        ...state,
        todos: action.payload
      };
    },
    updateStatusById: (state, action: PayloadAction<{ id: string; dataStatus: string }>) => {
      const { id, dataStatus } = action.payload;
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, status: dataStatus } : todo
      );

      return {
        ...state,
        todos: updatedTodos
      };
    }
  }
});

export const { addTodo, setTodo, updateStatusById } = todoSlice.actions;
export default todoSlice.reducer;
