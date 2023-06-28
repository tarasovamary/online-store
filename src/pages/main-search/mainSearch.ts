import products from '../../products.json';
import MainPage, { Product } from '../main-page/main';

class SearchProducts extends MainPage {
  private searchBar: HTMLElement;

  constructor () {
    super('search');
    this.searchBar = document.getElementById('searchBar') as HTMLInputElement;
  }

  searchProduct (): void {
    document.getElementById('searchBar')?.addEventListener('focus', (event) => { const target = event.target as HTMLSelectElement; target.value = ''; this.render(products, 'search') }); // для очистки инпута, когда нажимаем снова (чтобы не висело постоянно)
    this.searchBar.addEventListener('keyup', (event) => {
      const target = event.target as HTMLSelectElement;
      const searchString = target.value.toLowerCase();

      const resultRender = products.filter((product) => {
        return product.title.toLowerCase().includes(searchString);
      })
      this.renderSearch(resultRender);
    })
  }

  renderSearch (searchResult: Product[]): void {
    const productContainer = document.querySelector('.products__container') as HTMLElement;
    productContainer.innerHTML = '';
    const arr: Product[] = [];
    searchResult.forEach((item) => {
      arr.push(item);
    })
    this.render(arr, 'search');
  }
}

export default SearchProducts;