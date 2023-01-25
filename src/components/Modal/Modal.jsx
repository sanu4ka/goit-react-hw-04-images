import css from './Modal.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  onBackdropClick = () => {
    this.props.onModalClose();
  };

  render() {
    const { largeImageURL, id } = this.props;

    return (
      <div className={css.Overlay} onClick={this.onBackdropClick}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt={id} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  id: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default Modal;
