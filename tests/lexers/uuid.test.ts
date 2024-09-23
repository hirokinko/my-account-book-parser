import test, { describe } from 'node:test';
import { uuid } from '../../src/lexers/uuid';
import assert from 'node:assert/strict';
import type { ParserOutput } from '../../src/parser-combinator/types';

describe('uuid', () => {
  const parser = uuid;

  test('Empty input', () => {
    const input = {
      inputs: [],
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

  test('Input "550e8400-e29b-41d4-a716-446655440000"', () => {
    const input = {
      inputs: [...'550e8400-e29b-41d4-a716-446655440000'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: '550e8400-e29b-41d4-a716-446655440000',
      rest: {
        inputs: [],
        line: 0,
        col: 36,
      },
    });
  });

  test('Input "550e8400-e29b-91d4-a716-446655440000"(Invalid uuid version)', () => {
    const input = {
      inputs: [...'550e8400-e29b-91d4-a716-446655440000'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'fail',
      line: 0,
      col: 14,
    });
  });
});
