import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from "./Modal.module.css"

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscClick);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscClick);
  }

  handleEscClick = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL } = this.props;
    return createPortal(
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};