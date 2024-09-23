import { char, hex } from '../parser-combinator/char';
import { CHAR_MINUS, CHAR_ZERO } from '../parser-combinator/characters';
import { cat, or, rep } from '../parser-combinator/combinators';
import { diff, map } from '../parser-combinator/util';

const group1 = rep(hex, 8, 8);
const group2 = rep(hex, 4, 4);
const group3 = cat([
  diff(
    hex,
    or([
      CHAR_ZERO,
      char('9'),
      char('A'),
      char('B'),
      char('C'),
      char('D'),
      char('E'),
      char('F'),
      char('a'),
      char('b'),
      char('c'),
      char('d'),
      char('e'),
      char('f'),
    ])
  ),
  rep(hex, 3, 3),
]);
const group4 = rep(hex, 4, 4);
const group5 = rep(hex, 12, 12);

export const uuid = map(
  cat([
    group1,
    CHAR_MINUS,
    group2,
    CHAR_MINUS,
    group3,
    CHAR_MINUS,
    group4,
    CHAR_MINUS,
    group5,
  ]),
  ([g1, , g2, , [v, g3], , g4, , g5]) =>
    `${g1.join('')}-${g2.join('')}-${v}${g3.join('')}-${g4.join('')}-${g5.join(
      ''
    )}`
);
