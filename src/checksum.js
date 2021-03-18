import { sha512, sortedObjectKeys } from "./utils/common";

/**
 * Calculates the checksum of an object. This function will sort the object keys before processing,
 * but assumes all values have already been validated.
 * @param {Object} data - The object to calculate the checksum for.
 * @param {Object} [metaOptions={}] - An optional object with additional instructions.
 * @returns {string} The checksum representatation of an object.
 */
export function calculateChecksum(data, metaOptions = {}) {
  const keyValues = sortedObjectKeys(data).map(key => {
    const value = valueForChecksum(data[key], metaOptions);
    return [key, value];
  });

  const checksumObject = keyValues.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return sha512(JSON.stringify(checksumObject));
}

/**
 * Returns the value to be used when calculating a checksum.
 * @param {*} data - The value that we want a representation of.
 * @param {Object} [metaOptions={}] - An optional object with additional instructions.
 * @returns {*} The value that should be used to represent the data in a checksum calculation.
 */
export function valueForChecksum(data, metaOptions) {
  const type = typeOfValue(data, metaOptions);

  switch(type) {
    case 'array':
      return data.map(val => valueForChecksum(val, metaOptions));
    case 'object':
      return calculateChecksum(data, metaOptions);

    default:
      return data;
  }
}


function typeOfValue(value, metaOptions) {
  // Allow override from metaOptions...
  if (Array.isArray(value)) {
    return 'array';
  } else if (value === null) {
    return 'null';
  } else {
    return typeof value;
  }
}
