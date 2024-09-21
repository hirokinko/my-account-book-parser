import { char, digit } from './parser-combinator/char';
import {
  CHAR_COLON,
  CHAR_MINUS,
  CHAR_ZERO,
} from './parser-combinator/characters';
import { cat, or, rep } from './parser-combinator/combinators';
import { diff, map, opt, str } from './parser-combinator/util';

const generateZeroPaddedRange = (
  n: number,
  number_of_digits: number,
  origin: 0 | 1
) =>
  Array.from(Array(n).keys()).map((v) =>
    str(`${v + origin}`.padStart(number_of_digits, '0'))
  );

const nonZeroDigit = diff(digit, CHAR_ZERO);

// /[1-9]\\d{3}
const year = map(cat([nonZeroDigit, rep(digit, 3, 3)]), ([first, rest]) =>
  [first, ...rest].join('')
);
// 01 to 12
const month = or(generateZeroPaddedRange(12, 2, 1));

// 01 to 31
const day = or(generateZeroPaddedRange(31, 2, 1));

// yyyy-MM-dd
export const date = cat([year, CHAR_MINUS, month, CHAR_MINUS, day]);

// 00 to 23
const hour = or(generateZeroPaddedRange(24, 2, 0));

// 00 to 59
const minutesAndSeconds = or(generateZeroPaddedRange(60, 2, 0));

// HH:mm:ss
export const time = cat([
  char('T'),
  hour,
  CHAR_COLON,
  minutesAndSeconds,
  CHAR_COLON,
  minutesAndSeconds,
]);

const sign = or([char('+'), char('-')]);

// [+|-]HH:mm
const timezone = cat([sign, hour, CHAR_COLON, minutesAndSeconds]);

export const dateTime = map(
  cat([date, opt(time), opt(timezone)]),
  ([d, t, tz]) => {
    if (t.status === 'none' && tz.status === 'some') {
      // Resultで返してreasonになぜ失敗したか載せたほうが良さそう
      return undefined;
    }
    const _date = d.join('');
    const _time = t.status === 'some' ? `${t.value.join('')}` : '';
    const _timezone = tz.status === 'some' ? tz.value.join('') : '';
    return new Date([..._date, ..._time, ..._timezone].join(''));
  }
);
