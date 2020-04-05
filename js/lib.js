const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const toArray = (nodes) => Array.prototype.slice.call(nodes);

const lib = (() => {
  const onReady = (fn) => {
    document.addEventListener("DOMContentLoaded", fn);
  };

  return {
    onReady: onReady,
  };
})();
