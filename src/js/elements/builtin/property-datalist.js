import CustomBuiltinElementMixins from '../../helpers/custom-builtin-element-mixins.js';
import isRunningInJsdom from '../../helpers/is-running-in-jsdom.js';
import { copyObjectProperties } from '../../helpers/object-helpers.js';

export default class PropertyDataList extends HTMLDataListElement {
  static async define() {
    const elementName = 'property-datalist';
    CustomBuiltinElementMixins.define(elementName, PropertyDataListMixin);

    if (! isRunningInJsdom) {
      customElements.define(elementName, this, { extends: 'datalist' });
    }
  }

  constructor() {
    super();

    copyObjectProperties(this, PropertyDataListMixin);
    this.initializeMixin();
  }
}

const PropertyDataListMixin = {
  initializeMixin() {
    return;
  },

  setOptionEnabled(optionText, isEnabled) {
    const item = this.findOption(optionText);

    if (item !== null) {
      if (isEnabled) {
        item.removeAttribute('disabled');
      } else {
        item.setAttribute('disabled', '');
      }
    }
  },

  findOption(optionText) {
    for (const child of this.childNodes) {
      if (child.tagName === 'OPTION' && child.value === optionText) {
        return child;
      }
    }

    return null;
  }
};