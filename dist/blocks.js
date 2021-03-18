"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildBlock = buildBlock;
exports.buildTransform = buildTransform;

var _constructors = require("./constructors");

const BLOCK_FIELDS = [];
const TRANSFORM_FIELDS = [];

function buildBlock(data = {}) {
  return (0, _constructors.buildMeta)(BLOCK_FIELDS, data);
}

function buildTransform(data = {}) {
  return (0, _constructors.buildMeta)(TRANSFORM_FIELDS, data);
}