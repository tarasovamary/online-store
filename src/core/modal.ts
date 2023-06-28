abstract class Modal {
  protected container: HTMLElement;

  constructor () {
    this.container = document.body;
  }

  protected createInputElement (tag: string, className: string, placeholder: string, type: string, maxlength: number): HTMLElement {
    let elem: HTMLInputElement;
    if (tag === 'input') {
      elem = document.createElement(tag);
      elem.className = className;
      elem.placeholder = placeholder;
      elem.type = type;
      elem.maxLength = maxlength;
      return elem;
    }
    return document.body;
  }

  protected createDivElement (tag: string, className: string, text?: string): HTMLElement {
    let elem: HTMLDivElement;
    if (tag === 'div') {
      elem = document.createElement(tag);
      elem.className = className;
      if (text !== undefined) {
        elem.innerText = text;
      }
      return elem;
    }
    return document.body;
  }

  render (): HTMLElement {
    return this.container;
  }
}

export default Modal;
