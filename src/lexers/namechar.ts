import { alpha, char, digit } from '../parser-combinator/char';
import { cat, or, rep } from '../parser-combinator/combinators';
import type { Parser } from '../parser-combinator/types';
import { map } from '../parser-combinator/util';

export const unicodeRange = (start: number, end: number): Parser<string>[] =>
  Array.from(Array(end - start + 1).keys()).map((c) => char(String.fromCharCode(c + start)));

const nameStartChar = or([
  char('$'), // 主要な通貨記号
  char('¢'),
  char('€'),
  char('£'),
  char('¤'),
  char('¥'),
  char('₩'),
  char(String.fromCharCode(0x00b5)), // マイクロ記号
  char(String.fromCharCode(0x00b9)), // ラテン補助の上付きの1
  char(String.fromCharCode(0x00b2)), // ラテン補助の上付きの2
  char(String.fromCharCode(0x00b3)), // ラテン補助の上付きの3
  char(String.fromCharCode(0x00b0)), // 度の単位記号
  char(String.fromCharCode(0x00bc)), // 1/4(ラテン補助)
  char(String.fromCharCode(0x00bd)), // 1/2(ラテン補助)
  char(String.fromCharCode(0x00be)), // 3/4(ラテン補助)
  alpha,
  ...unicodeRange(0x00c0, 0x00d6),
  ...unicodeRange(0x00d8, 0x00f6),
  ...unicodeRange(0x00f8, 0x02ff),
  ...unicodeRange(0x0370, 0x037d),
  ...unicodeRange(0x037f, 0x1fff),
  ...unicodeRange(0x200c, 0x200d),
  ...unicodeRange(0x2070, 0x218f),
  ...unicodeRange(0x2c00, 0x2fef),
  ...unicodeRange(0x3001, 0xd7ff),
  ...unicodeRange(0xf900, 0xfdcf),
  ...unicodeRange(0xfdf0, 0xffdf),
]);

export const nameChar = or([
  nameStartChar,
  digit,
  char('_'),
  char('-'),
  char(String.fromCharCode(0x00b7)), // 中黒
  ...unicodeRange(0x0300, 0x036f),
  ...unicodeRange(0x203f, 0x2040),
]);

export const id = map(cat([nameStartChar, rep(nameChar)]), ([startPart, restPart]) => startPart + restPart.join(''));

export const subId = map(
  cat([or([nameStartChar, digit]), rep(nameChar)]),
  ([startPart, restPart]) => startPart + restPart.join(''),
);
