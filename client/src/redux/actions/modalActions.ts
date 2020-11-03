import { ModalActionTypes } from '../types/modalTypes';

export const toggleModal = (showModal: boolean, modalBody: string, modalTitle: string) => {
  return { type: ModalActionTypes.TOGGLE_MODAL, showModal, modalBody, modalTitle };
};

export const resetModal = () => {
  return { type: ModalActionTypes.RESET_MODAL };
};
