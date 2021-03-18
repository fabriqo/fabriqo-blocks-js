"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protocolVersion = protocolVersion;
exports.buildMeta = buildMeta;

var _fields = require("./fields");

var _items = require("./items");

function protocolVersion() {
  return "FBRQ-1.0";
}

function valueFor(value, attributeOptions = {}, metaOptions = {}) {
  const hasDefault = attributeOptions.hasOwnProperty('default');

  if (value === undefined) {
    return hasDefault ? attributeOptions.default : value;
  }

  return value;
}

function buildAttribute(type, data, attributeOptions, metaOptions) {
  switch (type) {
    case 'fieldDefinitions':
      return Array.isArray(data) ? data.map(val => (0, _fields.buildFieldDefinition)(val, metaOptions)) : [];

    case 'itemDefinitions':
      return Array.isArray(data) ? data.map(val => (0, _items.buildItemDefinition)(val, metaOptions)) : [];

    case 'stringList':
      return Array.isArray(data) ? data.slice().sort() : [];

    default:
      return valueFor(data, attributeOptions, metaOptions);
  }
}

function buildMeta(metaAttributes, data = {}, metaOptions = {}) {
  const {
    //    language,
    translations = []
  } = metaOptions;
  const block = metaAttributes.reduce((block, [attribute, type, attributeOptions]) => {
    const nextBlock = { ...block,
      [attribute]: buildAttribute(type, data[attribute], attributeOptions, metaOptions)
    };

    if (attributeOptions !== null && attributeOptions !== void 0 && attributeOptions.localized) {
      return translations.reduce((nextBlock, translation) => {
        const attributeName = `${attribute}.${translation}`;
        return { ...nextBlock,
          [attributeName]: buildAttribute(type, data[attributeName], attributeOptions, metaOptions)
        };
      }, nextBlock);
    }

    return nextBlock;
  }, {});
  return block;
}