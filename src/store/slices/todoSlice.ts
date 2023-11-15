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
    }
  }
});

export const { addTodo, setTodo } = todoSlice.actions;
export default todoSlice.reducer;
