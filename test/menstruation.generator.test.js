/* eslint-disable no-unused-expressions */
const expect = require('chai').expect;
const Event = require('coripo-core').Event;
const OneDate = require('coripo-core').OneDate;
const GregorianAdapter = require('coripo-core').GregorianAdapter;
const MenstruationGenerator = require('../src/menstruation.generator.js').Generator;

const menstruationGenerator = new MenstruationGenerator({
  Event,
  OneDate,
  getAdapter: () => new GregorianAdapter(),
  primaryAdapterId: () => new GregorianAdapter().id,
});

describe('Menstruation Generator', () => {
  describe('id', () => {
    it('should return a string', () => {
      expect(menstruationGenerator.id).to.be.a('string');
    });
  });

  describe('name', () => {
    it('should return a string', () => {
      expect(menstruationGenerator.name).to.be.a('string');
    });
  });

  describe('inputs', () => {
    it('should return a non-empty array', () => {
      expect(menstruationGenerator.inputs).to.not.be.empty;
    });
  });

  describe('generate()', () => {
    it('should return an event object', () => {
      const event = menstruationGenerator.generate({
        start: { year: 2017, month: 4, day: 4 },
        periodLength: 5,
        cycleLength: 28,
      });
      expect(event).to.be.an('object');
    });
  });
});
