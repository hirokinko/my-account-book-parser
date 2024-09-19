import { not, or, cat, rep } from '../../src/parser-combinator/combinators';
import { char } from '../../src/parser-combinator/char';
import type { ParserOutput } from '../../src/parser-combinator/types';
import test, { describe } from 'node:test';
import assert from 'node:assert/strict';

describe('not(char("a"))', () => {
  const parser = not(char('a'));

  test('Empty input', () => {
    const input = {
      inputs: [],
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

  test('Input "a"', () => {
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

  test('Input "A"', () => {
    const input = {
      inputs: [...'A'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<null>>(output, {
      result: 'success',
      data: null,
      rest: {
        inputs: [...'A'],
        line: 0,
        col: 0,
      },
    });
  });

  test('Input "hoge"', () => {
    const input = {
      inputs: [...'hoge'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<null>>(output, {
      result: 'success',
      data: null,
      rest: {
        inputs: [...'hoge'],
        line: 0,
        col: 0,
      },
    });
  });
});

describe('or()', () => {
  describe('or([])', () => {
    const parser = or([]);

    test('Empty input', () => {
      const input = {
        inputs: [],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<unknown>>(output, {
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
      assert.deepStrictEqual<ParserOutput<unknown>>(output, {
        result: 'fail',
        line: 0,
        col: 0,
      });
    });
  });

  describe('or([char("a"), char("b")])', () => {
    const parser = or([char('a'), char('b')]);

    test('Empty input', () => {
      const input = {
        inputs: [],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a' | 'b'>>(output, {
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
      assert.deepStrictEqual<ParserOutput<'a' | 'b'>>(output, {
        result: 'success',
        data: 'a',
        rest: {
          inputs: [],
          line: 0,
          col: 1,
        },
      });
    });

    test('Input "b"', () => {
      const input = {
        inputs: [...'b'],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a' | 'b'>>(output, {
        result: 'success',
        data: 'b',
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
      assert.deepStrictEqual<ParserOutput<'a' | 'b'>>(output, {
        result: 'fail',
        line: 0,
        col: 0,
      });
    });
  });
});

describe('cat()', () => {
  describe('cat([])', () => {
    const parser = cat([]);

    test('Empty input', () => {
      const input = {
        inputs: [],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<[]>>(output, {
        result: 'success',
        data: [],
        rest: {
          inputs: [],
          line: 0,
          col: 0,
        },
      });
    });

    test('Input "a"', () => {
      const input = {
        inputs: [...'a'],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<[]>>(output, {
        result: 'success',
        data: [],
        rest: {
          inputs: [...'a'],
          line: 0,
          col: 0,
        },
      });
    });
  });

  describe('cat([char("a"), char("b")])', () => {
    const parser = cat([char('a'), char('b')]);

    test('Empty input', () => {
      const input = {
        inputs: [],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<['a', 'b']>>(output, {
        result: 'fail',
        line: 0,
        col: 0,
      });
    });

    test('input "a"', () => {
      const input = {
        inputs: [...'a'],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<['a', 'b']>>(output, {
        result: 'fail',
        line: 0,
        col: 1,
      });
    });

    test('input "abc"', () => {
      const input = {
        inputs: [...'abc'],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<['a', 'b']>>(output, {
        result: 'success',
        data: ['a', 'b'],
        rest: {
          inputs: [...'c'],
          line: 0,
          col: 2,
        },
      });
    });

    test('input "A"', () => {
      const input = {
        inputs: [...'A'],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<['a', 'b']>>(output, {
        result: 'fail',
        line: 0,
        col: 0,
      });
    });
  });
});

describe('rep()', () => {
  describe('rep(char("a"))', () => {
    const parser = rep(char('a'));

    test('Empty input', () => {
      const input = {
        inputs: [],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: [],
        rest: {
          inputs: [],
          line: 0,
          col: 0,
        },
      });
    });

    test('Input "a"', () => {
      const input = {
        inputs: [...'a'],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: ['a'],
        rest: {
          inputs: [],
          line: 0,
          col: 1,
        },
      });
    });

    test('Input "aa"', () => {
      const input = {
        inputs: [...'aa'],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: ['a', 'a'],
        rest: {
          inputs: [],
          line: 0,
          col: 2,
        },
      });
    });

    test('Input "aab"', () => {
      const input = {
        inputs: [...'aab'],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: ['a', 'a'],
        rest: {
          inputs: [...'b'],
          line: 0,
          col: 2,
        },
      });
    });
  });

  describe('rep(char("a"), 1)', () => {
    const parser = rep(char('a'), 1);

    test('Empty input', () => {
      const input = {
        inputs: [],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
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
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: ['a'],
        rest: {
          inputs: [],
          line: 0,
          col: 1,
        },
      });
    });

    test('Input "aa"', () => {
      const input = {
        inputs: [...'aa'],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: ['a', 'a'],
        rest: {
          inputs: [],
          line: 0,
          col: 2,
        },
      });
    });

    test('Input "aab"', () => {
      const input = {
        inputs: [...'aab'],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: ['a', 'a'],
        rest: {
          inputs: [...'b'],
          line: 0,
          col: 2,
        },
      });
    });
  });

  describe('rep(char("a"), 1, 2)', () => {
    const parser = rep(char('a'), 1, 2);

    test('Empty input', () => {
      const input = {
        inputs: [],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
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
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: ['a'],
        rest: {
          inputs: [],
          line: 0,
          col: 1,
        },
      });
    });

    test('Input "aa"', () => {
      const input = {
        inputs: [...'aa'],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: ['a', 'a'],
        rest: {
          inputs: [],
          line: 0,
          col: 2,
        },
      });
    });

    test('Input "aaa"', () => {
      const input = {
        inputs: [...'aaa'],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<'a'[]>>(output, {
        result: 'success',
        data: ['a', 'a'],
        rest: {
          inputs: [...'a'],
          line: 0,
          col: 2,
        },
      });
    });
  });
});
