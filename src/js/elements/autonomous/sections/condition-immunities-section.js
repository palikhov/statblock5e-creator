import PropertyListSection from '/src/js/elements/autonomous/sections/property-list-section.js';

export default class ConditionImmunitiesSection extends PropertyListSection {
  static get elementName() { return 'condition-immunities-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'condition-immunities-section',
      'src/html/elements/autonomous/sections/condition-immunities-section.html');
  }

  constructor() {
    super(ConditionImmunitiesSection.templatePaths,
          'Condition Immunities');

    this.empty = true;
  }
}