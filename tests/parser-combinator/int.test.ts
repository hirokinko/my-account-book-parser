import test, { describe } from 'node:test';
import { int } from '../../src/parser-combinator/int';
import type { ParserOutput } from '../../src/parser-combinator/types';
import assert from 'node:assert/strict';

describe('int', () => {
  const parser = int;

  test('Empty input', () => {
    const input = {
      inputs: [],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<number>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });

  test('Input "true"', () => {
    const input = {
      inputs: [...'true'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<number>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });

  test('Input "0"', () => {
    const input = {
      inputs: [...'0'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<number>>(output, {
      result: 'success',
      data: 0,
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input "42"', () => {
    const input = {
      inputs: [...'42'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<number>>(output, {
      result: 'success',
      data: 42,
      rest: {
        inputs: [],
        line: 0,
        col: 2,
      },
    });
  });

  test('Input "-273"', () => {
    const input = {
      inputs: [...'-273'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<number>>(output, {
      result: 'success',
      data: -273,
      rest: {
        inputs: [],
        line: 0,
        col: 4,
      },
    });
  });

  test('Input "+3735928559"', () => {
    const input = {
      inputs: [...'+3735928559'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<number>>(output, {
      result: 'success',
      data: 3735928559,
      rest: {
        inputs: [],
        line: 0,
        col: 11,
      },
    });
  });
});
