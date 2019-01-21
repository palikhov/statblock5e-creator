import * as sectionModule from '/src/js/base/section.js';

export default class HeadingSection extends sectionModule.Section {
  static get elementName() { return 'heading-section'; }
  static get templatePath() { return 'src/html/sections/heading-section.html'; }

  constructor() {
    super(HeadingSection.elementName,
          HeadingShowElements,
          HeadingEditElements);

    this.showElements.section.addEventListener('click', () => {
      this.editElements.title.select();
    });
  }

  checkForErrors() {
    this.editElements.title.validate(this.error_messages);
    this.editElements.type.validate(this.error_messages);
  }

  update() {
    let title = this.editElements.title.value;
    let size = this.editElements.size.value;
    let type = this.editElements.type.value;
    let alignment = this.editElements.alignment.value;

    title = HeadingSection.capitalizeFirstLetter(title);
    this.editElements.title.value = title;
    this.showElements.title.textContent = title;

    let subtitle = `${size} ${type}, ${alignment}`;
    this.showElements.subtitle.textContent = subtitle;
  }

  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

class HeadingShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.title = shadowRoot.getElementById('title-text');
    this.subtitle = shadowRoot.getElementById('subtitle-text');
  }
}

class HeadingEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.title = shadowRoot.getElementById('title-input');
    this.size = shadowRoot.getElementById('size-input');
    this.type = shadowRoot.getElementById('type-input');
    this.alignment = shadowRoot.getElementById('alignment-input');
  }
}