import { formatModifier } from '../helpers/string-formatter.js';

class Abilities {
  constructor() {
    this.abilities = {
      'strength' : new Ability('str'),
      'dexterity' : new Ability('dex'),
      'constitution' : new Ability('con'),
      'intelligence' : new Ability('int'),
      'wisdom' : new Ability('wis'),
      'charisma' : new Ability('cha'),
    };
    Object.freeze(this.abilities);
  }

  reset() {
    for(const ability of Object.values(this.abilities)) {
      ability.reset();
    }
  }

  get keys() {
    return Object.keys(this.abilities);
  }

  get entries() {
    return Object.entries(this.abilities);
  }

  get orderedAbilities() {
    return [
      this.abilities['strength'],
      this.abilities['dexterity'],
      this.abilities['constitution'],
      this.abilities['intelligence'],
      this.abilities['wisdom'],
      this.abilities['charisma']
    ];
  }

  toParserOptions() {
    return {
      strength: this.abilities['strength'].toParserOptions(),
      dexterity: this.abilities['dexterity'].toParserOptions(),
      constitution: this.abilities['constitution'].toParserOptions(),
      intelligence: this.abilities['intelligence'].toParserOptions(),
      wisdom: this.abilities['wisdom'].toParserOptions(),
      charisma: this.abilities['charisma'].toParserOptions()
    };
  }

  toJson() {
    return {
      strength: this.abilities['strength'].score,
      dexterity: this.abilities['dexterity'].score,
      constitution: this.abilities['constitution'].score,
      intelligence: this.abilities['intelligence'].score,
      wisdom: this.abilities['wisdom'].score,
      charisma: this.abilities['charisma'].score
    };
  }

  toHtml() {
    const abilitiesBlock = document.createElement('abilities-block');
    for (const [key, value] of this.entries) {
      const abbreviation = value.abbreviation;
      abilitiesBlock.dataset[abbreviation] = this.abilities[key].score;
    }

    return abilitiesBlock;
  }

  toHomebrewery() {
    const abilityStrings = this.orderedAbilities.map(ability => `${ability.score} ${ability.formattedModifier}`);
    const abilityLine = abilityStrings.join('|');

    const text =
`>|STR|DEX|CON|INT|WIS|CHA|
>|:---:|:---:|:---:|:---:|:---:|:---:|
>|${abilityLine}|`;

    return text;
  }
}

class Ability {
  constructor(abbreviation) {
    this.abbreviation = abbreviation;
    this.reset();
  }

  reset() {
    this.score = 10;
  }

  get modifier() {
    return Math.floor((this.score - 10) / 2);
  }

  get formattedModifier() {
    return `(${formatModifier(this.modifier)})`;
  }

  toParserOptions() {
    return {
      modifier: this.modifier
    };
  }
}

export default new Abilities();
