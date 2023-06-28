import Modal from '../../core/modal';
import Cart from '../../core/cart';
class ModalFrame extends Modal {
  private readonly body: HTMLElement;
  private readonly mainWrap: HTMLElement;
  // private cart: Cart;

  constructor () {
    super();
    this.body = document.body;
    this.mainWrap = document.querySelector('.main__wrapper') as HTMLElement;
    // this.cart = new Cart();
  }

  render (): HTMLElement {
    const modalOverlay = this.createDivElement('div', 'modal__overlay');
    this.mainWrap.append(modalOverlay);

    const modalContainer = this.createDivElement('div', 'modal__window');
    this.mainWrap.append(modalContainer);

    const modalContent = this.createDivElement('div', 'modal__content');
    modalContainer.append(modalContent);

    const personalDetails = this.createDivElement('div', 'modal__title', 'Контактные данные');
    modalContent.append(personalDetails);

    const inputsContainer = this.createDivElement('div', 'inputs__container');
    modalContent.append(inputsContainer);

    const personFirstName = this.createInputElement('input', 'personal-name input', 'Имя и Фамилия', 'text', 100)
    inputsContainer.append(personFirstName);
    const phoneNumber = this.createInputElement('input', 'personal-phone input', 'Телефон', 'text', 13);
    inputsContainer.append(phoneNumber);
    const personAddress = this.createInputElement('input', 'personal-address input', 'Адрес доставки', 'text', 100);
    inputsContainer.append(personAddress);
    const personEmail = this.createInputElement('input', 'personal-email input', 'E-mail', 'text', 100);
    inputsContainer.append(personEmail);

    const cardDetails = this.createDivElement('div', 'modal__title', 'Данные карты');
    modalContent.append(cardDetails);

    const cardContainer = this.createDivElement('div', 'card__container');
    modalContent.append(cardContainer);

    const imgContainer = this.createDivElement('div', 'card__container_icon');
    cardContainer.append(imgContainer);
    const imgChip = document.createElement('img');
    imgChip.src = './img/icon-chip.png';
    imgChip.alt = 'Chip Icon';
    imgChip.className = 'chip-icon';
    imgContainer.append(imgChip);

    const cardContainerNumber = this.createDivElement('div', 'card__container_number');
    cardContainer.append(cardContainerNumber);

    const cardNumber = this.createInputElement('input', 'card-number input', 'XXXX XXXX XXXX XXXX', 'text', 19)
    cardContainerNumber.append(cardNumber);

    const cardContainerValid = this.createDivElement('div', 'card__container_valid');
    cardContainer.append(cardContainerValid);
    cardContainerValid.append(this.createDivElement('div', 'title_valid', 'VALID THRU:'))
    const cardExpired = this.createInputElement('input', 'card-expired input', '', 'text', 5);
    cardContainerValid.append(cardExpired);
    cardContainerValid.append(this.createDivElement('div', 'title_cvv', 'CVV:'))
    const cvvNumber = this.createInputElement('input', 'card-cvv input', '', 'text', 3);
    cardContainerValid.append(cvvNumber);

    const buttonModal = document.createElement('button');
    buttonModal.className = 'button button_modal'
    buttonModal.innerText = 'Подтвердить';
    modalContent.append(buttonModal);

    // оформление заказа
    buttonModal.addEventListener('click', () => {
      if (personEmail.style.borderColor === 'green' &&
     cardNumber.style.borderColor === 'green' &&
     personFirstName.style.borderColor === 'green' &&
     personAddress.style.borderColor === 'green' &&
     cvvNumber.style.borderColor === 'green' &&
     cardExpired.style.borderColor === 'green' &&
     phoneNumber.style.borderColor === 'green') {
      // очитска корзины и переход на главную
      // this.cart.allCart = [] as unknown as [{ id: string, count: number }];
      localStorage.setItem('Cart', JSON.stringify([]));
      window.location.hash = '#mainPage';
        alert('Заказ оформлен!');
      }
    })

    // если поля не заполнены
    buttonModal.addEventListener('click', () => {
      if (!(cardNumber as HTMLInputElement).value) {
        cardNumber.style.borderColor = 'red';
      }
      if (!(cardExpired as HTMLInputElement).value) {
        cardExpired.style.borderColor = 'red';
      }
      if (!(cvvNumber as HTMLInputElement).value) {
        cvvNumber.style.borderColor = 'red';
      }
      if (!(personAddress as HTMLInputElement).value) {
        personAddress.style.borderColor = 'red';
      }
      if (!(phoneNumber as HTMLInputElement).value) {
        phoneNumber.style.borderColor = 'red';
      }
      if (!(personFirstName as HTMLInputElement).value) {
        personFirstName.style.borderColor = 'red';
      }
      if (!(personEmail as HTMLInputElement).value) {
        personEmail.style.borderColor = 'red';
      }
    })

    if (cardExpired !== null) {
      cardExpired.addEventListener('input', (event: Event) => {
        (event.target as HTMLInputElement).value = this.expireFormat((event.target as HTMLInputElement).value);
      })

      if (cardNumber !== null) {
        cardNumber.addEventListener('input', (event: Event) => {
          (event.target as HTMLInputElement).value = this.numberFormat((event.target as HTMLInputElement).value);
          (event.target as HTMLInputElement).value = this.numbersCard((event.target as HTMLInputElement).value);
          const valid = this.validNumberCard((event.target as HTMLInputElement).value);
          if (valid) {
            cardNumber.style.borderColor = 'green'
          } else {
            cardNumber.style.borderColor = 'red'
          }
          if ((event.target as HTMLInputElement).value === '') {
            cardNumber.style.borderColor = 'rgb(77, 77, 77)'
          }
        })

        if (personEmail !== null) {
          personEmail.addEventListener('input', (event: Event) => {
            const valid = this.validEmail((event.target as HTMLInputElement).value);
            if (valid) {
              personEmail.style.borderColor = 'green'
            } else {
              personEmail.style.borderColor = 'red'
            }
            if ((event.target as HTMLInputElement).value === '') {
              personEmail.style.borderColor = 'rgb(77, 77, 77)'
            }
          })
        }

        if (personFirstName !== null) {
          personFirstName.addEventListener('input', (event: Event) => {
            const valid = this.validName((event.target as HTMLInputElement).value);
            if (valid) {
              personFirstName.style.borderColor = 'green'
            } else {
              personFirstName.style.borderColor = 'red'
            }
            if ((event.target as HTMLInputElement).value === '') {
              personFirstName.style.borderColor = 'rgb(77, 77, 77)'
            }
          })
        }

        if (phoneNumber !== null) {
          phoneNumber.addEventListener('input', (event: Event) => {
            const valid = this.validPhoneNumber((event.target as HTMLInputElement).value);
            (event.target as HTMLInputElement).value = this.numbers((event.target as HTMLInputElement).value);
            if (valid) {
              phoneNumber.style.borderColor = 'green'
            } else {
              phoneNumber.style.borderColor = 'red'
            }
            if ((event.target as HTMLInputElement).value === '') {
              phoneNumber.style.borderColor = 'rgb(77, 77, 77)'
            }
          })
        }

        if (personAddress !== null) {
          personAddress.addEventListener('input', (event: Event) => {
            const valid = this.validAddress((event.target as HTMLInputElement).value);
            if (valid) {
              personAddress.style.borderColor = 'green'
            } else {
              personAddress.style.borderColor = 'red'
            }
            if ((event.target as HTMLInputElement).value === '') {
              personAddress.style.borderColor = 'rgb(77, 77, 77)'
            }
          })
        }

        if (cvvNumber !== null) {
          cvvNumber.addEventListener('input', (event: Event) => {
            const valid = this.validCvv((event.target as HTMLInputElement).value);
            (event.target as HTMLInputElement).value = this.numbersCard((event.target as HTMLInputElement).value);
            if (valid) {
              cvvNumber.style.borderColor = 'green'
            } else {
              cvvNumber.style.borderColor = 'red'
            }
            if ((event.target as HTMLInputElement).value === '') {
              cvvNumber.style.borderColor = 'rgb(77, 77, 77)'
            }
          })
        }

        if (cardExpired !== null) {
          cardExpired.addEventListener('input', (event: Event) => {
            const valid = this.validData((event.target as HTMLInputElement).value);
            if (valid) {
              cardExpired.style.borderColor = 'green'
            } else {
              cardExpired.style.borderColor = 'red'
            }
            if ((event.target as HTMLInputElement).value === '') {
              cardExpired.style.borderColor = 'rgb(77, 77, 77)'
            }
          })
        }
      }
    }

    return this.body;
  }

