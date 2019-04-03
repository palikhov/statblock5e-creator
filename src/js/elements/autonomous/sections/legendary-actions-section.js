import * as blockListSectionModule from './block-list-section.js';
import LegendaryActions from '../../../stats/lists/block/legendary-actions.js';

export default class LegendaryActionsSection extends blockListSectionModule.BlockListSection {
  static get elementName() { return 'legendary-actions-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'legendary-actions-section',
      'src/html/elements/autonomous/sections/legendary-actions-section.html');
  }

  constructor() {
    super(LegendaryActionsSection.templatePaths,
          LegendaryActions,
          LegendaryActionsSectionShowElements,
          LegendaryActionsSectionEditElements);

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.showElements.displayList.disableBlockNameItalics = true;
      this.editElements.editableList.disableBlockNameItalics = true;

      this.isInitialized = true;
    }
  }

  get empty() {
    return super.empty;
  }

  set empty(isEmpty) {
    super.empty = isEmpty;

    const hiddenEmptyLabelClass = 'legendary-actions-show-section__text_hidden';

    if (isEmpty) {      
      this.showElements.description.classList.add(hiddenEmptyLabelClass);
    } else {
      this.showElements.description.classList.remove(hiddenEmptyLabelClass);
    }
  }

  checkForErrors() {
    super.checkForErrors();

    this.editElements.description.validate(this.errorMessages);
  }

  updateModel() {
    super.updateModel();

    this.listModel.originalDescription = this.editElements.description.originalText;
    this.listModel.parsedDescription = this.editElements.description.parsedText;
  }

  updateView() {
    super.updateView();

    this.showElements.description.innerHTMLSanitized = this.listModel.parsedDescription;
  }

  reparse() {
    super.reparse();

    if (this.mode === 'show') {
      this.showElements.description.innerHTMLSanitized = this.listModel.parsedDescription;
    }
  }
}

class LegendaryActionsSectionShowElements extends blockListSectionModule.BlockListShowSection {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.description = shadowRoot.getElementById('description-show');
  }
}

class LegendaryActionsSectionEditElements extends blockListSectionModule.BlockListEditSection {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.description = shadowRoot.getElementById('description-edit');
  }
}