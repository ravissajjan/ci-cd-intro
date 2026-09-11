const test = require('node:test');
const assert = require('node:assert');
const { add, subtract, multiply, divide } = require('./math');

test('add works', () => {
  assert.equal(add(2, 3), 5);
});

test('subtract works', () => {
  assert.equal(subtract(9, 4), 5);
});

test('multiply works', () => {
  assert.equal(multiply(3, 4), 12);
});

test('divide works', () => {
  assert.equal(divide(10, 2), 5);
});

test('divide by zero gives an error', () => {
  assert.throws(() => divide(5, 0));
});
