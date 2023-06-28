abstract class Description {
  protected container: HTMLElement;
  private id: string;
  //   protected containerImage: HTMLElement;

  constructor (id: string) {
    this.container = document.body;
    this.id = id;
    // this.containerImage = document.createElement('img');
    // this.container
    // this.container.id = id;
  }

  protected createElement (tag: string, className: string, text: string): HTMLElement {
    let elem: HTMLElement;
    if (tag === 'div') {
      elem = document.createElement(tag);
      elem.className = className;
      elem.innerText = text;
      return elem;
    }
    if (tag === 'img') {
      elem = document.createElement('img');
      elem.className = className;
      return elem;
    }
    if (tag === 'span') {
      elem = document.createElement(tag);
      elem.className = className;
      elem.innerText = text;
      return elem;
    }
    return document.body;
  }

  render (): HTMLElement {
    return this.container;
  }
}

export default Description;