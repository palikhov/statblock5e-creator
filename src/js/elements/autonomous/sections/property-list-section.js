import * as propertyLineSectionModule from './property-line-section.js';
import CurrentContext from '../../../models/current-context.js';

export default class PropertyListSection extends propertyLineSectionModule.PropertyLineSection {
  static get templatePaths() {
    return super.templatePaths.set(
      'property-list-section',
      'src/html/elements/autonomous/sections/property-list-section.html');
  }

  constructor(templatePaths, modelPropertyName) {
    super(templatePaths,
          PropertyListShowElements,
          PropertyListEditElements);

    this.modelPropertyName = modelPropertyName;

    const model = CurrentContext.creature[modelPropertyName];

    this.showElements.heading.textContent = model.headingName;
    this.editElements.label.textContent = `${model.headingName}:`;
  }

  connectedCallback() {
    super.connectedCallback();

    this.editElements.input.addEventListener('keydown', this.onEnterKeyDownOnInputField.bind(this));
    this.editElements.addButton.addEventListener('click', this.onClickAddButton.bind(this));
    this.addEventListener('propertyListItemRemoved', this.onPropertyListItemRemoved.bind(this));
  }

  onEnterKeyDownOnInputField(keyEvent) {
    if (keyEvent.key === 'Enter') {
      keyEvent.preventDefault();

      this.addItemFromInput();
    }
  }

  onClickAddButton() {
    this.addItemFromInput();
  }

  onPropertyListItemRemoved(event) {
    const itemText = event.detail.itemText;
    this.editElements.dataList.setOptionEnabled(itemText, true);
  }

  addItemFromInput() {
    const model = CurrentContext.creature[this.modelPropertyName];
    const text = this.editElements.input.value.trim();
    this.editElements.input.value = text;

    this.errorMessages.clear();
    if (text === '') {
      this.errorMessages.add(this.editElements.input, `Cannot add a blank ${model.singleName}.`);
    } else if(this.editElements.propertyList.contains(text)) {
      this.errorMessages.add(this.editElements.input, `Cannot add a duplicate ${model.singleName}.`);
    }
    if (this.errorMessages.any) {
      this.errorMessages.focusOnFirstErrorField();
      return;
    }

    this.addItem(text);

    this.editElements.input.value = '';
    this.editElements.input.select();
  }

  addItem(text) {
    this.editElements.propertyList.addItem(text);
    this.editElements.dataList.setOptionEnabled(text, false);
  }

  checkForErrors() {
    const input = this.editElements.input;
    if (input.value !== '') {
      const message = `Cannot save while the ${CurrentContext.creature[this.modelPropertyName].singleName} field contains text.\nClear or add the field, then try again.`;
      this.errorMessages.add(input, message);
    }
  }

  updateModel() {
    CurrentContext.creature[this.modelPropertyName].items = this.editElements.propertyList.itemsAsText;
  }

  updateEditModeView() {
    this.editElements.propertyList.items =CurrentContext.creature[this.modelPropertyName].items;
  }

  updateShowModeView() {
    const text = CurrentContext.creature[this.modelPropertyName].text;
    this.empty = (text === '');
    this.showElements.text.textContent = text;
  }

  exportToJson() {
    return CurrentContext.creature[this.modelPropertyName].toJson();
  }

  exportToHtml() {
    return CurrentContext.creature[this.modelPropertyName].toHtml();
  }

  exportToHomebrewery() {
    return CurrentContext.creature[this.modelPropertyName].toHomebrewery();
  }
}

class PropertyListShowElements extends propertyLineSectionModule.PropertyLineShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
  }
}

class PropertyListEditElements extends propertyLineSectionModule.PropertyLineEditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.label = shadowRoot.getElementById('property-list-label');
    this.input = shadowRoot.getElementById('property-list-input');
    this.addButton = shadowRoot.getElementById('property-list-add-button');
    this.propertyList = shadowRoot.getElementById('property-list');
    this.dataList = shadowRoot.getElementById('property-list-datalist');
  }

  get initiallySelectedElement() {
    return this.input;
  }
}
