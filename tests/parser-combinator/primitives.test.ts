import test, { describe } from 'node:test';
import { anyChar, eof } from '../../src/parser-combinator/primitives';
import type { ParserOutput } from '../../src/parser-combinator/types';
import assert from 'node:assert/strict';

describe('anyChar', () => {
  const parser = anyChar;

  test('Empty input', () => {
    const input = {
      inputs: [] as readonly string[],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });

  test('1 character input', () => {
    const input = {
      inputs: [...'a'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: 'a',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Many characters input', () => {
    const input = {
      inputs: [...'hoge'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: 'h',
      rest: {
        inputs: [...'oge'],
        line: 0,
        col: 1,
      },
    });
  });
});

describe('eof', () => {
  const parser = eof;

  test('Empty input', () => {
    const input = {
      inputs: [] as const,
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<null>>(output, {
      result: 'success',
      data: null,
      rest: {
        inputs: [],
        line: 0,
        col: 0,
      },
    });
  });

  test('1 character input', () => {
    const input = {
      inputs: [...'a'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<null>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });
});
