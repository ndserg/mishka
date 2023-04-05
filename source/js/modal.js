'use strict';
const modal = document.querySelector(`.modal-order`);
const modalWrapper = modal.querySelector(`.modal-order__wrapper`);
const modalButtonClose = modal.querySelector(`.modal-order__close-button`);
const modalButton = document.querySelector(`.top-sales__button`);

const hideClass = `visually-hidden`;
const KEYCODE_ESC = 27;

const closeModal = () => {
  modal.classList.add(hideClass);
  modalWrapper.classList.remove(`modal-order__wrapper--show`);

  document.removeEventListener(`keydown`, modalCloseHandler);
  modalButtonClose.removeEventListener(`click`, modalButtonCloseHandler);
};

const modalCloseHandler = (evt) => {
  evt.preventDefault();

  if (evt.key === `Escape` || evt.keyCode === KEYCODE_ESC) {
    closeModal();
  };
};

const modalButtonCloseHandler = (evt) => {
  evt.preventDefault();

  closeModal();
};

const modalButtonClickHandler = (evt) => {
  evt.preventDefault();

  if (modal.classList.contains(hideClass)) {
    modal.classList.remove(hideClass);
    modalWrapper.classList.add(`modal-order__wrapper--show`);
    document.addEventListener(`keydown`, modalCloseHandler);
    modalButtonClose.addEventListener(`click`, modalButtonCloseHandler);
  };
};

modalButton.addEventListener(`click`, modalButtonClickHandler);
