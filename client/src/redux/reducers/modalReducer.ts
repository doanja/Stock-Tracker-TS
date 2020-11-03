import { ModalState, ModalActionTypes } from '../types/modalTypes';
import { Reducer } from 'redux';

const initialState: ModalState = {
  showModal: false,
  modalBody: '',
  modalTitle: 'Error',
};

const modalReducer: Reducer<ModalState> = (state = initialState, action) => {
  switch (action.type) {
    case ModalActionTypes.TOGGLE_MODAL: {
      const { showModal, modalBody, modalTitle } = action;
      return { ...state, showModal, modalBody, modalTitle };
    }
    case ModalActionTypes.RESET_MODAL:
      return { ...state, showModal: false, modalBody: '', modalTitle: 'Error' };
    default:
      return state;
  }
};

export default modalReducer;
