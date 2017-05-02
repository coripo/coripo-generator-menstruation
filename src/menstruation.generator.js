const i18next = require('i18next');
const locales = require('../locales/index.js');

const Generator = function Generator(dependencies, config = {}) {
  i18next.init({
    lng: config.locale || 'en',
    fallbackLng: 'en',
    initImmediate: false,
    resources: locales,
  });
  const trl = (key) => {
    i18next.store.data = locales;
    return i18next.t(key);
  };
  const id = 'coripo.coripo.generator.menstruation';
  const name = trl('menstruation-generator.name');
  const description = trl('menstruation-generator.description');
  const inputs = [
    {
      title: trl('menstruation-generator.field-group.basic.title'),
      fields: [
        {
          id: 'start',
          label: trl('menstruation-generator.field-group.basic.field.start.label'),
          type: 'date',
        },
        {
          id: 'periodLength',
          label: trl('menstruation-generator.field-group.basic.field.period-length.label'),
          type: 'number',
        },
        {
          id: 'cycleLength',
          label: trl('menstruation-generator.field-group.basic.field.cycle-length.label'),
          type: 'number',
        },
      ],
    },
  ];
  const helper = {
    getAdapter: dependencies.getAdapter,
    primaryAdapterId: dependencies.primaryAdapterId,
  };

  const generate = (cfg) => {
    const event = new dependencies.Event({
      id: cfg.id,
      generatorId: id,
      title: trl('menstruation-generator.event.period-days.title'),
      color: '#ee10f6',
      since: new dependencies.OneDate(cfg.start, helper),
      till: new dependencies.OneDate(cfg.start, helper).offsetDay(cfg.periodLength - 1),
      overlap: { internal: 'trim', external: 'trim-forever' },
      repeats: [{ times: -1, cycle: 'day', step: cfg.cycleLength }],
      sequels: [
        {
          title: trl('menstruation-generator.event.peak-ovulation.title'),
          color: '#00aeef',
          since: { scale: 'day', offset: 10 },
          till: { scale: 'day', offset: 14 },
        },
        {
          title: trl('menstruation-generator.event.pre-period.title'),
          color: '#f36',
          since: { scale: 'day', offset: -2 },
          till: { scale: 'day', offset: -1 },
        },
        {
          title: trl('menstruation-generator.event.post-period.title'),
          color: '#7e70ff',
          since: { scale: 'day', offset: cfg.periodLength },
          till: { scale: 'day', offset: cfg.periodLength + 1 },
        },
      ],
    });
    return event;
  };

  return { id, name, inputs, generate };
};

exports.Generator = Generator;
