export default function debounce(callback, delay) {
  let timer;
  return (...args) => {
    // se tiver algo em timer ele vai limpar
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
}
