import products from '../products.json'
import Cart from './cart'
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
abstract class Page {
  private container: HTMLElement;
  private id: string;
  private price: HTMLElement;
  private priceElement: HTMLElement;
  private cart: Cart;

  constructor (id: string) {
    this.id = id;
    this.container = document.querySelector('.main') as HTMLElement;
    this.price = document.body;
    this.priceElement = document.body;
    this.cart = new Cart();
  }

  createNewElement (tagName: string, className: string, idName?: string, text?: string): HTMLElement {
    const element = document.createElement(tagName);
    if (className !== '') {
      element.className = className;
    }
    if (idName != null) {
      if (idName !== '') {
        element.id = idName;
      }
    }
    if (text != null) {
      element.innerText = text;
    }
    return element;
  }

  createElementListener (item: Product): HTMLElement {
    this.price = document.createElement('div');
    this.price.className = 'product_price button';
    this.price.id = `${item.id}productBtn`
    this.price.innerText = `${item.price} руб`;
    // this.cart.removeCart('0'); // почистить массив, перед добавлением
    this.cart.viewCountCart();

    this.price.addEventListener('click', (event) => {
      const element = document.getElementById(`${item.id}productBtn`) as HTMLElement;
      this.checkElem(element, item);
    })
    return this.price;
  }

  checkElem (element: HTMLElement, item: Product): void {
    if (element.innerText === 'В корзине') {
      this.cart.removeCart(item.id.toString())
      this.refactorElement(element, 'rgb(242, 208, 97)', `${item.price} руб`);
    } else {
      this.cart.addCart(item.id.toString(), 1, item.price);
      this.refactorElement(element, 'red', 'В корзине');
    }
  }

  refactorElement (element: HTMLElement, color: string, text: string): void {
    element.innerText = text;
    element.style.backgroundColor = color;
    this.cart.viewCountCart();
  }

  render (products: Product[], ids: string): HTMLElement {
    return this.container;
  }
}

export default Page;