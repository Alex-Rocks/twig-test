/******/ (() => { // webpackBootstrap
/*!*************************!*\
  !*** ./src/js/popup.js ***!
  \*************************/
window.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.style.visibility = 'hidden';
  });
});
window.addEventListener('load', () => {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.reset(); // Скидає форму
    form.style.visibility = '';
  });
});
const modalsBtn = document.querySelectorAll("a[href^='#modal-'], button[class^='modal-']");
const modals = document.querySelectorAll("dialog[id^='modal-']");
const modalThanks = document.querySelector("dialog[id^='modal-thanks']");
const dFix = () => {
  document.body.style.top = `-${window.scrollY}px`;
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
};
const dAuto = () => {
  const positionScrollY = document.body.style.top ? document.body.style.top : `-${window.scrollY}px`;
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, parseInt(positionScrollY || '0') * -1);
};
modalsBtn.forEach(modalBtn => {
  modalBtn.addEventListener('click', event => {
    let id;
    switch (modalBtn.tagName) {
      case 'A':
        id = modalBtn.getAttribute('href').substring(1);
        break;
      case 'BUTTON':
        const classList = modalBtn.getAttribute('class').split(' ');
        id = classList.find(c => c.startsWith('modal-'));
        break;
      default:
        console.error('Unexpected tag name:', modalBtn.tagName);
        return;
    }
    const dialogElement = document.getElementById(id);
    if (dialogElement) {
      event.preventDefault();
      dialogElement.showModal();
      dFix();
      const card = modalBtn.closest('.card');
      console.log(card);
      if (card) {
        const courseName = card.getAttribute('data-course');
        console.log(courseName);
        if (courseName) {
          const hiddenInput = dialogElement.querySelector('input[name="your-course"]');
          console.log(hiddenInput);
          if (hiddenInput) {
            hiddenInput.value = courseName;
          }
        }
      }
    } else console.error('Dialog element not found for ID:', id);
  });
});
modals.forEach(modal => {
  modal.addEventListener('click', e => {
    const dialog = e.currentTarget;
    const isClickOnBackDrop = e.target === dialog;
    if (isClickOnBackDrop) {
      const resForm = e.target.closest('dialog.modal');
      resForm.querySelector('form').reset();
      resForm.querySelector('.ss__input-value')?.setAttribute('value', '');
      let span_el = resForm.querySelector('.acceptance-required');
      if (!!span_el) {
        span_el.remove();
      }
      console.log(isClickOnBackDrop);
      console.log(e.target);
      console.log(dialog);
      modal.close();
      dAuto();
    }
  });
  const closeButton = modal.querySelector('.close');
  if (closeButton) {
    closeButton.addEventListener('click', e => {
      const resForm = e.target.closest('dialog.modal');
      resForm.querySelector('form').reset();
      resForm.querySelector('.ss__input-value')?.setAttribute('value', '');
      let span_el = resForm.querySelector('.acceptance-required');
      if (!!span_el) {
        span_el.remove();
      }
      modal.close();
      dAuto();
    });
  }
});
const closeButtonModalThanks = modalThanks.querySelector('.close');
modalThanks.addEventListener('click', e => {
  const dialog = e.currentTarget;
  const isClickOnBackDrop = e.target === dialog;
  if (isClickOnBackDrop) {
    modalThanks.close();
    dAuto();
  }
});
if (closeButtonModalThanks) {
  closeButtonModalThanks.addEventListener('click', e => {
    modalThanks.close();
    dAuto();
  });
}
document.addEventListener('keydown', event => {
  if (event.key === "Escape") {
    dAuto();
  }
});
document.addEventListener('wpcf7mailsent', function (event) {
  const activeModal = event.target.closest('dialog.modal');
  if (activeModal) {
    activeModal.close();
  }
  const thanksModal = document.getElementById('modal-thanks');
  if (thanksModal) {
    thanksModal.showModal();
    dFix();
  }
}, false);
/******/ })()
;
//# sourceMappingURL=popup.js.map