import Description from '../../core/description';
import products from '../../products.json';
import Cart from '../../core/cart';

class CardDescriptionPage extends Description {
  private readonly card: HTMLElement;
  private readonly ids: number;
  private readonly itemTitle: HTMLElement;
  private readonly header: HTMLElement;
  private readonly body: HTMLElement;
  private readonly footer: HTMLElement;
  private readonly main: HTMLElement;
  private readonly mainWrap: HTMLElement;
  private cart: Cart;

  constructor (ids: string) {
    super(ids);
    this.ids = parseInt(ids);
    // this.ids--;
    this.card = document.getElementById('main-id') as HTMLElement; // если добавление после ноды, но текст сьезжает за футер
    this.itemTitle = document.querySelector('.item-title') as HTMLElement;
    this.mainWrap = document.querySelector('.main__wrapper') as HTMLElement;// сохранение main-wrapper
    this.header = document.querySelector('.header') as HTMLElement;
    this.main = document.querySelector('.main') as HTMLElement;
    this.footer = document.querySelector('.footer') as HTMLElement;
    this.body = document.body;
    this.cart = new Cart();
  }

  render (): HTMLElement {
    const search = document.querySelector('.header__search') as HTMLElement; // прятать поиск
    search.style.display = 'none'; // прятать поиск
    this.body.innerHTML = ''; // очистка боди, для новго заполнения
    this.body.append(this.header); // добавление сохраненного хедера на страницу
    this.mainWrap.innerHTML = ''; // очистка всего что в мэин
    this.mainWrap.append(this.card); // добавление строки роутинга

    // наполнение страницы нужными элементами (переделать под цикл в будущем)
    // добавляем название игры
    this.mainWrap.append(this.createElement('div', `card${this.ids} product_title_description`, `${products.filter(elem => elem.id === this.ids)[0].title}`));
    this.mainWrap.append(this.createElement('div', `card${this.ids} product_item_description`, `${products.filter(elem => elem.id === this.ids)[0].description}`));
    // добавляем основной контейнер для наполнения
    const container = document.createElement('div') as HTMLElement;
    container.className = 'product_container_description';
    this.mainWrap.append(container);

    // добавление картинок
    const img = document.createElement('div') as HTMLElement;
    img.className = 'product_image_description';
    container.append(img);

    const anotherImg = document.createElement('div') as HTMLElement;
    anotherImg.className = 'product_another-image_description';
    img.append(anotherImg);

    const mainImg = document.createElement('div') as HTMLElement;
    mainImg.className = 'product_main-image_description';
    img.append(mainImg);

    products.filter(elem => elem.id === this.ids)[0].images.forEach((item, index) => {
      const image = document.createElement('img');
      image.src = item;
      image.className = `imageCard${this.ids}`
      if (index === 0) {
        mainImg.append(image);
      } else {
        anotherImg.append(image);
      }
    });

    // добавляем контейнер для основной информации об игре
    const info = document.createElement('div') as HTMLElement;
    info.className = 'product_info_description';
    container.append(info);

    // info.append(this.createElement('div', `card${this.ids} product_item_description`, `Описание: ${products.filter(elem => elem.id === this.ids)[0].description}`));
    info.append(this.createElement('div', `card${this.ids} product_item_description`, `Рейтинг: ${products.filter(elem => elem.id === this.ids)[0].rating}`));
    info.append(this.createElement('div', `card${this.ids} product_item_description`, `Производитель: ${products.filter(elem => elem.id === this.ids)[0].brand}`));
    info.append(this.createElement('div', `card${this.ids} product_item_description`, `Категория: ${products.filter(elem => elem.id === this.ids)[0].category}`));
    info.append(this.createElement('div', `card${this.ids} product_item_description`, `Продолжительность: ${products.filter(elem => elem.id === this.ids)[0].duration} минут`));
    info.append(this.createElement('div', `card${this.ids} product_item_description`, `Количество игроков: ${products.filter(elem => elem.id === this.ids)[0].amount} чел.`));
    info.append(this.createElement('div', `card${this.ids} product_item_description`, `Возраст: ${products.filter(elem => elem.id === this.ids)[0].old} лет`));

    // добавляем контейнер для цены товара и кнопки добавить в корзину
    const price = document.createElement('div') as HTMLElement;
    price.className = 'product_price_description';
    container.append(price);
    price.append(this.createElement('div', `card${this.ids} product_price_description`, `Цена: ${products.filter(elem => elem.id === this.ids)[0].price} руб.`));

    // добавляем кнопки корзины
    const btn = document.createElement('button') as HTMLElement;
    btn.className = 'button product_button_description';
    btn.innerText = 'Добавить в корзину';
    price.append(btn);

    // добавление названия в роутинг на странице
    this.itemTitle.innerText = products.filter(elem => elem.id === this.ids)[0].title; // создание в ветке роутинга, нового названия
    this.body.append(this.main); // добавление мэин в боди
    this.body.append(this.footer); // добавление футера после мэин в боди

    const value = JSON.parse(localStorage.getItem('Cart') || ''); // отрисовка кнопки, если элемент был уже вв корзине
    const btnText = document.querySelector('.product_button_description') as HTMLElement;
    console.log(btnText)
    let idCard = products[this.ids].id;
    --idCard;
    value.forEach((elem: { id: string, count: number }) => {
      console.log('цикл', elem.id, ' ', idCard)
      if (elem.id === String(idCard)) {
        console.log('зашел', elem.id, ' ', idCard)
        btnText.innerText = 'В корзине';
        btnText.style.background = 'red';
      }
    })
    btnText.onclick = () => {
      if (btnText.innerText === 'В корзине') {
        btnText.style.color = '';
        btnText.innerText = 'Добавить в корзину';
        btnText.style.background = 'rgb(242, 208, 97)';
        this.cart.removeCart(String(idCard));
        localStorage.setItem('Cart', JSON.stringify(this.cart.allCart));
        this.cart.viewCountCart();
        // удалить из корщины
      } else {
        btnText.innerText = 'В корзине';
        btnText.style.background = 'red';
        let idCardMin = idCard;
        this.cart.addCart(String(idCard), 1, products[--idCardMin].price)
        localStorage.setItem('Cart', JSON.stringify(this.cart.allCart));
        this.cart.viewCountCart();
        // добавить в корзину
      }
    }

    return this.body; // возвращаем готовый боди
  }
}

export default CardDescriptionPage;
