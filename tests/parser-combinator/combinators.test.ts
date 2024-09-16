import { not, or, cat, rep } from '../../src/parser-combinator/combinators';
import { char } from '../../src/parser-combinator/char';
import type { ParserOutput } from '../../src/parser-combinator/types';
import test, { describe } from 'node:test';
import assert from 'node:assert/strict';

describe('not(char("a"))', () => {
  const parser = not(char('a'));

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<null>>(output, {
      result: 'success',
      data: null,
      rest: [],
    });
  });

  test('Input "a"', () => {
    const input = [...'a'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<null>>(output, {
      result: 'fail',
    });
  });

  test('Input "A"', () => {
    const input = [...'A'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<null>>(output, {
      result: 'success',
      data: null,
      rest: [...'A'],
    });
  });

  test('Input "hoge"', () => {
    const input = [...'hoge'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<null>>(output, {
      result: 'success',
      data: null,
      rest: [...'hoge'],
    });
  });
});

describe('or()', () => {
  describe('or([])', () => {
    const parser = or([]);

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<unknown>>(output, {
        result: 'fail',
      });
    });

    test('Input "a"', () => {
      const input = [...'a'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<unknown>>(output, {
        result: 'fail',
      });
    });
  });

  describe('or([char("a"), char("b")])', () => {
    const parser = or([char('a'), char('b')]);

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a' | 'b'>>(output, {
        result: 'fail',
      });
    });

    test('Input "a"', () => {
      const input = [...'a'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a' | 'b'>>(output, {
        result: 'success',
        data: 'a',
        rest: [],
      });
    });

    test('Input "b"', () => {
      const input = [...'b'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a' | 'b'>>(output, {
        result: 'success',
        data: 'b',
        rest: [],
      });
    });

    test('Input "A"', () => {
      const input = [...'A'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a' | 'b'>>(output, {
        result: 'fail',
      });
    });
  });
});

describe('cat()', () => {
  describe('cat([])', () => {
    const parser = cat([]);

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<[]>>(output, {
        result: 'success',
        data: [],
        rest: [],
      });
    });

    test('Input "a"', () => {
      const input = [...'a'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<[]>>(output, {
        result: 'success',
        data: [],
        rest: [...'a'],
      });
    });
  });

  describe('cat([char("a"), char("b")])', () => {
    const parser = cat([char('a'), char('b')]);

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<['a', 'b']>>(output, {
        result: 'fail',
      });
    });

    test('input "a"', () => {
      const input = [...'a'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<['a', 'b']>>(output, {
        result: 'fail',
      });
    });

    test('input "abc"', () => {
      const input = [...'abc'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<['a', 'b']>>(output, {
        result: 'success',
        data: ['a', 'b'],
        rest: [...'c'],
      });
    });

    test('input "A"', () => {
      const input = [...'A'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<['a', 'b']>>(output, {
        result: 'fail',
      });
    });
  });
});

describe('rep()', () => {
  describe('rep(char("a"))', () => {
    const parser = rep(char('a'));

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: [],
        rest: [],
      });
    });

    test('Input "a"', () => {
      const input = [...'a'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: ['a'],
        rest: [],
      });
    });

    test('Input "aa"', () => {
      const input = [...'aa'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: ['a', 'a'],
        rest: [],
      });
    });

    test('Input "aab"', () => {
      const input = [...'aab'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: ['a', 'a'],
        rest: [...'b'],
      });
    });
  });

  describe('rep(char("a"), 1)', () => {
    const parser = rep(char('a'), 1);

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'fail',
      });
    });

    test('Input "a"', () => {
      const input = [...'a'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: ['a'],
        rest: [],
      });
    });

    test('Input "aa"', () => {
      const input = [...'aa'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: ['a', 'a'],
        rest: [],
      });
    });

    test('Input "aab"', () => {
      const input = [...'aab'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: ['a', 'a'],
        rest: [...'b'],
      });
    });
  });

  describe('rep(char("a"), 1, 2)', () => {
    const parser = rep(char('a'), 1, 2);

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'fail',
      });
    });

    test('Input "a"', () => {
      const input = [...'a'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: ['a'],
        rest: [],
      });
    });

    test('Input "aa"', () => {
      const input = [...'aa'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: ['a', 'a'],
        rest: [],
      });
    });

    test('Input "aaa"', () => {
      const input = [...'aaa'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: ['a', 'a'],
        rest: [...'a'],
      });
    });
  });
});