  expireFormat (num: string): string {
    return num.replace(
      /[^0-9]/g, '' // только цифры
    ).replace(
      /^([2-9])$/g, '0$1' // перевод если 3 > 03
    ).replace(
      /^(1{1})([3-9]{1})$/g, '0$1/$2' // 13 > 01/3
    ).replace(
      /^0{1,}/g, '0' // перевод если 00 > 0
    ).replace(
      /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, '$1/$2' // перевод если 113 > 11/3
    );
  }

  numberFormat (num: string): string {
    const v = num.replace(/\s+/g, '').replace(/[^0-9]/gi, '') // для формата хххх хххх хххх хххх
    const matches = v.match(/\d{4,16}/g);
    const match = (matches != null) && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length > 0) {
      return parts.join(' ')
    } else {
      return num;
    }
  }

  numbers (num: string): string {
    return num.replace(
      /[^0-9,+]/g, '' // только цифры
    )
  }

  numbersCard (num: string): string {
    return num.replace(
      /[^0-9]/g, '' // только цифры
    )
  }

  validEmail (name: string): boolean {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return EMAIL_REGEXP.test(name);
  }

  validName (name: string): boolean {
    const NAME_REGEXP = /(^[A-Z][a-z]{2,14} [A-Z][a-z]{2,14}$)|(^[А-Я][а-я]{2,14} [А-Я][а-я]{2,14}$)/; // имя с большой буквы и на русском
    return NAME_REGEXP.test(name);
  }

  validNumberCard (number: string): boolean {
    const NUMBER_CARD_REGEXP = /\b(?:\d{4}[ -]?){3}(?=\d{4}\b)(?:\d{4})/;
    return NUMBER_CARD_REGEXP.test(number);
  }

  validPhoneNumber (number: string): boolean {
    const NUMBER_PHONE_REGEXP = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/; // номер телефона с +375...
    return NUMBER_PHONE_REGEXP.test(number);
  }

  validAddress (number: string): boolean {
    const ADDRESS_REGEXP = /(^[A-Z][a-z]{4,14} [A-Z][a-z]{4,14} [A-Z][a-z]{4,14}$)|(^[А-Я][а-я]{4,14} [А-Я][а-я]{4,14} [А-Я][а-я]{4,14}$)/; // адрес
    return ADDRESS_REGEXP.test(number);
  }

  validCvv (number: string): boolean {
    const CVV_REGEXP = /^[0-9]{3,4}$/;
    return CVV_REGEXP.test(number);
  }

  validData (number: string): boolean {
    const DATA_REGEXP = /^(0[1-9]|1[0-2])\/?([2-9]{2})$/;
    return DATA_REGEXP.test(number);
  }

  toggleWindow (): void {
    const overlay = document.querySelector('.modal__overlay') as HTMLDivElement;
    const window = document.querySelector('.modal__window') as HTMLDivElement;
    overlay.addEventListener('click', (event: Event) => {
      window.remove();
      overlay.remove();
    })
  }
}

export default ModalFrame;
