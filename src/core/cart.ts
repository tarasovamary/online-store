import products from '../products.json';
import ModalFrame from '../pages/cart-modal/cart-modal';
interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  brand: string
  category: string
  duration: number
  amount: number
  old: number
  thumbnail: string
  images: string[]
}

class Cart {
  public allCart: [{ 'id': string, 'count': number, price: number }];
  private mainWrap: HTMLElement;
  private main: HTMLElement;
  private itemTitle: HTMLElement;
  private res: number;
  private resultSum: HTMLElement;
  private modalFrame: ModalFrame;

  constructor () {
    if (localStorage.getItem('Cart') === null) {
      this.allCart = [] as unknown as [{ 'id': string, 'count': number, price: number }];
      localStorage.setItem('Cart', JSON.stringify(this.allCart));
    } else {
      this.allCart = JSON.parse(localStorage.getItem('Cart') || '');
    }
    // this.allCart = JSON.parse(localStorage.getItem('Cart') || '');
    this.mainWrap = document.querySelector('.main__wrapper') as HTMLElement;
    this.itemTitle = document.querySelector('.item-title') as HTMLElement;
    this.main = document.querySelector('.main') as HTMLElement;
    this.res = 0;
    this.modalFrame = new ModalFrame();
    this.resultSum = document.createElement('div') as HTMLElement;
  }

  addCart (id: string, counter: number, pricee: number): [{ 'id': string, 'count': number, 'price': number }] {
    if (id === '0') {
      this.removeCart(id);
      return this.allCart;
    } else {
      this.allCart.push({ id: id, count: counter, price: pricee });
      console.log(this.allCart)
      return this.allCart;
    }
  }

  removeCart (id: string): void {
    console.log('id')
    console.log(id);
    this.allCart.forEach((item, index) => {
      if (item.id === id) {
        this.allCart.splice(index, 1)
      }
    })
  }

  viewCountCart (): void {
    const counter = document.querySelector('.header__shoping-cart_count') as HTMLElement;
    localStorage.setItem('Cart', JSON.stringify(this.allCart));
    if (localStorage.getItem('Cart') !== null || localStorage.getItem('Cart')?.length !== 0) {
      this.allCart = JSON.parse(localStorage.getItem('Cart') || ''); // в процессе, чтобы значение в счетчике обновлялось автоматически
    }
    let result = 0;
    this.allCart.forEach(element => {
      result += element.count;
    })
    counter.innerText = `${result}`;
    const counterPrice = document.querySelector('.header__shoping-cart_countPrice') as HTMLElement;
    let resultPrice = 0;
    this.allCart.forEach(element => {
      resultPrice += element.price * element.count;
    })
    counterPrice.innerText = `${resultPrice} руб.`;
  }

