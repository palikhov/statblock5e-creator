import ArmorClassSection from './armor-class-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import ArmorClass from '../../../models/armor-class.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

const expectedHeading = 'Armor Class';

let armorClassSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await ArmorClassSection.define();
});

beforeEach(() => {
  ArmorClass.reset();

  armorClassSection = new ArmorClassSection();
  TestCustomElements.initializeSection(armorClassSection);
  armorClassSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    armorClassSection.showElements.section.click();
  });

  it('should switch to edit mode and focus on the armor class field', () => {
    expect(armorClassSection).toBeInMode('edit');
    expect(armorClassSection.editElements.armorClass).toHaveFocus();
  });

  describe('and the custom text checkbox is checked', () => {
    beforeEach(() => {
      armorClassSection.editElements.useCustomText.click();
    });

    it('should enable the custom text field, disable all other fields, and focus on the custom text field', () => {
      expect(armorClassSection.editElements.armorClass).toBeDisabled();
      expect(armorClassSection.editElements.armorType).toBeDisabled();
      expect(armorClassSection.editElements.hasShield).toBeDisabled();
      expect(armorClassSection.editElements.customText).not.toBeDisabled();

      expect(armorClassSection.editElements.customText).toHaveFocus();
      expect(armorClassSection.editElements.customText).toBeSelected();
    });

    describe('and the edit section is submitted', () => {
      describe('should switch to show mode and save the custom text', () => {
        /* eslint-disable indent, no-unexpected-multiline */
        it.each
        `
          description                                 | customText                              | expectedHtmlText
          ${'plain custom text'}                      | ${'14 (natural armor), 11 while prone'} | ${'14 (natural armor), 11 while prone'}
          ${'custom text with valid markdown syntax'} | ${'12 (15 with *mage armor*)'}          | ${'12 (15 with <em>mage armor</em>)'}
          ${'custom text with html tags escaped'}     | ${'12 (15 with <em>mage armor</em>)'}   | ${'12 (15 with &lt;em&gt;mage armor&lt;/em&gt;)'}
        `
        ('$description: $customText => $expectedHtmlText',
        ({customText, expectedHtmlText}) => {
          inputValueAndTriggerEvent(armorClassSection.editElements.customText, customText);

          armorClassSection.editElements.submitForm();

          expect(ArmorClass.useCustomText).toBe(true);
          expect(ArmorClass.originalCustomText).toBe(customText);
          expect(ArmorClass.htmlCustomText).toBe(expectedHtmlText);

          expect(armorClassSection).toBeInMode('show');
          expect(armorClassSection).toShowPropertyLine(expectedHeading, expectedHtmlText);

          verifyJsonExport(10, '', false, customText);
          expect(armorClassSection).toExportPropertyLineToHtml(expectedHeading, expectedHtmlText);
          expect(armorClassSection).toExportPropertyLineToHomebrewery(expectedHeading, customText);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });

      it('should display an error if the custom text field is blank', () => {
        inputValueAndTriggerEvent(armorClassSection.editElements.customText, '');

        armorClassSection.editElements.submitForm();

        expect(armorClassSection).toBeInMode('edit');
        expect(armorClassSection).toHaveError(
          armorClassSection.editElements.customText,
          'Armor Class Custom Text cannot be blank.');
      });

      it('should display an error if the custom text field has invalid markdown syntax', () => {
        inputValueAndTriggerEvent(armorClassSection.editElements.customText, '11 (16 with _barkskin)');

        armorClassSection.editElements.submitForm();

        expect(armorClassSection).toBeInMode('edit');
        expect(armorClassSection).toHaveError(
          armorClassSection.editElements.customText,
          'Armor Class Custom Text has invalid Markdown syntax.');
      });

      it('should display only one error if the armor class is not a valid number and custom text field is blank', () => {
        inputValueAndTriggerEvent(armorClassSection.editElements.armorClass, '');
        inputValueAndTriggerEvent(armorClassSection.editElements.customText, '');

        armorClassSection.editElements.submitForm();

        expect(armorClassSection).toBeInMode('edit');
        expect(armorClassSection).toHaveError(
          armorClassSection.editElements.customText,
          'Armor Class Custom Text cannot be blank.');
      });
    });
  });

  describe('and the custom text checkbox is unchecked', () => {
    beforeEach(() => {
      armorClassSection.editElements.useCustomText.click();
      armorClassSection.editElements.useCustomText.click();
    });

    it('should disable the custom text field, enable all other fields, and focus on the armor class field', () => {
      expect(armorClassSection.editElements.armorClass).not.toBeDisabled();
      expect(armorClassSection.editElements.armorType).not.toBeDisabled();
      expect(armorClassSection.editElements.hasShield).not.toBeDisabled();
      expect(armorClassSection.editElements.customText).toBeDisabled();

      expect(armorClassSection.editElements.armorClass).toHaveFocus();
    });

    describe('and the edit section is submitted', () => {
      describe('should switch to show mode and save the desired fields', () => {
        /* eslint-disable indent, no-unexpected-multiline */
        it.each
        `
          description                              | armorClass | armorType          | hasShield | expectedText
          ${'armor class only'}                    | ${7}       | ${''}              | ${false}  | ${'7'}
          ${'armor class and armor type'}          | ${21}      | ${'natural armor'} | ${false}  | ${'21 (natural armor)'}
          ${'armor class and shield'}              | ${12}      | ${''}              | ${true}   | ${'12 (shield)'}
          ${'armor class, armor type, and shield'} | ${16}      | ${'chain shirt'}   | ${true}   | ${'16 (chain shirt, shield)'}
        `
        ('$description: {armorClass="$armorClass", armorType="$armorType", hasShield="$hasShield"} => $expectedText',
        ({armorClass, armorType, hasShield, expectedText}) => {
          inputValueAndTriggerEvent(armorClassSection.editElements.armorClass, armorClass);
          inputValueAndTriggerEvent(armorClassSection.editElements.armorType, armorType);
          if (hasShield) {
            armorClassSection.editElements.hasShield.click();
          }

          armorClassSection.editElements.submitForm();

          expect(ArmorClass.armorClass).toBe(armorClass);
          expect(ArmorClass.armorType).toBe(armorType);
          expect(ArmorClass.hasShield).toBe(hasShield);
          expect(ArmorClass.useCustomText).toBe(false);

          expect(armorClassSection).toBeInMode('show');
          expect(armorClassSection).toShowPropertyLine(expectedHeading, expectedText);

          verifyJsonExport(armorClass, armorType, hasShield, '');
          expect(armorClassSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
          expect(armorClassSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });

      it('should display an error if the armor class field is not a valid number', () => {
        inputValueAndTriggerEvent(armorClassSection.editElements.armorClass, '');

        armorClassSection.editElements.submitForm();

        expect(armorClassSection).toBeInMode('edit');
        expect(armorClassSection).toHaveError(
          armorClassSection.editElements.armorClass,
          'Armor Class must be a valid number.');
      });

      it('should display only one error if the armor class is not a valid number and custom text field is blank', () => {
        inputValueAndTriggerEvent(armorClassSection.editElements.armorClass, '');
        inputValueAndTriggerEvent(armorClassSection.editElements.customText, '');

        armorClassSection.editElements.submitForm();

        expect(armorClassSection).toBeInMode('edit');
        expect(armorClassSection).toHaveError(
          armorClassSection.editElements.armorClass,
          'Armor Class must be a valid number.');
      });
    });
  });
});

function verifyJsonExport(armorClass, armorType, hasShield, customText) {
  const jsObject = armorClassSection.exportToJson();
  const expectedJsObject = {
    armorClass: armorClass,
    armorType: armorType,
    hasShield: hasShield,
    customText: customText
  };

  expect(jsObject).toStrictEqual(expectedJsObject);
}