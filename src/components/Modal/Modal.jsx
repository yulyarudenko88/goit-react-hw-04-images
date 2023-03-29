import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ImageModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const onCloseESC = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onCloseESC);

    return () => {
      window.removeEventListener('keydown', onCloseESC);
    };
  }, [onClose]);

  const onCloseOverlay = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={onCloseOverlay}>
      <ImageModal>{children}</ImageModal>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};
