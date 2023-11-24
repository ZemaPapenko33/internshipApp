import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ITodoPayload {
  index: string;
  status: string;
  title: string;
  description: string;
  importance: string;
}

interface ITodoState {
  selectedTodo: ITodoPayload | null;
}

const initialState: ITodoState = {
  selectedTodo: null
};

const onClickTodoSlice = createSlice({
  name: 'onClickTodoSlice',
  initialState,
  reducers: {
    selectTodo: (state, action: PayloadAction<ITodoPayload>) => {
      return {
        ...state,
        selectedTodo: action.payload
      };
    },
    clearSelectedTodo: (state) => {
      return {
        ...state,
        selectedTodo: null
      };
    }
  }
});

export const { selectTodo, clearSelectedTodo } = onClickTodoSlice.actions;

export default onClickTodoSlice.reducer;
