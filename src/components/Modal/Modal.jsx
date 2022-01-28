import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalBlock } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ src, title, onClose }) => {
  // componentDidMount() {
  //   window.addEventListener('keydown', this.onEscClick);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.onEscClick);
  // }

  const onEscClick = e => {
    if (e.code === 'Escape') {
      onClose();
    }

    console.log(e.code);
  };

  const onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onEscClick);

    return () => {
      window.removeEventListener('keydown', onEscClick);
    };
  });

  return createPortal(
    <Overlay onClick={onOverlayClick}>
      <ModalBlock>
        <img src={src} alt={title} />
      </ModalBlock>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
};

export default Modal;
