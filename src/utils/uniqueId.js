const idCounter = {};
const defaultPrefix = 'univille-uno';

export const resetAllCounters = () => {
  Object.keys(idCounter).forEach(key => {
    delete idCounter[key];
  });
};

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @example
 *
 * uniqueId('contact_')
 * // => 'contact_104'
 *
 * uniqueId()
 * // => '105'
 */
function uniqueId(prefix = defaultPrefix) {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0;
  }

  // eslint-disable-next-line no-plusplus
  const id = ++idCounter[prefix];
  if (prefix === defaultPrefix) {
    return `${id}`;
  }

  return `${prefix}${id}`;
}

export default uniqueId;
