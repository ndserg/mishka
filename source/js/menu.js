'use strict';
const menuToggle = document.querySelector(`.page-header__toggle`);
const toggleElements = document.querySelectorAll(`.page-header__menu--show`);

if (menuToggle.classList.contains(`page-header__toggle--nojs`)) {
  menuToggle.classList.remove(`page-header__toggle--nojs`);
  menuToggle.classList.add(`page-header__toggle--open`);
  toggleElements.forEach( (element) => element.classList.add(`page-header__menu--hide`));
};

const menuToggleClickHandler = (evt) => {
  evt.preventDefault();

  if (menuToggle.classList.contains(`page-header__toggle--open`)) {
    menuToggle.classList.remove(`page-header__toggle--open`);
    menuToggle.classList.add(`page-header__toggle--close`);
    toggleElements.forEach((element) => {
      element.classList.remove(`page-header__menu--hide`);
      element.classList.add(`page-header__menu--open`);
    })
  } else {
    menuToggle.classList.remove(`page-header__toggle--close`);
    menuToggle.classList.add(`page-header__toggle--open`);
    toggleElements.forEach((element) => {
      element.classList.add(`page-header__menu--hide`)
      element.classList.remove(`page-header__menu--open`);
    });
  };
};

menuToggle.addEventListener(`click`, menuToggleClickHandler);
