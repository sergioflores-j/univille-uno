export default function log(...message) {
  if (window.debug === true) {
    // eslint-disable-next-line no-console
    console.log(...message);
  }
}
