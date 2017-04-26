/* eslint-disable no-unused-expressions */
const expect = require('chai').expect;
const Event = require('coripo-core').Event;
const OneDate = require('coripo-core').OneDate;
const GregorianAdapter = require('coripo-core').GregorianAdapter;
const MenstruationGenerator = require('../src/menstruation.generator.js').Generator;

const menstruationGenerator = new MenstruationGenerator(Event);

describe('Basic Generator', () => {
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

  describe('generate', () => {
    it('should return an event object', () => {
      const event = menstruationGenerator.generate({
        title: 'Thanksgiving at grandma\'s house',
        note: 'Wear good stuff, put some cologne and DO NOT talk much',
        since: new OneDate({ year: 2017, month: 11, day: 23 },
          {
            getAdapter: () => new GregorianAdapter(),
            primaryAdapterId: new GregorianAdapter().id,
          }),
      });
      expect(event).to.be.an('object');
    });
  });
});
