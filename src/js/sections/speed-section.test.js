import SpeedSection from '/src/js/sections/speed-section.js';
import { EnableDisableElementsCheckboxInternal } from '/src/js/extensions/enable-disable-elements-checkbox.js';
import ErrorMessages from '/src/js/elements/error-messages.js';
jest.mock('/src/js/elements/error-messages.js');

let speedSection;

beforeAll(async() => {
  await SpeedSection.define();
});

beforeEach(() => {
  speedSection = new SpeedSection();
  speedSection.errorMessages = new ErrorMessages();
  speedSection.editElements.useCustom = new EnableDisableElementsCheckboxInternal(speedSection.editElements.useCustom);
  speedSection.forceConnect();
});

afterEach(() => {
  document.clear();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    speedSection.showElements.section.click(); 
  });

  it('should switch to edit mode and focus on the walk speed field', () => {
    expect(speedSection).toBeInMode('edit');
    expect(speedSection.editElements.walk).toHaveFocus();
  });

  describe('and the custom text checkbox is checked', () => {
    beforeEach(() => {
      speedSection.editElements.useCustom.click();
    });

    it('should enable the custom text field, disable all other fields, and focus on the custom text field', () => {
      expect(speedSection.editElements.walk).toBeDisabled();
      expect(speedSection.editElements.burrow).toBeDisabled();
      expect(speedSection.editElements.climb).toBeDisabled();
      expect(speedSection.editElements.fly).toBeDisabled();
      expect(speedSection.editElements.hover).toBeDisabled();
      expect(speedSection.editElements.swim).toBeDisabled();
      expect(speedSection.editElements.customText).not.toBeDisabled();

      expect(speedSection.editElements.customText).toHaveFocus();
    });

    describe('and the custom text field is populated and the save button is clicked', () => {
      it('should switch to show mode and save the custom text', () => {
        let customText = '30 ft. (40ft., climb 30ft. in bear or hybrid form)';
        inputValue(speedSection.editElements.customText, customText);

        speedSection.editElements.saveAction.click();

        expect(speedSection).toBeInMode('show');
        expect(speedSection.showElements.text).toHaveTextContent(customText);
      });

      it('should display an error if the custom text field is blank', () => {
        inputValue(speedSection.editElements.customText, '');

        speedSection.editElements.saveAction.click();

        expect(speedSection).toBeInMode('edit');
        expect(speedSection).toHaveSingleError(
          speedSection.editElements.customText,
          'Speed Custom Text cannot be blank.');
      });
    });
  });

  describe('and the custom text checkbox is unchecked', () => {
    beforeEach(() => {
      speedSection.editElements.useCustom.click();
      speedSection.editElements.useCustom.click();
    });

    it('should disable the custom text field, enable all other fields, and focus on the walk speed field', () => {
      expect(speedSection.editElements.walk).not.toBeDisabled();
      expect(speedSection.editElements.burrow).not.toBeDisabled();
      expect(speedSection.editElements.climb).not.toBeDisabled();
      expect(speedSection.editElements.fly).not.toBeDisabled();
      expect(speedSection.editElements.hover).not.toBeDisabled(); 
      expect(speedSection.editElements.swim).not.toBeDisabled();
      expect(speedSection.editElements.customText).toBeDisabled();

      expect(speedSection.editElements.walk).toHaveFocus();
    });

    describe('and the speed fields are populated and the save button is clicked', () => {
      describe('should switch to show mode and save the fields in the following combinations:', () => {
        /* eslint-disable indent, no-unexpected-multiline */

        // For combinations that involve 3 or 4 speeds, we'll only test the most common combinations to avoid exhaustively testing every case.
        // These combinations are typically found in several dragons in the 5e Monster Manual:
        // - Walk + Burrow + Fly
        // - Walk + Climb + Fly
        // - Walk + Fly + Swim
        // - Walk + Burrow + Fly + Swim
        // - Walk + Climb + Fly + Swim
        it.each
        `
          description                        | walk   | burrow | climb  | fly    | hover    | swim   | expectedText
          ${'all blank'}                     | ${NaN} | ${NaN} | ${NaN} | ${NaN} | ${false} | ${NaN} | ${'0 ft.'}
          ${'walk only'}                     | ${30}  | ${NaN} | ${NaN} | ${NaN} | ${false} | ${NaN} | ${'30 ft.'}
          ${'burrow only'}                   | ${NaN} | ${20}  | ${NaN} | ${NaN} | ${false} | ${NaN} | ${'0 ft., burrow 20 ft.'}
          ${'climb only'}                    | ${NaN} | ${NaN} | ${15}  | ${NaN} | ${false} | ${NaN} | ${'0 ft., climb 15 ft.'}
          ${'fly only'}                      | ${NaN} | ${NaN} | ${NaN} | ${60}  | ${false} | ${NaN} | ${'0 ft., fly 60 ft.'}
          ${'fly + hover only'}              | ${NaN} | ${NaN} | ${NaN} | ${90}  | ${true}  | ${NaN} | ${'0 ft., fly 90 ft. (hover)'}
          ${'hover not visible without fly'} | ${40}  | ${NaN} | ${NaN} | ${NaN} | ${true}  | ${NaN} | ${'40 ft.'}
          ${'swim only'}                     | ${NaN} | ${NaN} | ${NaN} | ${NaN} | ${false} | ${45}  | ${'0 ft., swim 45 ft.'}
          ${'walk + swim'}                   | ${50}  | ${30}  | ${NaN} | ${NaN} | ${false} | ${NaN} | ${'50 ft., burrow 30 ft.'}
          ${'walk + climb'}                  | ${10}  | ${NaN} | ${10}  | ${NaN} | ${false} | ${NaN} | ${'10 ft., climb 10 ft.'}
          ${'walk + fly'}                    | ${20}  | ${NaN} | ${NaN} | ${120} | ${false} | ${NaN} | ${'20 ft., fly 120 ft.'}
          ${'walk + fly + hover'}            | ${10}  | ${NaN} | ${NaN} | ${25}  | ${true}  | ${NaN} | ${'10 ft., fly 25 ft. (hover)'}
          ${'walk + swim'}                   | ${30}  | ${NaN} | ${NaN} | ${NaN} | ${false} | ${50}  | ${'30 ft., swim 50 ft.'}
          ${'walk + burrow + fly'}           | ${30}  | ${15}  | ${NaN} | ${60}  | ${false} | ${NaN} | ${'30 ft., burrow 15 ft., fly 60 ft.'}
          ${'walk + climb + fly'}            | ${40}  | ${NaN} | ${40}  | ${80}  | ${false} | ${NaN} | ${'40 ft., climb 40 ft., fly 80 ft.'}
          ${'walk + fly + swim'}             | ${30}  | ${NaN} | ${NaN} | ${60}  | ${false} | ${30}  | ${'30 ft., fly 60 ft., swim 30 ft.'}
          ${'walk + climb + fly + swim'}     | ${50}  | ${NaN} | ${25}  | ${100} | ${false} | ${75}  | ${'50 ft., climb 25 ft., fly 100 ft., swim 75 ft.'}
          ${'walk + burrow + fly + swim'}    | ${40}  | ${30}  | ${NaN} | ${80}  | ${false} | ${40}  | ${'40 ft., burrow 30 ft., fly 80 ft., swim 40 ft.'}
          ${'all speeds'}                    | ${5}   | ${10}  | ${15}  | ${20}  | ${false} | ${25}  | ${'5 ft., burrow 10 ft., climb 15 ft., fly 20 ft., swim 25 ft.'}
          ${'all speeds + hover'}            | ${150} | ${120} | ${100} | ${240} | ${true}  | ${185} | ${'150 ft., burrow 120 ft., climb 100 ft., fly 240 ft. (hover), swim 185 ft.'}
          ${'maximum values'}                | ${999} | ${999} | ${999} | ${999} | ${true}  | ${999} | ${'999 ft., burrow 999 ft., climb 999 ft., fly 999 ft. (hover), swim 999 ft.'}
        `
        ('$description: {walk="$walk", burrow="$burrow", climb="$climb", fly="$fly", hover="$hover", swim="$swim"} => "$expectedText"', 
        ({walk, burrow, climb, fly, hover, swim, expectedText}) => {
          inputValue(speedSection.editElements.walk, walk);
          inputValue(speedSection.editElements.burrow, burrow);
          inputValue(speedSection.editElements.climb, climb);
          inputValue(speedSection.editElements.fly, fly);
          inputValue(speedSection.editElements.swim, swim);

          if (hover) {
            speedSection.editElements.hover.click();
          }

          speedSection.editElements.saveAction.click();

          expect(speedSection).toBeInMode('show');
          expect(speedSection.showElements.text).toHaveTextContent(expectedText);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });
    });
  });
});