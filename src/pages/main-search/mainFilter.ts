import products from '../../products.json';
import MainPage, { Product } from '../main-page/main';
import * as noUiSlider from '../../../node_modules/nouislider';

class FilterProducts {
  private id: string;
  private filterCheckBrand: HTMLInputElement[];
  private filterCheckCategory: HTMLInputElement[];
  private mainPage: MainPage;
  private arrSort: Product[];

  constructor (id: string) {
    this.id = id;
    this.filterCheckBrand = [];
    this.filterCheckCategory = [];
    this.mainPage = new MainPage('search');
    this.arrSort = [];
  }

  checkOption (): void {
    const checkboxesBrand = Array.from(document.getElementsByName('brand')) as HTMLInputElement[];
    const checkboxesCategory = Array.from(document.getElementsByName('category')) as HTMLInputElement[];

    checkboxesCategory.forEach(check => {
      check.addEventListener('change', () => {
        this.filterCheckCategory = checkboxesCategory.filter(item => item.checked);
        this.getFilter();
      })
    })

    checkboxesBrand.forEach(check => {
      check.addEventListener('change', () => {
        this.filterCheckBrand = checkboxesBrand.filter(item => item.checked);
        this.getFilter();
      })
    })
  }

  getSortOption (id: string): void {
    const selectOption = document.getElementById(id) as HTMLSelectElement;
    selectOption.addEventListener('change', (event) => {
      console.log('select', selectOption.value);
      if (this.arrSort.length === 0) {
        this.arrSort = products;
      }
      if (selectOption.value === 'raiting') {
        this.sortByRaiting(this.arrSort);
      }
      if (selectOption.value === 'min-price') {
        this.sortByMinPrice(this.arrSort);
      }
      if (selectOption.value === 'max-price') {
        this.sortByMaxPrice(this.arrSort);
      }
      if (selectOption.value === 'firstname') {
        this.sortByFirstName(this.arrSort);
      }
      if (selectOption.value === 'lastname') {
        this.sortByLastName(this.arrSort);
      }
    })
  }

  sortByFirstName (arr: Product[]): void {
    const sorted = arr.sort((a, b) => a.title > b.title ? 1 : -1);
    console.log('name', sorted);
    this.mainPage.render(sorted, 'search');
  }

  sortByLastName (arr: Product[]): void {
    const sorted = arr.sort((a, b) => a.title < b.title ? 1 : -1);
    console.log('lastname', sorted);
    this.mainPage.render(sorted, 'search');
  }

  sortByRaiting (arr: Product[]): void {
    const sorted = arr.sort((a, b) => {
      return b.rating - a.rating;
    });
    console.log('raiting', sorted);
    this.mainPage.render(sorted, 'search');
  }

  sortByMaxPrice (arr: Product[]): void {
    const sorted = arr.sort((a, b) => {
      return a.price - b.price;
    });
    console.log('maxprice', sorted);
    this.mainPage.render(sorted, 'search');
  }

  sortByMinPrice (arr: Product[]): void {
    const sorted = arr.sort((a, b) => {
      return b.price - a.price;
    });
    console.log('minprice', sorted);
    this.mainPage.render(sorted, 'search');
  }

  getFilter (): Product[] {
    const arrCheckedRus: string[] = [];
    const arrChecked = [...this.filterCheckBrand, ...this.filterCheckCategory];

    arrChecked.forEach(item => {
      arrCheckedRus.push(this.getCurrentLabelCategory(item.id));
      arrCheckedRus.push(this.getCurrentLabelBrand(item.id));
    })

    let arr: Product[] = [];
    if (this.filterCheckCategory.length > 0) {
      arr = products.filter(item => arrCheckedRus.includes(item.category));
    }

    if (this.filterCheckBrand.length > 0) {
      if (this.filterCheckCategory.length === 0) {
        arr = products.filter(item => arrCheckedRus.includes(item.brand));
      }
      // console.log(arr.filter(item => arrCheckedRus.includes(item.brand)))
      this.mainPage.render(arr.filter(item => arrCheckedRus.includes(item.brand)), 'search');
      this.arrSort = arr;
      return arr.filter(item => arrCheckedRus.includes(item.brand));
    }

    if (this.filterCheckBrand.length === 0 && this.filterCheckCategory.length === 0) {
      this.mainPage.render(products, 'search');
      this.arrSort = products;
      return products
    }
    this.arrSort = arr;
    this.mainPage.render(arr, 'search');
    return arr
  }

  getCurrentLabelCategory (str: string): string {
    switch (str) {
      case 'adventures': return 'Приключения';
      case 'cards': return 'Карточная';
      case 'logic': return 'Головоломки';
      case 'strategy': return 'Стратегические игры';
      case 'economy': return 'Экономические игры';
      case 'detective': return 'Детективные игры';
      case 'travel': return 'Игры в дорогу';
      default: return 'Нет такой категории'
    }
  }

