import css from './Modal.module.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Modal({ id, largeImageURL, onModalClose }) {
  const onKeyDown = e => {
    if (e.code === 'Escape') {
      onModalClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  return (
    <div className={css.Overlay} onClick={onModalClose}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={id} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  id: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
