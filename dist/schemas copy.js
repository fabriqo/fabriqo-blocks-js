"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildSchema = buildSchema;
exports.createSchema = createSchema;
exports.updateSchema = updateSchema;

var _uuid = require("uuid");

var _constructors = require("./constructors");

var _checksum = require("./checksum");

var _i18n = require("./i18n");

var _common = require("./utils/common");

const SCHEMA_FIELDS = [['authority', 'string'], ['blockType', 'string', {
  default: 'block'
}], //  ['checksum',      'string'],
['description', 'string', {
  localized: true
}], ['fieldDefinitions', 'fieldDefinitions'], //  ['id',            'id'],
//  ['identifier',    'identifier'],
['interface', 'string'], ['itemDefinitions', 'itemDefinitions'], //  ['language',      'language', { default: 'en' }],
['license', 'string'], //  ['name',          'string'],
['owner', 'string'], ['priorChecksums', 'stringList'], //  ['translations',  'translations'],
['title', 'string', {
  localized: true
}], ['writer', 'string']];
/**
 * Returns a draft Schema object, without an id or checksum.
 * @param {Object} data - An object with the data to populate the schema with.
 * @returns {Object} The schema object with the data structured according to the schema standard.
 */

function buildSchema(data = {}) {
  const language = (0, _i18n.getLanguage)(data.language);
  const translations = (0, _i18n.getTranslations)(data.translations);
  const schema = { ...(0, _constructors.buildMeta)(SCHEMA_FIELDS, data, {
      language,
      translations
    }),
    id: null,
    identifier: null,
    type: 'schema',
    language,
    translations,
    checksum: null,
    priorChecksums: [],
    protocol: (0, _constructors.protocolVersion)(),
    createdAt: null,
    updatedAt: null,
    publishedAt: null,
    // Only for published
    url: null,
    version: null // Optional

  };
  return schema;
}
/**
 * Returns a created Schema object, with an id and checksum calculated.
 * @param {Object} data - An object with the data to populate the schema with.
 * @returns {Object} The schema object with the data structured according to the schema standard.
 */


function createSchema(data = {}) {
  const timeStamp = new Date().getTime();
  const language = (0, _i18n.getLanguage)(data.language);
  const translations = (0, _i18n.getTranslations)(data.translations);
  const id = (0, _uuid.v4)();
  const meta = (0, _constructors.buildMeta)(SCHEMA_FIELDS, data, {
    language,
    translations
  });
  const schema = { ...meta,
    id,
    identifier: `${meta.authority}/${id}`,
    type: 'schema',
    language,
    translations,
    priorChecksums: [],
    protocol: (0, _constructors.protocolVersion)(),
    createdAt: timeStamp,
    updatedAt: timeStamp,
    publishedAt: null,
    // Only for published
    url: null,
    version: null // Optional to set version number

  };
  const checksum = (0, _checksum.calculateChecksum)(schema);
  return (0, _common.objectWithSortedKeys)({ ...schema,
    checksum
  });
}
/**
 * Returns an updated Schema object, replacing all attributes that are present in data, keeping the
 * original values for any that are not specified or those that are not allowed to be changed.
 * @param {Object} originalSchema - The originalShema object.
 * @param {Object} data - An object with the data to populate the schema with.
 * @returns {Object} The updated schema object.
 */


function updateSchema(originalSchema, data) {
  if (!data) {
    return originalSchema;
  }

  const timeStamp = new Date().getTime();
  const language = (0, _i18n.getLanguage)(data.language || originalSchema.language);
  const translations = (0, _i18n.getTranslations)(data.translations || originalSchema.translations);
  const {
    id
  } = originalSchema;
  const meta = (0, _constructors.buildMeta)(SCHEMA_FIELDS, { ...originalSchema,
    ...data
  }, {
    language,
    translations
  });
  const schema = { ...meta,
    id,
    identifier: id ? `${meta.authority}/${id}` : null,
    type: 'schema',
    language,
    translations,
    checksum: null,
    priorChecksums: originalSchema.priorChecksums,
    createdAt: originalSchema.createdAt,
    updatedAt: timeStamp,
    publishedAt: null,
    // Only for published
    url: null,
    version: null // Optional

  };
  return (0, _common.objectWithSortedKeys)(schema);
}