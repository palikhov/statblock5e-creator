import CustomBuiltinElementMixins from '../../helpers/custom-builtin-element-mixins.js';
import isRunningInNode from '../../helpers/is-running-in-node.js';
import { copyObjectProperties } from '../../helpers/object-helpers.js';

export default class NumberSelect extends HTMLSelectElement {
  static async define() {
    const elementName = 'number-select';
    CustomBuiltinElementMixins.define(elementName, NumberSelectMixin);

    if (! isRunningInNode) {
      customElements.define(elementName, this, { extends: 'select' });
    }
  }

  constructor() {
    super();

    copyObjectProperties(this, NumberSelectMixin);
    this.initializeMixin();
  }
}

export let NumberSelectMixin = {
  initializeMixin() {
    return;
  },

  get valueAsInt() {
    return parseInt(this.value, 10);
  }
};