'use strict';
const reviews = document.querySelectorAll(`.reviews__item`);
const prevButton = document.querySelector(`.reviews__toggle--prev`);
const nextButton = document.querySelector(`.reviews__toggle--next`);

const reviewHideClass = `visually-hidden`;
const reviewCurrentClass = `reviews__item--current`

let currentReview = 0;

for (let i = 0; i < reviews.length; i++) {
  reviews[i].classList.contains(reviewCurrentClass) ? currentReview = i : false;
};

const classToggler = (review) => {
  reviews[currentReview].classList.add(reviewHideClass);
  reviews[currentReview].classList.remove(reviewCurrentClass);
  reviews[review].classList.remove(reviewHideClass);
  reviews[review].classList.add(reviewCurrentClass);

  currentReview = review;
};

const prevButtonClickHandler = (evt) => {
  evt.preventDefault();

  const prevReview = (currentReview <= 0) ? reviews.length - 1 : currentReview - 1;
  classToggler(prevReview);
};

const nextButtonClickHandler = (evt) => {
  evt.preventDefault();

  const nextReview = (currentReview >= reviews.length - 1) ? 0 : currentReview + 1;
  classToggler(nextReview);
};

prevButton.addEventListener(`click`, prevButtonClickHandler);
nextButton.addEventListener(`click`, nextButtonClickHandler);
