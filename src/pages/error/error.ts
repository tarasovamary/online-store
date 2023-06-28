import Page from '../../core/page';

class ErrorPage extends Page {
  // private containerColumns: HTMLElement;
  // private containerSort: HTMLElement;
  private after: HTMLElement;
  private mainWrap: HTMLElement;

  constructor (id: string) {
    super(id);
    // this.containerColumns = document.querySelector('.two-columns') as HTMLElement;
    // this.containerSort = document.querySelector('.sort-info') as HTMLElement;
    this.after = document.querySelector('.breadcrumbs') as HTMLElement;
    this.mainWrap = document.querySelector('.main__wrapper') as HTMLElement;
  }

  render (): HTMLElement {
    const title = this.createNewElement('div', 'error', '', '404! The page not found!');
    this.mainWrap.append(this.after)
    // this.after.after(title);
    this.mainWrap.append(title)
    return document.body;
  }
}

export default ErrorPage;