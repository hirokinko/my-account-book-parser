import test, { describe } from 'node:test';
import { dateTime } from '../src/parsers';
import assert from 'node:assert';
import { ParserOutput } from '../src/parser-combinator/types';

describe('dateTime', () => {
  test('yyyy-MM-dd and exists date', () => {
    const input = {
      inputs: [...'2024-01-01'],
      line: 0,
      col: 0,
    };
    const output = dateTime(input);
    assert.deepStrictEqual<ParserOutput<Date | undefined>>(output, {
      result: 'success',
      data: new Date('2024-01-01'),
      rest: {
        inputs: [],
        line: 0,
        col: 10,
      },
    });
  });

  test('yyyy-MM-dd and not exists date', () => {
    const input = {
      inputs: [...'2024-02-30'],
      line: 0,
      col: 0,
    };
    const output = dateTime(input);
    assert.deepStrictEqual<ParserOutput<Date | undefined>>(output, {
      result: 'success',
      data: new Date('2024-03-01'), // 2024-02-30 は2024年が閏年なので、3月1日扱いになる
      rest: {
        inputs: [],
        line: 0,
        col: 10,
      },
    });
  });

  test('yyyy-MM-dd and wrong input(year)', () => {
    const input = {
      inputs: [...'0001-02-30'],
      line: 0,
      col: 0,
    };
    const output = dateTime(input);
    assert.deepStrictEqual<ParserOutput<Date | undefined>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });

  test('yyyy-MM-dd and wrong input(month, lowest)', () => {
    const input = {
      inputs: [...'2024-00-30'],
      line: 0,
      col: 0,
    };
    const output = dateTime(input);
    assert.deepStrictEqual<ParserOutput<Date | undefined>>(output, {
      result: 'fail',
      line: 0,
      col: 5,
    });
  });

  test('yyyy-MM-dd and wrong input(month, highest)', () => {
    const input = {
      inputs: [...'2024-13-30'],
      line: 0,
      col: 0,
    };
    const output = dateTime(input);
    assert.deepStrictEqual<ParserOutput<Date | undefined>>(output, {
      result: 'fail',
      line: 0,
      col: 5,
    });
  });

  test('yyyy-MM-dd and wrong input(day, lowest)', () => {
    const input = {
      inputs: [...'2024-01-00'],
      line: 0,
      col: 0,
    };
    const output = dateTime(input);
    assert.deepStrictEqual<ParserOutput<Date | undefined>>(output, {
      result: 'fail',
      line: 0,
      col: 8,
    });
  });

  test('yyyy-MM-dd and wrong input(day, highest)', () => {
    const input = {
      inputs: [...'2024-01-32'],
      line: 0,
      col: 0,
    };
    const output = dateTime(input);
    assert.deepStrictEqual<ParserOutput<Date | undefined>>(output, {
      result: 'fail',
      line: 0,
      col: 8,
    });
  });

  test('yyyy-MM-ddTHH:mm:ss', () => {
    const input = {
      inputs: [...'2024-01-01T00:00:00'],
      line: 0,
      col: 0,
    };
    const output = dateTime(input);
    assert.deepStrictEqual<ParserOutput<Date | undefined>>(output, {
      result: 'success',
      data: new Date('2024-01-01T00:00:00'),
      rest: {
        inputs: [],
        line: 0,
        col: 19,
      },
    });
  });

  test('yyyy-MM-ddTHH:mm:ss+HH:mm', () => {
    const input = {
      inputs: [...'2024-01-01T00:00:00+09:00'],
      line: 0,
      col: 0,
    };
    const output = dateTime(input);
    assert.deepStrictEqual<ParserOutput<Date | undefined>>(output, {
      result: 'success',
      data: new Date('2024-01-01T00:00:00+09:00'),
      rest: {
        inputs: [],
        line: 0,
        col: 25,
      },
    });
  });

  test('yyyy-MM-ddTHH:mm:ss-HH:mm', () => {
    const input = {
      inputs: [...'2024-01-01T00:00:00-09:00'],
      line: 0,
      col: 0,
    };
    const output = dateTime(input);
    assert.deepStrictEqual<ParserOutput<Date | undefined>>(output, {
      result: 'success',
      data: new Date('2024-01-01T00:00:00-09:00'),
      rest: {
        inputs: [],
        line: 0,
        col: 25,
      },
    });
  });
});
