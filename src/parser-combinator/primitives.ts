import type { Parser } from './types';

const isNewLine = (c: string): boolean => c === '\n' || c === '\r';
const isCrLf = (b: string | null, c: string): boolean =>
  b === '\r' && c === '\n';

export const anyChar: Parser<string> = (input) => {
  const { inputs, line, col } = input;
  if (inputs.length > 0) {
    const [data, ...rest] = inputs;
    return {
      result: 'success',
      data,
      rest: {
        inputs: rest,
        col: isNewLine(data) ? 0 : col + 1,
        line: isNewLine(data) ? line + 1 : line,
      },
    };
  } else {
    return { result: 'fail', col, line };
  }
};

export const eof: Parser<null> = (input) => {
  const { inputs, line, col } = input;
  return inputs.length === 0
    ? {
        result: 'success',
        data: null,
        rest: {
          inputs: [],
          line,
          col,
        },
      }
    : { result: 'fail', line, col };
};
