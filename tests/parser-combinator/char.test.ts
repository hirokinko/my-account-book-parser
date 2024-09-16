import test, { describe } from 'node:test';
import {
  char,
  is,
  alpha,
  upperAlpha,
  lowerAlpha,
  digit,
} from '../../src/parser-combinator/char';
import type {
  Alphabet,
  UpperAlphabet,
  LowerAlphabet,
  Digit,
} from '../../src/parser-combinator/char';
import type { ParserOutput } from '../../src/parser-combinator/types';
import assert from 'node:assert/strict';

describe('char("a")', () => {
  const parser = char('a');

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<'a'>>(output, { result: 'fail' });
  });

  test('Input "a"', () => {
    const input = [...'a'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<'a'>>(output, {
      result: 'success',
      data: 'a',
      rest: [],
    });
  });

  test('Input "A"', () => {
    const input = [...'A'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<'a'>>(output, {
      result: 'fail',
    });
  });

  test('Input "hoge"', () => {
    const input = [...'hoge'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<'a'>>(output, {
      result: 'fail',
    });
  });
});

describe('is()', () => {
  describe('is(c => c === "a"', () => {
    const parser = is((c): c is 'a' => c === 'a');

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'>>(output, {
        result: 'fail',
      });
    });

    test('Input "a"', () => {
      const input = [...'a'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'>>(output, {
        result: 'success',
        data: 'a',
        rest: [],
      });
    });

    test('Input "A"', () => {
      const input = [...'A'] as const;
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'>>(output, {
        result: 'fail',
      });
    });
  });

  describe('is(c => c === "0" || c === "1")', () => {
    const parser = is((c): c is '0' | '1' => c === '0' || c === '1');

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'0' | '1'>>(output, {
        result: 'fail',
      });
    });

    test('Input "0"', () => {
      const input = [...'0'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'0' | '1'>>(output, {
        result: 'success',
        data: '0',
        rest: [],
      });
    });

    test('Input "1"', () => {
      const input = [...'1'];
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'0' | '1'>>(output, {
        result: 'success',
        data: '1',
        rest: [],
      });
    });

    test('Input "A"', () => {
      const input = [...'A'] as const;
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'0' | '1'>>(output, {
        result: 'fail',
      });
    });
  });
});

describe('upperAlpha', () => {
  const parser = upperAlpha;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<UpperAlphabet>>(output, {
      result: 'fail',
    });
  });

  test('Input "a"', () => {
    const input = [...'a'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<UpperAlphabet>>(output, {
      result: 'fail',
    });
  });

  test('Input "A"', () => {
    const input = [...'A'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<UpperAlphabet>>(output, {
      result: 'success',
      data: 'A',
      rest: [],
    });
  });
});

describe('lowerAlpha', () => {
  const parser = lowerAlpha;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<LowerAlphabet>>(output, {
      result: 'fail',
    });
  });

  test('Input "a"', () => {
    const input = [...'a'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<LowerAlphabet>>(output, {
      result: 'success',
      data: 'a',
      rest: [],
    });
  });

  test('Input "A"', () => {
    const input = [...'A'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<LowerAlphabet>>(output, {
      result: 'fail',
    });
  });
});

describe('alpha', () => {
  const parser = alpha;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Alphabet>>(output, {
      result: 'fail',
    });
  });

  test('Input "a"', () => {
    const input = [...'a'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Alphabet>>(output, {
      result: 'success',
      data: 'a',
      rest: [],
    });
  });

  test('Input "A"', () => {
    const input = [...'A'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Alphabet>>(output, {
      result: 'success',
      data: 'A',
      rest: [],
    });
  });

  test('Input "1"', () => {
    const input = [...'1'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Alphabet>>(output, {
      result: 'fail',
    });
  });
});

describe('digit', () => {
  const parser = digit;

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

  test('Input "A"', () => {
    const input = [...'A'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Digit>>(output, {
      result: 'fail',
    });
  });

  test('Input "1"', () => {
    const input = [...'1'];
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Digit>>(output, {
      result: 'success',
      data: '1',
      rest: [],
    });
  });
});
