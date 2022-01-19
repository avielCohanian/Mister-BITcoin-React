function store(key, value) {
  localStorage[key] = JSON.stringify(value);
}

function load(key, defaultValue = null) {
  var value = localStorage[key] || [];
  // return JSON.parse(value);
  return value;
}
export const storageService = {
  store,
  load,
};
