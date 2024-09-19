import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  diff,
  list,
  map,
  opt,
  Option,
  str,
} from '../../src/parser-combinator/util';
import { char, Digit, digit } from '../../src/parser-combinator/char';
import { ParserOutput } from '../../src/parser-combinator/types';

describe('map(digit, s => Number.parseInt(s, 10))', () => {
  const parser = map(digit, (s) => Number.parseInt(s, 10));

  test('Empty input', () => {
    const input = {
      inputs: [],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<number>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });

  test('Input "5"', () => {
    const input = {
      inputs: [...'5'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<number>>(output, {
      result: 'success',
      data: 5,
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });
});

describe('str("true")', () => {
  const parser = str('true');

  test('Empty input', () => {
    const input = {
      inputs: [],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<'true'>>(output, {
      result: 'fail',
      line: 0,
      col: 0,
    });
  });

  test('Input "true"', () => {
    const input = {
      inputs: [...'true'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<'true'>>(output, {
      result: 'success',
      data: 'true',
      rest: {
        inputs: [],
        line: 0,
        col: 4,
      },
    });
  });
});

describe('opt()', () => {
  describe('opt(char("a"))', () => {
    const parser = opt(char('a'));

    test('Empty input', () => {
      const input = {
        inputs: [],
        line: 0,
        col: 0,
      };
      const output = parser(input);
      assert.deepStrictEqual<ParserOutput<Option<'a'>>>(output, {
        result: 'success',
        data: { status: 'none' },
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
      assert.deepStrictEqual<ParserOutput<Option<'a'>>>(output, {
        result: 'success',
        data: { status: 'some', value: 'a' },
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
      assert.deepStrictEqual<ParserOutput<Option<'a'>>>(output, {
        result: 'success',
        data: { status: 'some', value: 'a' },
        rest: {
          inputs: [...'a'],
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
      assert.deepStrictEqual<ParserOutput<Option<'a'>>>(output, {
        result: 'success',
        data: { status: 'none' },
        rest: {
          inputs: [...'b'],
          line: 0,
          col: 0,
        },
      });
    });
  });
});

describe('diff(digit, char("0"))', () => {
  const parser = diff(digit, char('0'));

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

  test('Input "0"', () => {
    const input = {
      inputs: [...'0'],
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

  test('Input "5"', () => {
    const input = {
      inputs: [...'5'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Digit>>(output, {
      result: 'success',
      data: '5',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });
});

describe('list(digit, char(","))', () => {
  const parser = list(digit, char(','));

  test('Empty input', () => {
    const input = {
      inputs: [],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Digit[]>>(output, {
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
    assert.deepStrictEqual<ParserOutput<Digit[]>>(output, {
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
    assert.deepStrictEqual<ParserOutput<Digit[]>>(output, {
      result: 'success',
      data: ['1'],
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input "1,2,3,4,5"', () => {
    const input = {
      inputs: [...'1,2,3,4,5'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<Digit[]>>(output, {
      result: 'success',
      data: ['1', '2', '3', '4', '5'],
      rest: {
        inputs: [],
        line: 0,
        col: 9,
      },
    });
  });
});
