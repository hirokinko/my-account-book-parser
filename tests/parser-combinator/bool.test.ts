import test, { describe } from 'node:test';
import { bool } from '../../src/parser-combinator/bool';
import assert from 'node:assert/strict';
import { ParserOutput } from '../../src/parser-combinator/types';

describe('bool', () => {
  const parser = bool;

  test('Empty input', () => {
    const input = {
      inputs: [],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<boolean>>(output, {
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
    assert.deepStrictEqual<ParserOutput<boolean>>(output, {
      result: 'success',
      data: true,
      rest: {
        inputs: [],
        line: 0,
        col: 4,
      },
    });
  });

  test('Input "false"', () => {
    const input = {
      inputs: [...'false'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<boolean>>(output, {
      result: 'success',
      data: false,
      rest: {
        inputs: [],
        line: 0,
        col: 5,
      },
    });
  });

  test('Input "null"', () => {
    const input = {
      inputs: [...'null'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<boolean>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });
});
