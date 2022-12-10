'use strict';
const modal = document.querySelector(`.modal-order`);
const modalWrapper = document.querySelector(`.modal-order__wrapper`);
const modalButton = document.querySelector(`.top-sales__button`);

const hideClass = `visually-hidden`;
const KEYCODE_ESC = 27;

const modalCloseHandler = function(evt) {
  evt.preventDefault();

  if (evt.key === `Escape` || evt.keyCode === KEYCODE_ESC) {
    modal.classList.add(hideClass);
    modalWrapper.classList.remove(`modal-order__wrapper--show`);
    document.removeEventListener(`keydown`, modalCloseHandler);
  }
}

const modalButtonClickHandler = function(evt) {
  evt.preventDefault();

  if (modal.classList.contains(hideClass)) {
    modal.classList.remove(hideClass);
    modalWrapper.classList.add(`modal-order__wrapper--show`);
    document.addEventListener(`keydown`, modalCloseHandler);
  }
}

modalButton.addEventListener(`click`, modalButtonClickHandler);
