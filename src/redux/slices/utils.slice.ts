import { createSlice } from '@reduxjs/toolkit';

export interface initialStateUtilsType {
  modalType?:
    | 'PILL_CREATE'
    | 'PILL_READ'
    | 'QUESTIONNAIRE_CREATE'
    | 'TRIVIA_CREATE'
    | 'STUDENTS_CREATE'
    | 'PROFESSOR_CREATE'
    | 'ADD_STUDENT'
    | 'STUDENTS_STATUS';
  metadata?: any;
}

const initialState: initialStateUtilsType = {
  modalType: undefined,
  metadata: undefined,
};

export const utilsSlice = createSlice({
  name: 'utilsSlice',
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.modalType = action.payload?.modalType;
      state.metadata = action.payload?.metadata;
    },
    closeModal: (state) => {
      state.modalType = undefined;
    },
  },
});

export const { setModalOpen, closeModal } = utilsSlice.actions;

export default utilsSlice.reducer;
