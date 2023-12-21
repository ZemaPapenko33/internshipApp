import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILabelsPayload {
  labelName: string;
  idLabel: string;
}

interface ILabelsState {
  labels: ILabelsPayload[];
}

const initialState: ILabelsState = {
  labels: []
};

const labelSlice = createSlice({
  name: 'labelSlice',
  initialState,
  reducers: {
    addLabel: (state, action: PayloadAction<ILabelsPayload>) => {
      return {
        ...state,
        labels: [...state.labels, action.payload]
      };
    },
    setLabels: (state, action: PayloadAction<ILabelsPayload[]>) => {
      return {
        ...state,
        labels: action.payload
      };
    }
  }
});

export const { addLabel, setLabels } = labelSlice.actions;
export default labelSlice.reducer;
