import { map, opt, str, diff, list } from '../../src/parser-combinator/util';
import type { Option } from '../../src/parser-combinator/util';
import { digit, char, Digit } from '../../src/parser-combinator/char';
import { type ParserOutput } from '../../src/parser-combinator/types';
import test, { describe } from 'node:test';
import assert from 'node:assert/strict';

describe('map(digit, s => Number.parseInt(s, 10))', () => {
  const parser = map(digit, (s) => Number.parseInt(s, 10));

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<number>>(output, {
      result: 'fail',
    });
  });

  test('Input "5"', () => {
    const input = [...'5'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<number>>(output, {
      result: 'success',
      data: 5,
      rest: [],
    });
  });
});

describe('str("true")', () => {
  const parser = str('true');

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<'true'>>(output, {
      result: 'fail',
    });
  });

  test('Input "true"', () => {
    const input = [...'true'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<'true'>>(output, {
      result: 'success',
      data: 'true',
      rest: [],
    });
  });
});

describe('opt()', () => {
  describe('opt(char("a"))', () => {
    const parser = opt(char('a'));

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<Option<'a'>>>(output, {
        result: 'success',
        data: { status: 'none' },
        rest: [],
      });
    });

    test('Input "a"', () => {
      const input = [...'a'] as const;
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<Option<'a'>>>(output, {
        result: 'success',
        data: { status: 'some', value: 'a' },
        rest: [],
      });
    });

    test('Input "aa"', () => {
      const input = [...'aa'] as const;
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<Option<'a'>>>(output, {
        result: 'success',
        data: { status: 'some', value: 'a' },
        rest: [...'a'],
      });
    });

    test('Input "b"', () => {
      const input = [...'b'] as const;
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<Option<'a'>>>(output, {
        result: 'success',
        data: { status: 'none' },
        rest: [...'b'],
      });
    });
  });
});

describe('diff(digit, char("0"))', () => {
  const parser = diff(digit, char('0'));

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Digit>>(output, {
      result: 'fail',
    });
  });

  test('Input "a"', () => {
    const input = [...'a'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Digit>>(output, {
      result: 'fail',
    });
  });

  test('Input "0"', () => {
    const input = [...'0'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Digit>>(output, {
      result: 'fail',
    });
  });

  test('Input "5"', () => {
    const input = [...'5'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Digit>>(output, {
      result: 'success',
      data: '5',
      rest: [],
    });
  });
});

describe('list(digit, char(","))', () => {
  const parser = list(digit, char(','));

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Digit[]>>(output, {
      result: 'fail',
    });
  });

  test('Input "a"', () => {
    const input = [...'a'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Digit[]>>(output, {
      result: 'fail',
    });
  });

  test('Input "1"', () => {
    const input = [...'1'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Digit[]>>(output, {
      result: 'success',
      data: ['1'],
      rest: [],
    });
  });

  test('Input "1,2,3,4,5"', () => {
    const input = [...'1,2,3,4,5'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Digit[]>>(output, {
      result: 'success',
      data: ['1', '2', '3', '4', '5'],
      rest: [],
    });
  });
});
