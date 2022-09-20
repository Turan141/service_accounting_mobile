/**
 * Convert string from snake_case to camelCase
 *
 * @param sourceString string
 * @returns string
 */
export default function toCamelCase(sourceString: string) {
  return sourceString.replace(/([-_][a-z])/gi, $1 => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
}
