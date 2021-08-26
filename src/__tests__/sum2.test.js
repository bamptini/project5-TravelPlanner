const sum = require('../client/js/sum');

test('adds 4 + 5 to equal 9', () => {
  expect(sum(4, 5)).toBe(9);
});