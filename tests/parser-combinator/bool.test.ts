import assert from 'node:assert/strict';
import { bool } from '../../src/parser-combinator/bool';
import type { ParserOutput } from '../../src/parser-combinator/types';
import test, { describe } from 'node:test';

describe('bool', () => {
  const parser = bool;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<boolean>>(output, {
      result: 'fail',
    });
  });

  test('Input "true"', () => {
    const input = [...'true'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<boolean>>(output, {
      result: 'success',
      data: true,
      rest: [],
    });
  });

  test('Input "false"', () => {
    const input = [...'false'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<boolean>>(output, {
      result: 'success',
      data: false,
      rest: [],
    });
  });

  test('Input "null"', () => {
    const input = [...'null'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<boolean>>(output, {
      result: 'fail',
    });
  });
});