  render (prod: Product[], str: string): HTMLElement {
    const search = document.querySelector('.header__search') as HTMLElement; // прятать поиск
    search.style.display = 'none'; // прятать поиск
    const globalCont = document.createElement('div');
    globalCont.className = 'global-cont';
    const local = localStorage.getItem('Cart');

    const titDesc = document.querySelector('.product_title_description');
    const itemDesc = document.querySelector('.product_item_description');
    const contDesc = document.querySelector('.product_container_description');
    titDesc?.remove();
    itemDesc?.remove();
    contDesc?.remove();

    if (local !== null) {
      this.allCart = JSON.parse(local);
    }
    const containerCart: HTMLElement = document.createElement('div');
    containerCart.className = 'all-cart-container';
    if (local !== null) {
      this.allCart = JSON.parse(local);
    }
    this.allCart.forEach((element, index) => { // создание карточек в корзине
      const gameContainer = document.createElement('div');
      gameContainer.className = 'game-container';
      gameContainer.style.display = 'flex';
      let id = Number(element.id);
      const testId = prod[--id]
      const gameImg = document.createElement('img');
      gameImg.src = `${testId.thumbnail}`;
      gameImg.className = 'game-image';

      const gameTitle = document.createElement('div');
      gameTitle.innerText = `${prod[id].title}`;
      gameTitle.className = 'game-title';

      const gamePrice = document.createElement('div');
      gamePrice.innerText = `${prod[id].price} руб. за 1 шт.`;
      gamePrice.className = 'game-price';

      const gameBtnCountMinus = document.createElement('div');
      gameBtnCountMinus.className = 'game-count-plus count-minus';
      gameBtnCountMinus.innerText = '-';
      gameBtnCountMinus.style.cursor = 'pointer';
      gameBtnCountMinus.addEventListener('click', () => {
        let count = Number(gameCountContainer.value);
        --count;
        if (count === 0) {
          // this.removeCart(element.id);
          this.allCart.splice(index, 1);
          // this.allCart = this.allCart;
          localStorage.setItem('Cart', JSON.stringify(this.allCart));
          globalCont.innerHTML = '';
          this.render(products, 'mainPage');
          this.viewCountCart();
          this.getSum();
        } else {
          gameCountContainer.value = `${count}`
          try {
            this.allCart[index].count = Number(gameCountContainer.value);
          } catch (all) {
          }
          localStorage.setItem('Cart', JSON.stringify(this.allCart));
          this.getSum();
        }
        this.viewCountCart();
      })

      const gameCountContainer = document.createElement('input');
      gameCountContainer.type = 'number';
      gameCountContainer.min = '0'
      gameCountContainer.className = 'game-count-container';
      gameCountContainer.style.height = '25px'
      gameCountContainer.value = `${element.count}`

      gameCountContainer.oninput = () => {
        console.log(element)
        this.allCart[index].count = Number(gameCountContainer.value);
        localStorage.setItem('Cart', JSON.stringify(this.allCart));
        this.getSum();
      }

      if (str !== 'zero') {
        const count = Number(gameCountContainer.value);
        if (count === 0) {
          // this.removeCart(element.id);
          this.allCart.splice(index, 1)
          localStorage.setItem('Cart', JSON.stringify(this.allCart));
          globalCont.innerHTML = '';
          this.render(products, 'zero');
        }
      }

      const gameBtnCountPlus = document.createElement('div');
      gameBtnCountPlus.className = 'game-count-plus count-plus';
      gameBtnCountPlus.style.cursor = 'pointer';
      gameBtnCountPlus.innerText = '+';
      gameBtnCountPlus.addEventListener('click', () => {
        let count = Number(gameCountContainer.value);
        gameCountContainer.value = `${++count}`
        this.allCart[index].count = Number(gameCountContainer.value);
        localStorage.setItem('Cart', JSON.stringify(this.allCart));
        this.getSum();
        this.viewCountCart();
      })

      gameContainer.append(gameImg, gameTitle, gamePrice, gameBtnCountMinus, gameCountContainer, gameBtnCountPlus);
      containerCart.append(gameContainer);
    });
    this.itemTitle.innerText = 'Корзина';
    const btnBuy = document.createElement('div');
    btnBuy.className = 'btn-buy';
    btnBuy.innerText = 'Купить';
    btnBuy.style.cursor = 'pointer';

    btnBuy.addEventListener('click', () => {
      this.modalFrame.render();
      this.modalFrame.toggleWindow();
    })

    globalCont.append(containerCart, btnBuy)
    this.mainWrap.append(globalCont); // добавление контейнера корзины на страницу
    this.main.append(this.mainWrap);
    this.getSum();
    return this.main;
  }

  getSum (): void {
    this.resultSum.className = 'result-sum'
    this.res = 0;
    this.allCart.forEach(element => {
      let elemId = +element.id
      if (element.id === String(products[--elemId].id)) {
        this.res += products[Number(elemId)].price * element.count;
      }
    })

    const temp = document.querySelector('.btn-buy') as HTMLElement;
    this.resultSum.innerText = `Итого: ${this.res} руб.`;
    temp.before(this.resultSum);
  }
}

export default Cart;