import * as ExportHelpers from '../helpers/export-helpers.js';

export default class ArmorClass {
  constructor() {
    this.headingName = 'Armor Class';

    this.reset();
  }

  reset() {
    this.armorClass = 10;
    this.armorType = '';
    this.hasShield = false;

    this.useCustomText = false;
    this.customText = '';
    this.htmlCustomText = '';
  }

  get originalText() {
    if (this.useCustomText) {
      return this.customText;
    }

    return this.nonCustomText;
  }

  get htmlText() {
    if (this.useCustomText) {
      return this.htmlCustomText;
    }

    return this.nonCustomText;
  }

  get nonCustomText() {
    if (this.armorType) {
      if (this.hasShield) {
        return `${this.armorClass} (${this.armorType}, shield)`;
      } else {
        return `${this.armorClass} (${this.armorType})`;
      }
    } else {
      if (this.hasShield) {
        return `${this.armorClass} (shield)`;
      } else {
        return this.armorClass;
      }
    }
  }

  fromJson(json) {
    this.armorClass = json.armorClass;
    this.armorType = json.armorType;
    this.hasShield = json.hasShield;
    this.useCustomText = json.useCustomText;
    this.customText = json.customText;
  }

  toJson() {
    return {
      armorClass: this.armorClass,
      armorType: this.armorType,
      hasShield: this.hasShield,
      useCustomText: this.useCustomText,
      customText: this.customText
    };
  }

  toHtml() {
    return ExportHelpers.createHtmlPropertyLine(this.headingName, this.htmlText);
  }

  toHomebrewery() {
    return ExportHelpers.createHomebreweryPropertyLine(this.headingName, this.originalText);
  }
}