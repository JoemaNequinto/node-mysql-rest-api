export default function wrapAsync(fn) {
  // eslint-disable-next-line func-names
  return function(req, res, next) {
    fn(req, res, next).catch(next);
  };
}
