import CustomBuiltinInputElement from '/src/js/base/custom-builtin-input-element.js';
import { focusAndSelectElement } from '/src/js/helpers/element-helpers.js';

export default class EnableDisableElementsCheckbox extends CustomBuiltinInputElement {
  static get elementName() { return 'enable-disable-elements-checkbox'; }

  constructor() {
    super();

    this.internal = new EnableDisableElementsCheckboxInternal(this);
  }

  enableElementsWhenChecked(...elements) {
    this.internal.enableElementsWhenChecked(...elements);
  }

  disableElementsWhenChecked(...elements) {
    this.internal.disableElementsWhenChecked(...elements);
  }
}

export class EnableDisableElementsCheckboxInternal {
  constructor(checkboxElement) {
    this.checkboxElement = checkboxElement;

    this.enabledElements = [];
    this.disabledElements = [];

    checkboxElement.addEventListener('input', this.onInputCheckbox.bind(this));
  }

  onInputCheckbox() {
    let elementsToEnable, elementsToDisable;       
    if (this.checkboxElement.checked) {
      elementsToEnable = this.enabledElements;
      elementsToDisable = this.disabledElements;        
    } else {
      elementsToEnable = this.disabledElements;
      elementsToDisable = this.enabledElements;
    }

    for (const [index, element] of elementsToEnable.entries()) {
      element.removeAttribute('disabled');
      if (index === 0) {
        focusAndSelectElement(element);
      }
    }
    for (const element of elementsToDisable) {
      element.setAttribute('disabled', '');
    }
  }

  enableElementsWhenChecked(...elements) {
    this.enabledElements = this.enabledElements.concat(elements);
  }

  disableElementsWhenChecked(...elements) {
    this.disabledElements = this.disabledElements.concat(elements);
  }

  get checked() {
    return this.checkboxElement.checked;
  }

  set checked(isChecked) {
    this.checkboxElement.checked = isChecked;
  }

  addEventListener(type, listener) {
    this.checkboxElement.addEventListener(type, listener);
  }

  getAttribute(attributeName) {
    return this.checkboxElement.getAttribute(attributeName);
  }

  click() {
    this.checkboxElement.click();
  }

  focus() {
    this.checkboxElement.focus();
  }
}