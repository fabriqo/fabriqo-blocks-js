"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LANGUAGE_OPTIONS = exports.BLOCK_OPTIONS = exports.ATTRIBUTES = exports.ALLOWED_FUNCTIONS = exports.FIELD_LABELS = exports.FIELD_TYPES = void 0;
const FIELD_TYPES = [{
  type: 'string',
  label: 'Text',
  description: 'Titles, labels, names, etc.'
}, {
  type: 'text',
  label: 'Multiline Text',
  description: 'Longer descriptions and paragraphs'
}, {
  type: 'int',
  label: 'Number',
  description: 'Whole numbers'
}, {
  type: 'float',
  label: 'Decimal Numbers',
  description: 'Decimal numbers'
}, {
  type: 'boolean',
  label: 'Boolean',
  description: 'True or False'
}, {
  type: 'date',
  label: 'Date',
  description: 'Dates'
}, {
  type: 'datetime',
  label: 'Date / Time',
  description: 'Dates incl. time and timezone'
}, {
  type: 'block',
  label: 'Block',
  description: 'A reference to another Block'
}, {
  type: 'blockList',
  label: 'Block List',
  description: 'A list of Block references'
}, {
  type: 'item',
  label: 'Item',
  description: 'A reference to an Item'
}, {
  type: 'itemList',
  label: 'Item List',
  description: 'A list of Items'
}];
exports.FIELD_TYPES = FIELD_TYPES;
const FIELD_LABELS = {
  'string': 'Text',
  'text': 'Multiline Text',
  'int': 'Number',
  'float': 'Decimal Numbers',
  'boolean': 'Boolean',
  'date': 'Date',
  'datetime': 'Date / Time',
  'block': 'Block',
  'blockList': 'Block List',
  'item': 'Item',
  'itemList': 'Item List'
};
exports.FIELD_LABELS = FIELD_LABELS;
const ALLOWED_FUNCTIONS = {
  string: ['required', 'title', 'localized', 'unique'],
  text: ['required', 'localized'],
  int: ['required', 'title', 'unique'],
  float: ['required', 'title', 'unique'],
  boolean: ['required', 'title'],
  date: ['required', 'title', 'unique'],
  datetime: ['required', 'title', 'unique'],
  block: ['required', 'title', 'unique', 'blockType', 'blockInterface', 'blockSchema'],
  blockList: ['blockType', 'blockInterface', 'blockSchema'],
  item: ['required', 'title', 'unique', 'itemSchema'],
  itemList: ['itemSchema']
};
exports.ALLOWED_FUNCTIONS = ALLOWED_FUNCTIONS;
const ATTRIBUTES = {
  'localized': 'Localized',
  'required': 'Required',
  'title': 'Title',
  'unique': 'Unique'
};
exports.ATTRIBUTES = ATTRIBUTES;
const BLOCK_OPTIONS = [{
  label: 'Block',
  value: 'block'
}, {
  label: 'Identity',
  value: 'identity'
}, {
  label: 'Transformation',
  value: 'transformation'
}];
exports.BLOCK_OPTIONS = BLOCK_OPTIONS;
const LANGUAGE_OPTIONS = [{
  label: 'English',
  value: 'en'
}, {
  label: 'Swedish',
  value: 'sv'
}];
exports.LANGUAGE_OPTIONS = LANGUAGE_OPTIONS;