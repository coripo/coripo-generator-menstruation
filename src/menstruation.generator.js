const Generator = function Generator(dependencies) {
  const id = 'dariush-alipour.coripo.generator.menstruation';
  const name = 'Menstruation';
  const inputs = [
    { id: 'start', label: 'When did your last period start?', type: 'date', comment: '' },
    { id: 'periodLength', label: 'How many days did it last?', type: 'number', comment: '' },
    { id: 'cycleLength', label: 'How long is your menstrual cycle?', type: 'number', comment: '' },
  ];
  const helper = {
    getAdapter: dependencies.getAdapter,
    primaryAdapterId: dependencies.primaryAdapterId,
  };

  const generate = (config) => {
    const since = new dependencies.OneDate(config.start, helper);
    const till = new dependencies.OneDate(config.start, helper).offsetDay(config.periodLength);
    const event = new dependencies.Event({
      title: 'Period Days',
      since,
      till,
    });
    return event;
  };

  return { id, name, inputs, generate };
};

exports.Generator = Generator;
