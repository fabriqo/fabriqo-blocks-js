"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sha512 = sha512;
exports.sortedObjectKeys = sortedObjectKeys;
exports.objectWithSortedKeys = objectWithSortedKeys;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sha512(str) {
  return _crypto.default.createHash('sha512').update(str).digest('hex');
}

function sortedObjectKeys(object) {
  return Object.keys(object).sort();
}

function objectWithSortedKeys(object) {
  return sortedObjectKeys(object).reduce((acc, attr) => ({ ...acc,
    [attr]: object[attr]
  }), {});
}