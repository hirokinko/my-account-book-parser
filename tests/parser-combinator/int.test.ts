import test, { describe } from 'node:test';
import { int } from '../../src/parser-combinator/int';
import type { ParserOutput } from '../../src/parser-combinator/types';
import assert from 'node:assert/strict';

describe('int', () => {
  const parser = int;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<number>>(output, {
      result: 'fail',
    });
  });

  test('Input "true"', () => {
    const input = [...'true'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<number>>(output, {
      result: 'fail',
    });
  });

  test('Input "0"', () => {
    const input = [...'0'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<number>>(output, {
      result: 'success',
      data: 0,
      rest: [],
    });
  });

  test('Input "42"', () => {
    const input = [...'42'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<number>>(output, {
      result: 'success',
      data: 42,
      rest: [],
    });
  });

  test('Input "-273"', () => {
    const input = [...'-273'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<number>>(output, {
      result: 'success',
      data: -273,
      rest: [],
    });
  });

  test('Input "+3735928559"', () => {
    const input = [...'+3735928559'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<number>>(output, {
      result: 'success',
      data: 3735928559,
      rest: [],
    });
  });
});
