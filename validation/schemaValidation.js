const sanitizeHtml = require('sanitize-html');
const Joi = require('joi');

const fname = 'Abdulraqib';
const lname = 'Olayanju';

let customJoi = Joi.extend((joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.htmlStrip': '{{#label}} not contain any html tags',
  },
  rules: {
    htmlStrip: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean == value) {
          return clean;
        }
        return helpers.error('string.htmlStrip');
      },
    },
  },
}));

let schema = customJoi.object().keys({
  learner_id: customJoi
    .string()
    .htmlStrip()
    .regex(/^-?[0-9]\d*(\.\d+)?$/)
    .required(),
  firstname: customJoi.string().htmlStrip().allow('').required(),
});

module.exports = {
  schema: schema,
};
