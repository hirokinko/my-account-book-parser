import type { Parser } from './types';
import { digit, Digit } from './char';
import { diff, map, opt } from './util';
import { cat, or, rep } from './combinators';
import { CHAR_MINUS, CHAR_PLUS, CHAR_ZERO } from './characters';

const nonZeroDigit: Parser<Digit> = diff(digit, CHAR_ZERO);
const zeroNumber: Parser<0> = map(CHAR_ZERO, () => 0);
const nonZeroNumber: Parser<number> = map(
  cat([nonZeroDigit, rep(digit)]),
  ([first, rest]) => Number.parseInt([first, ...rest].join(''), 10)
);
export const numbers: Parser<number> = or([zeroNumber, nonZeroNumber]);

const sign: Parser<1 | -1> = map(opt(or([CHAR_PLUS, CHAR_MINUS])), (s) =>
  s.status === 'some' ? (s.value === '+' ? 1 : -1) : 1
);

export const int: Parser<number> = map(cat([sign, numbers]), ([s, n]) => s * n);
