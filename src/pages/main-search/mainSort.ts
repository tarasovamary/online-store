import products from '../../products.json';
import MainPage, { Product } from '../main-page/main';

class SortProducts {
  private readonly mainPage: MainPage;

  constructor () {
    this.mainPage = new MainPage('search');
  }

  getSortOption (id: string): void {
    // const selectOption = document.getElementById(id) as HTMLSelectElement;
    // selectOption.addEventListener('change', (event) => {
    //   console.log('select', selectOption.value);
    //   if (selectOption.value === 'raiting') {
    //     this.sortByRaiting(products);
    //   }
    //   if (selectOption.value === 'min-price') {
    //     this.sortByMinPrice(products);
    //   }
    //   if (selectOption.value === 'max-price') {
    //     this.sortByMaxPrice(products);
    //   }
    //   if (selectOption.value === 'firstname') {
    //     this.sortByFirstName(products);
    //   }
    //   if (selectOption.value === 'lastname') {
    //     this.sortByLastName(products);
    //   }
    // })
  }

  // sortByFirstName (arr: Product[]): void {
  //   const sorted = arr.sort((a, b) => a.title > b.title ? 1 : -1);
  //   console.log('name', sorted);
  //   // this.mainPage.render(sorted, 'search');
  // }

  // sortByLastName (arr: Product[]): void {
  //   const sorted = arr.sort((a, b) => a.title < b.title ? 1 : -1);
  //   console.log('lastname', sorted);
  //   // this.mainPage.render(sorted, 'search');
  // }

  // sortByRaiting (arr: Product[]): void {
  //   const sorted = arr.sort((a, b) => {
  //     return b.rating - a.rating;
  //   });
  //   console.log('raiting', sorted);
  //   // this.mainPage.render(sorted, 'search');
  // }

  // sortByMaxPrice (arr: Product[]): void {
  //   const sorted = arr.sort((a, b) => {
  //     return a.price - b.price;
  //   });
  //   console.log('maxprice', sorted);
  //   // this.mainPage.render(sorted, 'search');
  // }

  // sortByMinPrice (arr: Product[]): void {
  //   const sorted = arr.sort((a, b) => {
  //     return b.price - a.price;
  //   });
  //   console.log('minprice', sorted);
  //   // this.mainPage.render(sorted, 'search');
  // }
}

export default SortProducts;
