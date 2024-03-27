import { createSlice } from '@reduxjs/toolkit';

export interface initialStateUtilsType {
  modalType?:
    | 'PILL_CREATE'
    | 'QUESTIONNAIRE_CREATE'
    | 'TRIVIA_CREATE'
    | 'STUDENTS_CREATE'
    | 'PROFESSOR_CREATE';
}

const initialState: initialStateUtilsType = {
  modalType: undefined,
};

export const utilsSlice = createSlice({
  name: 'utilsSlice',
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.modalType = action.payload?.modalType;
    },
    closeModal: (state) => {
      state.modalType = undefined;
    },
  },
});

export const { setModalOpen, closeModal } = utilsSlice.actions;

export default utilsSlice.reducer;
