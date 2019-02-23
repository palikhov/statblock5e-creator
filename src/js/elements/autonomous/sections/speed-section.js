import * as sectionModule from '/src/js/elements/autonomous/sections/section.js';

export default class SpeedSection extends sectionModule.Section {
  static get elementName() { return 'speed-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'speed-section',
      'src/html/elements/autonomous/sections/speed-section.html');
  }

  constructor() {
    super(SpeedSection.templatePaths,
          SpeedShowElements,
          SpeedEditElements);
  }

  connectedCallback() {
    if(this.isConnected && ! this.isInitialized) {
      this.editElements.useCustom.disableElementsWhenChecked(
        this.editElements.walk,
        this.editElements.burrow,
        this.editElements.climb,
        this.editElements.fly,
        this.editElements.hover,
        this.editElements.swim);

      this.editElements.useCustom.enableElementsWhenChecked(
        this.editElements.customText);

      this.isInitialized = true;
    }
  }

  checkForErrors() {
    this.editElements.customText.value = this.editElements.customText.value.trim();

    if (this.editElements.useCustom.checked) {
      this.editElements.customText.validate(this.errorMessages);
    }
  }

  updateShowSection() {
    let walkSpeed = this.editElements.walk.value;
    let burrowSpeed = this.editElements.burrow.value;
    let climbSpeed = this.editElements.climb.value;
    let flySpeed = this.editElements.fly.value;
    let hover = this.editElements.hover.checked;
    let swimSpeed = this.editElements.swim.value;
    let useCustom = this.editElements.useCustom.checked;
    let customText = this.editElements.customText.value;

    let text = '';

    if (useCustom) {
      text = customText;
    } else {
      const unit = 'ft.';

      if (!walkSpeed) {
        walkSpeed = 0;
      }
      text += `${walkSpeed} ${unit}`;

      if (burrowSpeed) {
        text += `, burrow ${burrowSpeed} ${unit}`;
      }
      if (climbSpeed) {
        text += `, climb ${climbSpeed} ${unit}`;
      }
      if (flySpeed) {
        text += `, fly ${flySpeed} ${unit}`;
        if (hover) {
          text += ' (hover)';
        }
      }
      if (swimSpeed) {
        text += `, swim ${swimSpeed} ${unit}`;
      }
    }

    this.showElements.text.textContent = text;
  }
}

class SpeedShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.text = shadowRoot.getElementById('speed-text');
  }
}

class SpeedEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.walk = shadowRoot.getElementById('walk-input');
    this.burrow = shadowRoot.getElementById('burrow-input');
    this.climb = shadowRoot.getElementById('climb-input');
    this.fly = shadowRoot.getElementById('fly-input');
    this.hover = shadowRoot.getElementById('hover-input');
    this.swim = shadowRoot.getElementById('swim-input');
    this.useCustom = shadowRoot.getElementById('use-custom-input');
    this.customText = shadowRoot.getElementById('custom-input');
  }

  get initiallySelectedElement() {
    if (this.useCustom.checked) {
      return this.customText;
    }
    return this.walk;
  }
}