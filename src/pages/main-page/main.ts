import Page from '../../core/page';
import products from '../../products.json';
// import FilterProducts from '../main-search/mainFilter';

export const arrayId: string[] = [];

export interface Product {
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

class MainPage extends Page {
  private mainContainer: HTMLElement;
  private mainContent: HTMLElement;
  private footer: HTMLElement;
  private viewHorizontal: boolean;
  private viewStandart: boolean;

  constructor (id: string) {
    super(id);
    this.mainContainer = document.querySelector('.main') as HTMLElement;
    this.mainContent = document.body; // это просто присвоение на приколе, ниже переназначено на .main__content
    this.footer = document.querySelector('.footer') as HTMLElement;
    this.viewHorizontal = false;
    this.viewStandart = true;
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

  render (arrElementRender: Product[], ids: string): HTMLElement {
    const search = document.querySelector('.header__search') as HTMLElement; // показать поиск
    search.style.display = 'flex'; // показать поиск
    this.mainContent = document.querySelector('.products__container') as HTMLElement;
    if (arrElementRender.length === 0) {
      const none = document.createElement('div');
      none.style.textAlign = 'center';
      none.style.width = '100%';
      none.style.fontSize = '32px';
      none.style.marginTop = '45px';
      none.innerText = 'Таких игр нет :(';
      this.mainContent = document.querySelector('.products__container') as HTMLElement;
      this.mainContent.append(none);
    } else {
      if (ids !== 'search') {
        this.mainContainer.innerHTML = `
        <div class="wrapper main__wrapper">
            <!--"Хлебные крошки"-->
            <div class="breadcrumbs" id="main-id">
              <ul itemscope itemtype="#">
                <li itemprop="itemListElement" itemscope itemtype="#">
                  <!-- <a href="/" id="mainPage" title="Главная" itemprop="item"> -->
                  <a href="#mainPage" id="mainPage" style="cursor: pointer;">
                    <span class="breadcrumbs__title" itemprop="name">Главная</span>
                  </a>
                  <meta itemprop="position" content="1" />
                </li>
                <li>
                  <span class="arrow"></span>
                </li>
                <li class="item-title"></li>
              </ul>
            </div>
            <div class="sort-info">
              <h2>Настольные игры</h2>
              <div class="counterItem"></div>
              <!--Сортировка-->
              <div class="sort-view">
                <span сlass="sort-title">Сортировать:</span>
                <select name="sort-select" id="sort">
                  <option value="min-price">по убыванию цены</option>
                  <option value="max-price">по возрастанию цены</option>
                  <option selected value="raiting">по популярности</option>
                  <option value="firstname">по названию (А-Я)</option>
                  <option value="lastname">по названию (Я-А)</option>
                </select>
              </div>
              <div class="product-view">
                <div class="list-view"> 
                  <img src="./img/icon-list.png" alt="List" width="25" height="25"/>
                </div>
                <div class="table-view"> 
                  <img src="./img/icon-table.png" alt="List" width="25" height="25"/>
                </div>
              </div>
            </div>
            <div class="two-columns">
              <div class="main__sidebar">
                <div class="main__sidebar_wrapper">
                  <!--Фильтрация по цене, noUislider-->
                  <div class="filter-section filter-section_price">
                    <div class="filter-section_title">Цена</div>
                    <div class="filter-section_range">
                      <div class="range">
                        <div class="price range_from">
                          <span class="line-prefix">От</span>
                          <input id="input-price-from" type="number" value="0" min="0" max="263" step="10" />
                        </div>
                        <div class="price range_to">
                          <span class="line-prefix">До</span>
                          <input id="input-price-to" type="number" value="263" min="0" max="263" step="10" />
                        </div>
                      </div>
                      <div class="slider__wrap">
                        <div id="slider-price"></div>
                      </div>
                    </div>
                  </div>
                  <!--Фильтрация по категориям-->
                  <div
                    class="filter-section filter-section_category"
                    id="categories">
                    <div class="filter-section_title">Категория</div>
                    <div class="filter-option">
                      <input type="checkbox" name="category" id="adventures" />
                      <label for="adventures">Приключения</label>
                    </div>
                    <div class="filter-option">
                      <input type="checkbox" name="category" id="cards" />
                      <label for="cards">Карточная</label>
                    </div>
                    <div class="filter-option">
                      <input type="checkbox" name="category" id="logic" />
                      <label for="logic">Головоломки</label>
                    </div>
                    <div class="filter-option">
                      <input type="checkbox" name="category" id="strategy" />
                      <label for="strategy">Стратегические игры</label>
                    </div>
                    <div class="filter-option">
                      <input type="checkbox" name="category" id="economy" />
                      <label for="economy">Экономические игры</label>
                    </div>
                    <div class="filter-option">
                      <input type="checkbox" name="category" id="detective" />
                      <label for="detective">Детективные игры</label>
                    </div>
                    <div class="filter-option">
                      <input type="checkbox" name="category" id="travel" />
                      <label for="travel">Игры в дорогу</label>
                    </div>
                  </div>
                  <!--Фильтрация по брендам-->
                  <div class="filter-section filter-section_brand" id="brand">
                    <div class="filter-section_title">Производитель</div>
                    <div class="filter-option">
                      <input type="checkbox" name="brand" id="hw" />
                      <label for="hw">Hobby World</label>
                    </div>
                    <div class="filter-option">
                      <input type="checkbox" name="brand" id="magellan" />
                      <label for="magellan">Magellan</label>
                    </div>
                    <div class="filter-option">
                      <input type="checkbox" name="brand" id="gaga" />
                      <label for="gaga">GaGa Games</label>
                    </div>
                    <div class="filter-option">
                      <input type="checkbox" name="brand" id="mattel" />
                      <label for="mattel">Mattel</label>
                    </div>
                    <div class="filter-option">
                      <input type="checkbox" name="brand" id="playlab" />
                      <label for="playlab">PlayLab</label>
                    </div>
                    <div class="filter-option">
                      <input type="checkbox" name="brand" id="piatnik" />
                      <label for="piatnik">Piatnik</label>
                    </div>
                    <div class="filter-option">
                      <input type="checkbox" name="brand" id="rightgames" />
                      <label for="rightgames">Правильные игры</label>
                    </div>
                    <div class="filter-option">
                      <input type="checkbox" name="brand" id="10kingdom" />
                      <label for="10kingdom">Десятое королевство</label>
                    </div>
                    <div class="filter-option">
                      <input type="checkbox" name="brand" id="zvezda" />
                      <label for="zvezda">Zvezda</label>
                    </div>
                  </div>
                  <!--Фильтрация по количеству игроков-->
                  <div class="filter-section filter-section_amount" id="amount">
                    <div class="filter-section_title">Количество игроков</div>
                    <div class="filter-section_range">
                      <div class="range">
                        <div class="amount range_from">
                          <span class="line-prefix">От</span>
                          <input id="input-amount-from" type="number" value="0" min="0" max="99" step="10" />
                        </div>
                        <div class="amount range_to">
                          <span class="line-prefix">До</span>
                          <input id="input-amount-to" type="number" value="99" min="0" max="99" step="10" />
                        </div>
                      </div>
                      <div class="slider__wrap">
                        <div id="slider-amount"></div>
                      </div>
                    </div>
                  </div>
                  <div class="remove_filter">
                  <button class="button button-remove">Сбросить фильтры</button>
                  </div>
                </div>
              </div>
              <div class="main__content">
                <!--Блок товара, шаблон для скрипта-->
                <div class="products__container">
                </div>
              </div>
            </div>
          </div>
        `;
      }
      this.mainContent = document.querySelector('.products__container') as HTMLElement;
      this.mainContent.innerHTML = '';
      arrElementRender.forEach((item, index) => {
        const element = document.createElement('div');
        element.id = `${++index}product`;
        element.className = 'product__item';
        arrayId.push(`${index}product`);
        const elementContent = this.createNewElement('div', 'product__item_content'); // создание оболочки элементов контейнера карты
        // const imgElementContent = this.createNewElement('div', 'product_image'); // создание оболочки для картинки
        const imgElementContent = document.createElement('a'); // создание контейнера ссылки картинки
        imgElementContent.href = `#${item.id}product`;
        imgElementContent.className = 'product_image';
        const img = document.createElement('img'); // создание картинки
        img.className = `${index}product`; // класс для картинки
        img.src = `${item.thumbnail}`; // путь для картинки
        imgElementContent.append(img); // добавление картинки в контейнер картинки (враппер)
        const productTitle = this.createNewElement('div', 'product_title', '', `${item.title}`)
        elementContent.append(imgElementContent, productTitle); // добавление картинки, названия карточки (игры)  и ценник
        elementContent.append(this.createElementListener(item)); // создание кнопки с ценником
        const productParams = this.createNewElement('div', 'product_params'); // создание контейнера для добавления параметров
        // наполнение контейнера параметрами
        // рейтинг
        const raiting = this.createNewElement('div', 'params__item raiting');
        const raitingImg = document.createElement('img');
        raitingImg.src = './img/icon-star.png';
        raitingImg.width = 20;
        raitingImg.height = 20;
        raitingImg.alt = 'Raiting';
        raiting.append(raitingImg);
        raiting.append(this.createNewElement('span', '', '', `${item.rating}`));
        // время
        const duration = this.createNewElement('div', 'params__item duration');
        const durationImg = document.createElement('img');
        durationImg.src = './img/icon-hourglass.png';
        durationImg.width = 20;
        durationImg.height = 20;
        durationImg.alt = 'Duration';
        duration.append(durationImg);
        duration.append(this.createNewElement('span', '', '', `${item.duration}`));
        // количество игроков
        const players = this.createNewElement('div', 'params__item players');
        const playersImg = document.createElement('img');
        playersImg.src = './img/icon-players.png';
        playersImg.width = 20;
        playersImg.height = 20;
        playersImg.alt = 'Duration';
        players.append(playersImg);
        players.append(this.createNewElement('span', '', '', `${item.amount}`));

        productParams.append(raiting, duration, players);
        elementContent.append(productParams); // добавление в карточку, контейнера с параметрами
        element.append(elementContent); // добавление оболочки всех элементов со всеми элементами в главный элемент
        this.mainContent.append(element); // добавление на страницу

        const value = JSON.parse(localStorage.getItem('Cart') || ''); // отрисовка кнопки, если элемент был уже вв корзине
        const btnText = document.getElementById(`${item.id}productBtn`) as HTMLElement;
        value.forEach((elem: { id: string, count: number }) => {
          if (elem.id === String(item.id)) {
            btnText.innerText = 'В корзине';
            btnText.style.background = 'rgb(238, 108, 61)';
          }
        })

        // смена вида карточек
        const tableView = document.querySelector('.table-view');
        const listView = document.querySelector('.list-view');
        const saveArr = arrElementRender;

        if (listView !== null) {
          listView.addEventListener('click', () => {
            this.viewStandart = false;
            this.viewHorizontal = true;
            console.log('сделал флаг horizontal')
            this.renderVisual(element, imgElementContent, img, productTitle, elementContent);
          })
        }
        if (tableView !== null) {
          tableView.addEventListener('click', () => {
            this.viewStandart = true;
            this.viewHorizontal = false;
            console.log('сделал флаг standart')
            this.renderVisual(element, imgElementContent, img, productTitle, elementContent);
          })
        }

        this.renderVisual(element, imgElementContent, img, productTitle, elementContent);
      });
    }
    const sortInfo = document.querySelector('.counterItem') as HTMLElement;
    const pc = document.querySelector('.products__container') as HTMLElement;
    sortInfo.innerText = `Всего игр: ${pc.childNodes.length}`;
    return this.mainContainer;
  }

  renderVisual (element: HTMLDivElement, imgElementContent: HTMLAnchorElement, img: HTMLImageElement, productTitle: HTMLElement, elementContent: HTMLElement): void {
    const listView = document.querySelector('.list-view');
    const productContainer = document.querySelector('.products__container') as HTMLDivElement;

    if (this.viewHorizontal === true && this.viewStandart === false && listView !== null) {
      console.log('зашел в иф горизонтал')
      productContainer.style.flexDirection = 'column';
      productContainer.style.flexWrap = 'nowrap';
      element.style.maxWidth = '100%';
      element.style.minHeight = '200px';
      element.style.maxHeight = '300px';
      imgElementContent.style.flex = '0.6';
      elementContent.style.flexDirection = 'row';
      img.style.width = '180px';
      img.style.height = '200px';
      productTitle.style.width = '150px';
    }

    if (this.viewHorizontal === false && this.viewStandart === true && listView !== null) {
      productContainer.style.flexDirection = 'row';
      productContainer.style.flexWrap = 'wrap';
      element.style.maxWidth = '310px';
      element.style.minHeight = '453px';
      imgElementContent.style.flex = '1';
      elementContent.style.flexDirection = 'column';
      img.style.width = '85%';
      img.style.height = '85%';
      productTitle.style.width = '100%';
    }
  }
}

export default MainPage;