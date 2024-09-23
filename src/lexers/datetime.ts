import { Digit, digit } from '../parser-combinator/char';
import { CHAR_MINUS } from '../parser-combinator/characters';
import { cat, rep } from '../parser-combinator/combinators';
import { Parser } from '../parser-combinator/types';
import { map } from '../parser-combinator/util';

export type DateFunc = Parser<
  [Digit, Digit, Digit, Digit, '-', Digit, Digit, '-', Digit, Digit]
>;
export const date = map(
  cat([
    rep(digit, 4, 4),
    CHAR_MINUS,
    rep(digit, 2, 2),
    CHAR_MINUS,
    rep(digit, 2, 2),
  ]),
  ([y, , m, , d]) => {
    const dateStr = `${y.join('')}-${m.join('')}-${d.join('')}`;
    const dateValue = new Date(dateStr);
    if (Number.isNaN(dateValue.getTime())) {
      throw new Error(`Invalid date: ${dateStr}`);
    }
    return dateValue;
  }
);

// TODO 時刻とタイムゾーンも追加する(が使わないかもしれない)
