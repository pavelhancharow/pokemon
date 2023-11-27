import React, { MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as CloseIcon } from '../../icons/close-icon.svg';
import { ModalContainer, ModalCard, ModalTitle, ModalCloseButton } from './styles';

const modalRoot = document.getElementById('modal-root') as HTMLElement;

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen = false, title, onClose, children }: IModal) => {
  if (!isOpen) return null;

  const handleClose = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onClose();
  };

  const content = (
    <ModalContainer onClick={handleClose}>
      <ModalCard onClick={(event) => event.stopPropagation()}>
        <ModalCloseButton onClick={handleClose}>
          <CloseIcon />
        </ModalCloseButton>

        <ModalTitle>{title}</ModalTitle>

        {children}
      </ModalCard>
    </ModalContainer>
  );

  return createPortal(content, modalRoot);
}

export default Modal;