"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildIdentity = buildIdentity;
exports.createIdentity = createIdentity;
exports.updateIdentity = updateIdentity;

var _uuid = require("uuid");

var _constructors = require("./constructors");

var _checksum = require("./checksum");

var _i18n = require("./i18n");

var _common = require("./utils/common");

const IDENTITY_FIELDS = [['authority', 'string'], ['blockType', 'string', {
  default: 'identity'
}], //  ['checksum',      'string'],
['description', 'string', {
  localized: true
}], ['fields', 'fields'], //  ['id',            'id'],
//  ['identifier',    'identifier'],
['interface', 'string'], ['items', 'items'], //  ['language',      'language', { default: 'en' }],
//  ['name',          'string'],
['owner', 'string'], ['priorChecksums', 'stringList'], //  ['translations',  'translations'],
['title', 'string', {
  localized: true
}], ['writer', 'string']];
/**
 * Returns a draft Identity object, without an id or checksum.
 * @param {Object} data - An object with the data to populate the identity with.
 * @returns {Object} The identity object with the data structured according to the identity standard.
 */

function buildIdentity(data = {}) {
  const language = (0, _i18n.getLanguage)(data.language);
  const translations = (0, _i18n.getTranslations)(data.translations);
  const identity = { ...(0, _constructors.buildMeta)(IDENTITY_FIELDS, data, {
      language,
      translations
    }),
    id: null,
    identifier: null,
    type: 'identity',
    schemaIdentifier: null,
    schemaChecksum: null,
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
  return identity;
}
/**
 * Returns a created Identity object, with an id and checksum calculated.
 * @param {Object} data - An object with the data to populate the identity with.
 * @returns {Object} The identity object with the data structured according to the identity standard.
 */


function createIdentity(data = {}) {
  const timeStamp = new Date().getTime();
  const language = (0, _i18n.getLanguage)(data.language);
  const translations = (0, _i18n.getTranslations)(data.translations);
  const id = (0, _uuid.v4)();
  const meta = (0, _constructors.buildMeta)(IDENTITY_FIELDS, data, {
    language,
    translations
  });
  const identity = { ...meta,
    id,
    identifier: `${meta.authority}/${id}`,
    type: 'identity',
    schemaIdentifier: null,
    schemaChecksum: null,
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
  const checksum = (0, _checksum.calculateChecksum)(identity);
  return (0, _common.objectWithSortedKeys)({ ...identity,
    checksum
  });
}
/**
 * Returns an updated Identity object, replacing all attributes that are present in data, keeping the
 * original values for any that are not specified or those that are not allowed to be changed.
 * @param {Object} originalIdentity - The originalIdentity object.
 * @param {Object} data - An object with the data to populate the identity with.
 * @returns {Object} The updated identity object.
 */


function updateIdentity(originalIdentity, data) {
  if (!data) {
    return originalIdentity;
  }

  const timeStamp = new Date().getTime();
  const language = (0, _i18n.getLanguage)(data.language || originalIdentity.language);
  const translations = (0, _i18n.getTranslations)(data.translations || originalIdentity.translations);
  const {
    id
  } = originalIdentity;
  const meta = (0, _constructors.buildMeta)(IDENTITY_FIELDS, { ...originalIdentity,
    ...data
  }, {
    language,
    translations
  });
  const identity = { ...meta,
    id,
    identifier: id ? `${meta.authority}/${id}` : null,
    type: 'identity',
    schemaIdentifier: originalIdentity.schemaIdentifier,
    schemaChecksum: originalIdentity.schemaChecksum,
    language,
    translations,
    checksum: null,
    priorChecksums: originalIdentity.priorChecksums,
    createdAt: originalIdentity.createdAt,
    updatedAt: timeStamp,
    publishedAt: null,
    // Only for published
    url: null,
    version: null // Optional

  };
  return (0, _common.objectWithSortedKeys)(identity);
}