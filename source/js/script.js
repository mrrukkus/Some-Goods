const popupForm =  document.querySelector('.popup-form');
const closePopupButton = document.querySelector('.popup-form__close');
const popupOverlay = document.querySelector('.popup-form__overlay');
const callbackButton = document.querySelector('.contacts__callback');
const inputName = document.querySelector('.popup-form__form-name');
const anchors = document.querySelectorAll('a');
const popupName = document.querySelector('.popup-form__form-name');
const popupPhone = document.querySelector('.popup-form__form-phone');
const popupQuestion = document.querySelector('.popup-form__form-question');
const popupSubmitButton = document.querySelector('.popup-form__form-submit');

const openPopupHandler = function (event) {
  const closePopup = function () {
    popupForm.classList.add('popup-form--disabled');
    window.removeEventListener('keydown', closePopupKeyHandler)
  }
  const closePopupHandler = function () {
    closePopup();
  }
  const closePopupKeyHandler = function (event) {
    const KEY_ESC = 27;
    if (event.keyCode === KEY_ESC) {
      closePopup();
    }
  }
  const submitFormHandler = function (evt) {
    evt.preventDefault();
    localStorage.setItem('name', popupName.value);
    localStorage.setItem('phone', popupName.value);
    localStorage.setItem('question', popupQuestion.value);
    console.log(localStorage);
    closePopup();
  }


  popupForm.classList.remove('popup-form--disabled');
  inputName.focus();
  closePopupButton.addEventListener('click', closePopupHandler);
  popupOverlay.addEventListener('click', closePopupHandler);
  window.addEventListener('keydown',closePopupKeyHandler);
  popupSubmitButton.addEventListener('click', submitFormHandler);
};

Array.prototype.forEach.call(anchors, function (anchor) {
  if (anchor.id) {
    let targetOfAnchor = document.querySelector('.' + anchor.id);

    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      targetOfAnchor.scrollIntoView({block:'center', behavior: 'smooth'});
    });
  };
});

window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.phone-mask'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7(___)_______",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 3 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });
});

callbackButton.addEventListener('click', openPopupHandler);