  getCurrentLabelBrand (str: string): string {
    switch (str) {
      case 'hw': return 'Hobby World';
      case 'magellan': return 'Magellan';
      case 'gaga': return 'GaGa Games';
      case 'mattel': return 'Mattel';
      case 'playlab': return 'PlayLab';
      case 'piatnik': return 'Piatnik';
      case 'rightgames': return 'Правильные игры';
      case '10kingdom': return 'Десятое королевство';
      case 'zvezda': return 'Zvezda';
      default: return 'Нет такого бренда'
    }
  }
// g

  noSlider (): void {
    this.arrSort = products;
    const sliderPrice = document.getElementById('slider-price') as HTMLDivElement;

    const sliderPr = noUiSlider.create(sliderPrice, {
      start: [0, 263],
      connect: true,
      range: {
        min: 0,
        max: 263
      },
      tooltips: false,
      format: {
        from: function (value) {
          return parseInt(value);
        },
        to: function (value) {
          return Math.floor(value);
        }
      }
    });

    const rangePriceFrom = document.getElementById('input-price-from') as HTMLInputElement;
    const rangePriceTo = document.getElementById('input-price-to') as HTMLInputElement;

    if (sliderPrice instanceof HTMLDivElement) {
      sliderPr.on('update', (values, handler) => {
        const allValues: number[] | string[] = [];
        allValues[handler] = values[handler].toString();
        rangePriceFrom.value = values[0].toString()
        rangePriceTo.value = values[1].toString()

        const arrPrice: Product[] = [];
        this.arrSort.forEach(element => {
          if (rangePriceFrom.value === rangePriceTo.value) {
            arrPrice.length = 0;
            const clear = document.querySelector('.products__container') as HTMLElement;
            clear.innerHTML = '';
            const none = document.createElement('div');
            none.style.textAlign = 'center';
            none.style.width = '100%';
            none.style.fontSize = '32px';
            none.style.marginTop = '45px';
            none.innerText = 'Таких игр нет :(';
            clear.append(none);
          }
          if (element.price >= Number(rangePriceFrom.value) && element.price <= Number(rangePriceTo.value)) {
            arrPrice.push(element);
          }
        })
        // this.arrSort = arrPrice;
        console.log('прайс')
        console.log(arrPrice)
        if (arrPrice.length !== 0) {
          this.mainPage.render(arrPrice, 'search')
        }
        // console.log('price', arrPrice);
      })
    }

    /* noUiSlider на количесвто товара */

    const sliderAmount = document.getElementById('slider-amount') as HTMLDivElement;

    const sliderAm = noUiSlider.create(sliderAmount, {
      start: [0, 16],
      connect: true,
      range: {
        min: 0,
        max: 16
      },
      tooltips: false,
      format: {
        from: function (value) {
          return parseInt(value);
        },
        to: function (value) {
          return Math.floor(value);
        }
      }
    });
    const rangeAmountFrom = document.getElementById('input-amount-from') as HTMLInputElement;
    const rangeAmountTo = document.getElementById('input-amount-to') as HTMLInputElement;

    if (sliderAmount instanceof HTMLDivElement) {
      sliderAm.on('update', (values, handler) => {
        const allValues: number[] | string[] = [];
        // console.log(values[handler].toString());
        allValues[handler] = values[handler].toString();
        rangeAmountFrom.value = values[0].toString();
        rangeAmountTo.value = values[1].toString();

        const arrAmount: Product[] = [];
        this.arrSort.forEach(element => {
          if (rangePriceFrom.value === rangePriceTo.value) {
            arrAmount.length = 0;
            const clear = document.querySelector('.products__container') as HTMLElement;
            clear.innerHTML = '';
            const none = document.createElement('div');
            none.style.textAlign = 'center';
            none.style.width = '100%';
            none.style.fontSize = '32px';
            none.style.marginTop = '45px';
            none.innerText = 'Таких игр нет :(';
            clear.append(none);
          }
          if (element.amount >= Number(rangeAmountFrom.value) && element.amount <= Number(rangeAmountTo.value)) {
            arrAmount.push(element);
          }
        })
        // this.arrSort = arrAmount;
        if (arrAmount.length !== 0) {
          this.mainPage.render(arrAmount, 'search')
        }
        // console.log('amount', arrAmount);
      })
    }
  }

  removeFilter (): void {
    const removeBtn = document.querySelector('.button-remove');
    if (removeBtn !== null) {
      removeBtn.addEventListener('click', () => {
        this.mainPage.render(products, 'mainPage');
        this.noSlider();
      })
    }
  }
}

export default FilterProducts;
