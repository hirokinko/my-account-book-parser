import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import type { ParserOutput } from '../../src/parser-combinator/types';
import { date } from '../../src/lexers/datetime';

describe('date', () => {
  const parser = date;

  test('Empty input', () => {
    const input = {
      inputs: [],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Date>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });

  test('Input "2024-01-01"', () => {
    const input = {
      inputs: [...'2024-01-01'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Date>>(output, {
      result: 'success',
      data: new Date('2024-01-01'),
      rest: {
        inputs: [],
        line: 0,
        col: 10,
      },
    });
  });

  test('Input "0000-00-00"(Invalid date)', () => {
    const input = {
      inputs: [...'0000-00-00'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Date>>(output, {
      result: 'fail',
      col: 10,
      line: 0,
      message: 'Invalid date: 0000-00-00',
    });
  });
});
