import { v4 as uuid } from 'uuid';

import { buildMeta, protocolVersion } from "./constructors";
import { calculateChecksum } from "./checksum";
import { getLanguage, getTranslations } from "./i18n";
import { objectWithSortedKeys } from "./utils/common";

const IDENTITY_FIELDS = [
  ['authority',         'string'],
  ['blockType',         'string', { default: 'identity' }],
//  ['checksum',      'string'],
  ['description',       'string', { localized: true }],
  ['fields',            'fields'],
//  ['id',            'id'],
//  ['identifier',    'identifier'],
  ['interface',         'string'],
  ['items',             'items'],
//  ['language',      'language', { default: 'en' }],
//  ['name',          'string'],
  ['owner',             'string'],
  ['priorChecksums',    'stringList'],
//  ['translations',  'translations'],
  ['title',             'string', { localized: true }],
  ['writer',            'string'],
];

/**
 * Returns a draft Identity object, without an id or checksum.
 * @param {Object} data - An object with the data to populate the identity with.
 * @returns {Object} The identity object with the data structured according to the identity standard.
 */
export function buildIdentity(data = {}) {
  const language = getLanguage(data.language);
  const translations = getTranslations(data.translations);

  const identity = {
    ...buildMeta(IDENTITY_FIELDS, data, { language, translations }),

    id: null,
    identifier: null,
    type: 'identity',
    schemaIdentifier: null,
    schemaChecksum: null,

    language,
    translations,

    checksum: null,
    priorChecksums: [],
    protocol: protocolVersion(),

    createdAt: null,
    updatedAt: null,
    publishedAt: null,

    // Only for published
    url: null,
    version: null, // Optional
  };

  return identity;
}

/**
 * Returns a created Identity object, with an id and checksum calculated.
 * @param {Object} data - An object with the data to populate the identity with.
 * @returns {Object} The identity object with the data structured according to the identity standard.
 */
export function createIdentity(data = {}) {
  const timeStamp = new Date().getTime();
  const language = getLanguage(data.language);
  const translations = getTranslations(data.translations);
  const id = uuid();

  const meta = buildMeta(IDENTITY_FIELDS, data, { language, translations });

  const identity = {
    ...meta,
    id,
    identifier: `${meta.authority}/${id}`,
    type: 'identity',
    schemaIdentifier: null,
    schemaChecksum: null,

    language,
    translations,

    priorChecksums: [],
    protocol: protocolVersion(),

    createdAt: timeStamp,
    updatedAt: timeStamp,
    publishedAt: null,

    // Only for published
    url: null,
    version: null, // Optional to set version number
  };

  const checksum = calculateChecksum(identity);

  return objectWithSortedKeys({ ...identity, checksum });
}

/**
 * Returns an updated Identity object, replacing all attributes that are present in data, keeping the
 * original values for any that are not specified or those that are not allowed to be changed.
 * @param {Object} originalIdentity - The originalIdentity object.
 * @param {Object} data - An object with the data to populate the identity with.
 * @returns {Object} The updated identity object.
 */
export function updateIdentity(originalIdentity, data) {
  if (!data) {
    return originalIdentity;
  }

  const timeStamp = new Date().getTime();
  const language = getLanguage(data.language || originalIdentity.language);
  const translations = getTranslations(data.translations || originalIdentity.translations);
  const { id } = originalIdentity;

  const meta = buildMeta(IDENTITY_FIELDS, { ...originalIdentity, ...data }, { language, translations });

  const identity = {
    ...meta,

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
    version: null, // Optional
  };

  return objectWithSortedKeys(identity);
}
