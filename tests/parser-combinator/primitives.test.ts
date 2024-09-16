import test, { describe } from 'node:test';
import { anyChar, eof } from '../../src/parser-combinator/primitives';
import type { ParserOutput } from '../../src/parser-combinator/types';
import assert from 'node:assert/strict';

describe('anyChar', () => {
  const parser = anyChar;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'fail',
    });
  });

  test('1 character input', () => {
    const input = [...'a'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: 'a',
      rest: [],
    });
  });

  test('Many characters input', () => {
    const input = [...'hoge'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: 'h',
      rest: [...'oge'],
    });
  });
});

describe('eof', () => {
  const parser = eof;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<null>>(output, {
      result: 'success',
      data: null,
      rest: [],
    });
  });

  test('1 character input', () => {
    const input = [...'a'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<null>>(output, {
      result: 'fail',
    });
  });
});
