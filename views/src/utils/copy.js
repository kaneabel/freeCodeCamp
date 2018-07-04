/**
 * Copy deep an Object
 * @param {*} obj
 */
const copyDeep = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(copyDeep);
  }

  if (obj && typeof obj === 'object') {
    const cloned = {};
    const keys = Object.keys(obj);
    for (let i = 0, l = keys.length; i < l; i += 1) {
      const key = keys[i];
      cloned[key] = copyDeep(obj[key]);
    }
    return cloned;
  }

  return obj;
};

export default copyDeep;
