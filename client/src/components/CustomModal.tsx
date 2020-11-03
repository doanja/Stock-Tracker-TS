import React from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
  toggleModal: ToggleModal;
  showModal: boolean;
  title: string;
  body: JSX.Element;
}

const CustomModal: React.FC<ModalProps> = ({ toggleModal, showModal, title, body }) => {
  return (
    <Modal show={showModal} onHide={toggleModal} backdrop={true} animation={true}>
      <Modal.Header className='bg-dark text-light'>
        <Modal.Title>{title}</Modal.Title>
        <FontAwesomeIcon className='icon float-right' icon={faTimes} size='2x' onClick={() => toggleModal()} />
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
