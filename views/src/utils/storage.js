export default {
  support() {
    if (typeof(Storage) !== 'undefined') {
      return true
    } else {
      return false;
    }
  },
  get(key) {
    if (!support()) {
      return null;
    }
    return window.localStorage.getItem(key);
  },
  set(key, value) {
    if (!support()) {
      return null;
    }
    window.localstorage.setItem(key, value);
  },
  remove(key) {
    if(!support()) {
      return null;
    }
    window.localstorage.removeItem(key);
  },
};
