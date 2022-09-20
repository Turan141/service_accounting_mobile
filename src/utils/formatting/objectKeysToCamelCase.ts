import { isArray, isObject } from 'lodash';
import { toCamelCase } from '../strings';

/**
 * Convert object keys to camelCase
 *
 * @param sourceObject object
 * @returns object
 */
export default function objectKeysToCamelCase(sourceObject: any) {
  if (isArray(sourceObject)) {
    return sourceObject.map(key => objectKeysToCamelCase(key));
  } else if (isObject(sourceObject)) {
    const convertedObject = {};

    Object.keys(sourceObject).forEach(key => {
      convertedObject[toCamelCase(key)] = objectKeysToCamelCase(sourceObject[key]);
    });

    return convertedObject;
  }

  return sourceObject;
}
