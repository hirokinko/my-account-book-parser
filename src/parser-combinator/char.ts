import { anyChar } from './primitives';
import { Parser, ParserInput } from './types';

type CharFunc = <T extends ParserInput['inputs'][0]>(c: T) => Parser<T>;
export const char: CharFunc = (c) => (input) => {
  const r = anyChar(input);
  if (r.result === 'fail') return r;
  if (r.data !== c) return { result: 'fail', line: input.line, col: input.col };
  return {
    result: 'success',
    data: c,
    rest: r.rest,
  };
};

type IsFunc = <T extends string>(
  f: (c: ParserInput['inputs'][0]) => c is T
) => Parser<T>;
export const is: IsFunc = (f) => (input) => {
  const r = anyChar(input);
  if (r.result === 'fail') return r;
  if (!f(r.data)) return { result: 'fail', line: input.line, col: input.col };
  return {
    result: 'success',
    data: r.data,
    rest: r.rest,
  };
};

export type UpperAlphabet =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';
export type LowerAlphabet = Lowercase<UpperAlphabet>;
export type Alphabet = UpperAlphabet | LowerAlphabet;

export const upperAlpha: Parser<UpperAlphabet> = is((c): c is UpperAlphabet =>
  /^[A-Z]$/.test(c)
);
export const lowerAlpha: Parser<LowerAlphabet> = is((c): c is LowerAlphabet =>
  /^[a-z]$/.test(c)
);
export const alpha: Parser<Alphabet> = is((c): c is Alphabet =>
  /^[A-Za-z]$/.test(c)
);

export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export const digit: Parser<Digit> = is((c): c is Digit => /^\d$/.test(c));

export type Hex =
  | Digit
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f';

export const hex: Parser<Hex> = is((c): c is Hex => /^[0-9A-Fa-f]$/.test(c));
