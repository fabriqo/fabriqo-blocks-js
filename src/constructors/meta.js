import { buildFieldDefinition } from "./fields";
import { buildItemDefinition } from "./items";

export function protocolVersion() {
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
  switch(type) {
    case 'fieldDefinitions':
      return Array.isArray(data) ? data.map(val => buildFieldDefinition(val, metaOptions)) : [];

    case 'itemDefinitions':
      return Array.isArray(data) ? data.map(val => buildItemDefinition(val, metaOptions)) : [];

    case 'stringList':
      return Array.isArray(data) ? data.slice().sort() : [];

    default:
      return valueFor(data, attributeOptions, metaOptions);
  }
}


export function buildMeta(metaAttributes, data = {}, metaOptions = {}) {
  const {
//    language,
    translations = [],
  } = metaOptions;

  const block = metaAttributes.reduce((block, [attribute, type, attributeOptions]) => {
    const nextBlock = {
      ...block,
      [attribute]: buildAttribute(type, data[attribute], attributeOptions, metaOptions),
    };

    if (attributeOptions?.localized) {
      return translations.reduce((nextBlock, translation) => {
        const attributeName = `${attribute}.${translation}`;
        return {
          ...nextBlock,
          [attributeName]: buildAttribute(type, data[attributeName], attributeOptions, metaOptions),
        }
      }, nextBlock);
    }

    return nextBlock;
  }, {});

  return block;
}
