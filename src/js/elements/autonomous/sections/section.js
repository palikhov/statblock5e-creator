import CustomAutonomousElement from '/src/js/elements/autonomous/custom-autonomous-element.js';
import GlobalOptions from '/src/js/helpers/global-options.js';
import { focusAndSelectElement } from '/src/js/helpers/element-helpers.js';

export class Section extends CustomAutonomousElement {
  static get templatePaths() {
    return super.templatePaths.set(
      'section',
      'src/html/elements/autonomous/sections/section.html');
  }

  constructor(templatePaths, showElementsClass, editElementsClass) {
    super(templatePaths);

    this.dataset.mode = 'show';

    this.showElements = new showElementsClass(this.shadowRoot);
    this.editElements = new editElementsClass(this.shadowRoot);
    this.errorMessages = this.shadowRoot.querySelector('error-messages');

    this.showElements.section.addEventListener('mouseenter', () => {
      this.showElements.editButton.classList.remove('section__action_hidden');
    });

    this.showElements.section.addEventListener('mouseleave', () => {
      this.showElements.editButton.classList.add('section__action_hidden');
    });

    this.showElements.section.addEventListener('click', () => {
      this.edit();
    });

    this.showElements.section.addEventListener('transitionend', () => {
      if (this.mode === 'edit') {
        this.focusOnInitialEditSectionElement();
      }
    });

    this.editElements.section.addEventListener('submit', (event) => {
      event.preventDefault();
      this.save();
    });
  }

  get mode() {
    return this.dataset.mode;
  }

  set mode(mode) {
    const hiddenClass = 'section_hidden';

    switch (mode) {
    case 'hidden':
      this.dataset.mode = 'hidden';
      this.showElements.section.classList.add(hiddenClass);
      this.editElements.section.classList.add(hiddenClass);
      break;
    case 'show':
      this.dataset.mode = 'show';
      this.showElements.section.classList.remove(hiddenClass);
      this.editElements.section.classList.add(hiddenClass);
      break;
    case 'edit':
      this.dataset.mode = 'edit';
      this.showElements.section.classList.add(hiddenClass);
      this.editElements.section.classList.remove(hiddenClass);
      break;
    default:
      throw new Error(`'${mode}' is not a valid section mode.`);
    }
  }

  get empty() {
    return ('empty' in this.dataset);
  }

  set empty(isEmpty) {
    const emptyClass = 'section_empty';

    if (isEmpty) {
      this.dataset.empty = '';
      this.showElements.section.classList.add(emptyClass);
    } else {
      delete this.dataset.empty;
      this.showElements.section.classList.remove(emptyClass);
    }
  }

  setEmptyVisibility(visibility) {
    if (this.empty) {
      if (visibility) {
        if (this.mode === 'hidden') {
          this.mode = 'show';
        }
      } else {
        if (this.mode === 'show') {
          this.mode = 'hidden';
        }
      }
    }
  }

  focusOnInitialEditSectionElement() {
    focusAndSelectElement(this.editElements.initiallySelectedElement);    
  }

  edit() {
    this.mode = 'edit';
    this.dispatchModeChangedEvent();
    this.focusOnInitialEditSectionElement();
  }

  save() {
    this.errorMessages.clear();
    this.checkForErrors();
    if (this.errorMessages.any) {
      return;
    }
    this.updateShowSection();

    if (this.empty && ! GlobalOptions.emptySectionsVisibility) {
      this.mode = 'hidden';
    } else {
      this.mode = 'show';
    }

    this.dispatchModeChangedEvent();
  }

  checkForErrors() {
    throw new Error(
      `The class '${this.constructor.name}' must implement the checkForErrors() method.`);
  }

  updateShowSection() {
    throw new Error(
      `The class '${this.constructor.name}' must implement the updateShowSection() method.`);
  }

  dispatchModeChangedEvent() {
    let changeEvent = new CustomEvent('sectionModeChanged', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(changeEvent);
  }
}

export class ShowElements {
  constructor(shadowRoot) {
    this.section = shadowRoot.getElementById('show-section');
    this.editButton = shadowRoot.getElementById('edit-button');
  }
}

export class EditElements {
  constructor(shadowRoot) {
    this.section = shadowRoot.getElementById('edit-section');
    this.saveButton = shadowRoot.getElementById('save-button');
  }

  get initiallySelectedElement() {
    throw new Error(
      `The class '${this.constructor.name}' must implement the initiallySelectedElement() getter.`);
  }
}