"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildFieldDefinition = buildFieldDefinition;

var _constants = require("../constants");

function buildFieldDefinition(props, translations = []) {
  const {
    dataType,
    description,
    displayName,
    localized,
    name
  } = props; // Common attributes for all fields

  const fieldDefinition = {
    dataType,
    description,
    name,
    displayName
  };
  const translatedAttributes = localized ? translations.reduce((acc, t) => ({ ...acc,
    [`description.${t}`]: props[`description_${t}`] || null,
    [`displayName.${t}`]: props[`displayName_${t}`] || null
  }), {}) : {};
  return _constants.ALLOWED_FUNCTIONS[dataType].reduce((acc, attr) => ({ ...acc,
    [attr]: props[attr]
  }), { ...fieldDefinition,
    ...translatedAttributes
  });
}