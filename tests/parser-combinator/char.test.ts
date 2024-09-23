import test, { describe } from 'node:test';
import { char, is, alpha, upperAlpha, lowerAlpha, digit, hex } from '../../src/parser-combinator/char';
import type { Alphabet, UpperAlphabet, LowerAlphabet, Digit, Hex } from '../../src/parser-combinator/char';
import type { ParserOutput } from '../../src/parser-combinator/types';
import assert from 'node:assert/strict';

describe('char("a")', () => {
  const parser = char('a');

  test('Empty input', () => {
    const input = {
      inputs: [] as const,
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<'a'>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });

  test('Input "a"', () => {
    const input = {
      inputs: [...'a'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<'a'>>(output, {
      result: 'success',
      data: 'a',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input "A"', () => {
    const input = {
      inputs: [...'A'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<'a'>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });

  test('Input "hoge"', () => {
    const input = {
      inputs: [...'hoge'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<'a'>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });
});

describe('is()', () => {
  describe('is(c => c === "a"', () => {
    const parser = is((c): c is 'a' => c === 'a');

    test('Empty input', () => {
      const input = {
        inputs: [] as const,
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'>>(output, {
        result: 'fail',
        line: 0,
        col: 0,
      });
    });

    test('Input "a"', () => {
      const input = {
        inputs: [...'a'],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'>>(output, {
        result: 'success',
        data: 'a',
        rest: {
          inputs: [],
          line: 0,
          col: 1,
        },
      });
    });

    test('Input "A"', () => {
      const input = {
        inputs: [...'A'] as const,
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'>>(output, {
        result: 'fail',
        line: 0,
        col: 0,
      });
    });
  });

  describe('is(c => c === "0" || c === "1")', () => {
    const parser = is((c): c is '0' | '1' => c === '0' || c === '1');

    test('Empty input', () => {
      const input = {
        inputs: [] as const,
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'>>(output, {
        result: 'fail',
        line: 0,
        col: 0,
      });
    });

    test('Input "0"', () => {
      const input = {
        inputs: [...'0'],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'0' | '1'>>(output, {
        result: 'success',
        data: '0',
        rest: {
          inputs: [],
          line: 0,
          col: 1,
        },
      });
    });

    test('Input "1"', () => {
      const input = {
        inputs: [...'1'],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'0' | '1'>>(output, {
        result: 'success',
        data: '1',
        rest: {
          inputs: [],
          line: 0,
          col: 1,
        },
      });
    });

    test('Input "A"', () => {
      const input = {
        inputs: [...'A'],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'0' | '1'>>(output, {
        result: 'fail',
        line: 0,
        col: 0,
      });
    });
  });
});

describe('upperAlpha', () => {
  const parser = upperAlpha;

  test('Empty input', () => {
    const input = {
      inputs: [],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<UpperAlphabet>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });

  test('Input "a"', () => {
    const input = {
      inputs: [...'a'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<UpperAlphabet>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });

  test('Input "A"', () => {
    const input = {
      inputs: [...'A'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<UpperAlphabet>>(output, {
      result: 'success',
      data: 'A',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });
});

describe('lowerAlpha', () => {
  const parser = lowerAlpha;

  test('Empty input', () => {
    const input = {
      inputs: [],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<LowerAlphabet>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });

  test('Input "a"', () => {
    const input = {
      inputs: [...'a'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<LowerAlphabet>>(output, {
      result: 'success',
      data: 'a',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input "A"', () => {
    const input = {
      inputs: [...'A'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<LowerAlphabet>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });
});

describe('alpha', () => {
  const parser = alpha;

  test('Empty input', () => {
    const input = {
      inputs: [],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Alphabet>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });

  test('Input "a"', () => {
    const input = {
      inputs: [...'a'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Alphabet>>(output, {
      result: 'success',
      data: 'a',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input "A"', () => {
    const input = {
      inputs: [...'A'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Alphabet>>(output, {
      result: 'success',
      data: 'A',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input "1"', () => {
    const input = {
      inputs: [...'1'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Alphabet>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });
});

describe('digit', () => {
  const parser = digit;

  test('Empty input', () => {
    const input = {
      inputs: [],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Digit>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });

  test('Input "a"', () => {
    const input = {
      inputs: [...'a'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Digit>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });

  test('Input "A"', () => {
    const input = {
      inputs: [...'A'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Digit>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });

  test('Input "1"', () => {
    const input = {
      inputs: [...'1'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Digit>>(output, {
      result: 'success',
      data: '1',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });
});

describe('hex', () => {
  const parser = hex;

  test('Empty input', () => {
    const input = {
      inputs: [],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Hex>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });

  test('Input "a"', () => {
    const input = {
      inputs: [...'a'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Hex>>(output, {
      result: 'success',
      data: 'a',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input "A"', () => {
    const input = {
      inputs: [...'A'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Hex>>(output, {
      result: 'success',
      data: 'A',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input "1"', () => {
    const input = {
      inputs: [...'1'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Hex>>(output, {
      result: 'success',
      data: '1',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input "g"', () => {
    const input = {
      inputs: [...'g'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Hex>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });

  test('Input "G"', () => {
    const input = {
      inputs: [...'G'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Hex>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });
});
