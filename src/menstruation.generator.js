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
    const event = new dependencies.Event({
      type: id,
      title: 'Period Days',
      color: '#ee10f6',
      since: new dependencies.OneDate(config.start, helper),
      till: new dependencies.OneDate(config.start, helper).offsetDay(config.periodLength),
      repeats: [{ times: -1, cycle: 'day', step: config.cycleLength }],
      sequels: [
        {
          title: 'Peak Ovulation',
          color: '#00aeef',
          since: { scale: 'day', offset: 5 },
          till: { scale: 'day', offset: 14 },
        },
        {
          title: 'Pre-Period',
          color: '#f36',
          since: { scale: 'day', offset: -2 },
          till: { scale: 'day', offset: -1 },
        },
        {
          title: 'Post-Period',
          color: '#7e70ff',
          since: { scale: 'day', offset: 5 },
          till: { scale: 'day', offset: 6 },
        },
      ],
    });
    return event;
  };

  return { id, name, inputs, generate };
};

exports.Generator = Generator;
