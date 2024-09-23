import { digit } from '../parser-combinator/char';
import { CHAR_DOT, CHAR_MINUS } from '../parser-combinator/characters';
import { cat, rep } from '../parser-combinator/combinators';
import { map, opt } from '../parser-combinator/util';

const numberPattern = cat([opt(CHAR_MINUS), rep(digit, 1), opt(cat([CHAR_DOT, rep(digit, 1)]))]);

export const intValue = map(rep(digit, 1), (part) => Number.parseInt(part.join(''), 10));

export const numberValue = map(numberPattern, ([signPart, intPart, fractionPart]): number => {
  const sign = signPart.status === 'some' ? '-' : '';
  const intValue = intPart.join('');
  if (fractionPart.status === 'none') {
    return Number.parseInt(`${sign}${intValue}`, 10);
  }

  // float
  const [, fractionStr] = fractionPart.value;
  return Number.parseFloat(`${sign}${intValue}.${fractionStr.join('')}`);
});
