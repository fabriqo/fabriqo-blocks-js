import crypto from "crypto";

export function sha512(str) {
  return crypto.createHash('sha512').update(str).digest('hex')
}

export function sortedObjectKeys(object) {
  return Object.keys(object).sort();
}

export function objectWithSortedKeys(object) {
  return sortedObjectKeys(object).reduce((acc, attr) => (
    { ...acc, [attr]: object[attr] }
  ), {});
}
