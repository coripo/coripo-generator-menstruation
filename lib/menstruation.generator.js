'use strict';

var Generator = function Generator(dependencies) {
  var id = 'coripo.coripo.generator.menstruation';
  var name = 'Menstruation';
  var inputs = [{ id: 'start', label: 'When did your last period start?', type: 'date', comment: '' }, { id: 'periodLength', label: 'How many days did it last?', type: 'number', comment: '' }, { id: 'cycleLength', label: 'How long is your menstrual cycle?', type: 'number', comment: '' }];
  var helper = {
    getAdapter: dependencies.getAdapter,
    primaryAdapterId: dependencies.primaryAdapterId
  };

  var generate = function generate(config) {
    var event = new dependencies.Event({
      id: config.id,
      generatorId: id,
      title: 'Period Days',
      color: '#ee10f6',
      since: new dependencies.OneDate(config.start, helper),
      till: new dependencies.OneDate(config.start, helper).offsetDay(config.periodLength - 1),
      overlap: { internal: 'trim', external: 'trim-forever' },
      repeats: [{ times: -1, cycle: 'day', step: config.cycleLength }],
      sequels: [{
        title: 'Peak Ovulation',
        color: '#00aeef',
        since: { scale: 'day', offset: 10 },
        till: { scale: 'day', offset: 14 }
      }, {
        title: 'Pre-Period',
        color: '#f36',
        since: { scale: 'day', offset: -2 },
        till: { scale: 'day', offset: -1 }
      }, {
        title: 'Post-Period',
        color: '#7e70ff',
        since: { scale: 'day', offset: config.periodLength },
        till: { scale: 'day', offset: config.periodLength + 1 }
      }]
    });
    return event;
  };

  return { id: id, name: name, inputs: inputs, generate: generate };
};

exports.Generator = Generator;
//# sourceMappingURL=menstruation.generator.js.map