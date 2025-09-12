import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface initialStateUtilsType {
  modalType?:
    | 'PILL_CREATE'
    | 'PILL_READ'
    | 'QUESTIONNAIRE_CREATE'
    | 'TRIVIA_CREATE'
    | 'PROGRAM_STUDENTS_CREATE'
    | 'COLLECTION_STUDENTS_CREATE'
    | 'PROFESSOR_CREATE'
    | 'ADD_STUDENT'
    | 'STUDENTS_STATUS'
    | 'STUDENTS_GROUPS'
    | 'LOADER'
    | 'CONFIRM_STUDENTS_CHANGES'
    | 'INSTITUTION_CREATE';
  metadata?: any;
  closable?: boolean;
}

const initialState: initialStateUtilsType = {
  modalType: undefined,
  metadata: undefined,
  closable: true,
};

export const utilsSlice = createSlice({
  name: 'utilsSlice',
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.modalType = action.payload?.modalType;
      state.metadata = action.payload?.metadata;
      state.closable = action.payload?.closable ?? true;
    },
    closeModal: (state) => {
      state.modalType = undefined;
    },
  },
});

export const { setModalOpen, closeModal } = utilsSlice.actions;

export default utilsSlice.reducer;
