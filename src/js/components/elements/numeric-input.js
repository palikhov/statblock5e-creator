import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';

export default class NumericInput {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'numeric-input',
      'src/html/elements/numeric-input.html',
      NumericInput.elementClass,
      { extends: 'input' });
  }

  static elementClass(contentNode) {
    return NumericInputElement;
  }
}

class NumericInputElement extends HTMLInputElement {
  constructor() {
    super();

    this.addEventListener('input', () => {
      if (this.value) {
        let value = parseInt(this.value, 10);

        if (this.min && value < parseInt(this.min, 10)) {
          this.value = this.min;
        } else if(this.max && value > parseInt(this.max, 10)) {
          this.value = this.max;
        } else {
          // Used to eliminate leading zeroes from the inputted value
          this.value = value;
        }
      }
    });
  }
}
