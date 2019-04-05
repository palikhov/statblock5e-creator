import CustomBuiltinInputElement from './custom-builtin-input-element.js';
import { parseMarkdown } from '../../parsers/parser.js';

export default class TextInput extends CustomBuiltinInputElement {
  static get elementName() { return 'text-input'; }
  static get mixin() { return TextInputMixin; }

  constructor() {
    super();
  }
}

export let TextInputMixin = {
  initializeMixin() {
    this.htmlText = null;
  },

  get fieldName() {
    const prettyName = this.getAttribute('pretty-name');
    return (prettyName ? prettyName : this.name);
  },

  validate(errorMessages) {
    if (this.required && this.value === '') { 
      errorMessages.add(this, `${this.fieldName} cannot be blank.`);
    } else if ('parsed' in this.dataset) {
      this.parse(errorMessages);
    }
  },

  parse(errorMessages) {
    const parserResults = parseMarkdown(this.value);

    if (parserResults.error) {
      const message = `${this.fieldName} has invalid syntax.`;
      errorMessages.add(this, message);
    } else {
      this.htmlText = parserResults.outputText;
    }
  }
};
