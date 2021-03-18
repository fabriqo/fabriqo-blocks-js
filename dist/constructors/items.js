"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildItemDefinition = buildItemDefinition;

var _fields = require("./fields");

function buildItemDefinition(data) {
  const {
    displayName,
    name,
    fieldDefinitions
  } = data;
  return {
    displayName,
    fieldDefinitions: Array.isArray(fieldDefinitions) ? fieldDefinitions.map(_fields.buildFieldDefinition) : [],
    name
  };
}