import assert from 'node:assert/strict';
import test, { describe } from 'node:test';
import { id, nameChar, subId } from '../../src/lexers/namechar';
import type { ParserOutput } from '../../src/parser-combinator/types';

describe('nameChar', () => {
  const parser = nameChar;

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

  test('Input "Ö"(0x00d6)', () => {
    const input = {
      inputs: [...'Ö'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: 'Ö',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input "ö"(0x00f6)', () => {
    const input = {
      inputs: [...'ö'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: 'ö',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input "˿"(0x02ff)', () => {
    const input = {
      inputs: [...'˿'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: '˿',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input "ͽ"(0x037d)', () => {
    const input = {
      inputs: [...'ͽ'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: 'ͽ',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input "῿"(0x1fff)', () => {
    const input = {
      inputs: [...'῿'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: '῿',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input "‍"(0x200d)', () => {
    const input = {
      inputs: [...'‍'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: '‍',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input "↏"(0x218f)', () => {
    const input = {
      inputs: [...'↏'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: '↏',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input "⿯"(0x2fef)', () => {
    const input = {
      inputs: [...'⿯'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: '⿯',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input "퟿"(0xd7ff)', () => {
    const input = {
      inputs: [...'퟿'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: '퟿',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input "﷏"(0xfdcf)', () => {
    const input = {
      inputs: [...'﷏'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: '﷏',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input "￟"(0xffdf)', () => {
    const input = {
      inputs: [...'￟'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: '￟',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });
});

describe('id', () => {
  const parser = id;

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

  test('Input 1', () => {
    const input = {
      inputs: [...'1'],
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

  test('Input a', () => {
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

  test('Input a1', () => {
    const input = {
      inputs: [...'a1'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: 'a1',
      rest: {
        inputs: [],
        line: 0,
        col: 2,
      },
    });
  });

  test('Input aa', () => {
    const input = {
      inputs: [...'aa'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: 'aa',
      rest: {
        inputs: [],
        line: 0,
        col: 2,
      },
    });
  });

  test('Input あ', () => {
    const input = {
      inputs: [...'あ'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: 'あ',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input 日英混在もおk', () => {
    const input = {
      inputs: [...'日英混在もおk'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: '日英混在もおk',
      rest: {
        inputs: [],
        line: 0,
        col: 7,
      },
    });
  });

  test('Input 日英混在おkただし記号はNG?', () => {
    const input = {
      inputs: [...'日英混在おkただし記号はNG?'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: '日英混在おkただし記号はNG',
      rest: {
        inputs: ['?'],
        line: 0,
        col: 14,
      },
    });
  });

  test('Input maybe_も先頭でなければおｋ', () => {
    const input = {
      inputs: [...'maybe_も先頭でなければおｋ'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: 'maybe_も先頭でなければおｋ',
      rest: {
        inputs: [],
        line: 0,
        col: 16,
      },
    });
  });
});

describe('subId', () => {
  const parser = subId;

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

  test('Input 1', () => {
    const input = {
      inputs: [...'1'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: '1',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input a', () => {
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

  test('Input a1', () => {
    const input = {
      inputs: [...'a1'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: 'a1',
      rest: {
        inputs: [],
        line: 0,
        col: 2,
      },
    });
  });

  test('Input aa', () => {
    const input = {
      inputs: [...'aa'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: 'aa',
      rest: {
        inputs: [],
        line: 0,
        col: 2,
      },
    });
  });

  test('Input あ', () => {
    const input = {
      inputs: [...'あ'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: 'あ',
      rest: {
        inputs: [],
        line: 0,
        col: 1,
      },
    });
  });

  test('Input 日英混在もおk', () => {
    const input = {
      inputs: [...'日英混在もおk'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: '日英混在もおk',
      rest: {
        inputs: [],
        line: 0,
        col: 7,
      },
    });
  });

  test('Input 日英混在おkただし記号はNG?', () => {
    const input = {
      inputs: [...'日英混在おkただし記号はNG?'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: '日英混在おkただし記号はNG',
      rest: {
        inputs: ['?'],
        line: 0,
        col: 14,
      },
    });
  });

  test('Input maybe_も先頭でなければおｋ', () => {
    const input = {
      inputs: [...'maybe_も先頭でなければおｋ'],
      line: 0,
      col: 0,
    };
    const output = parser(input);
    assert.deepStrictEqual<ParserOutput<string>>(output, {
      result: 'success',
      data: 'maybe_も先頭でなければおｋ',
      rest: {
        inputs: [],
        line: 0,
        col: 16,
      },
    });
  });
});
