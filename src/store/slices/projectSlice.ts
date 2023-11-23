import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IProjectPayload {
  name: string;
  id: string;
}

interface IProjectState {
  projects: IProjectPayload[];
}

const initialState: IProjectState = {
  projects: []
};

const projectSlice = createSlice({
  name: 'projectSlice',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<IProjectPayload>) => {
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    },
    setProject: (state, action: PayloadAction<IProjectPayload[]>) => {
      return {
        ...state,
        projects: action.payload
      };
    }
  }
});

export const { addProject, setProject } = projectSlice.actions;
export default projectSlice.reducer;
