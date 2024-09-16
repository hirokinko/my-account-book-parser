import { map, str } from './util';
import type { Parser } from './types';
import { or } from './combinators';

const parseTrue: Parser<true> = map(str('true'), () => true);
const parseFalse: Parser<false> = map(str('false'), () => false);
export const bool: Parser<boolean> = or([parseTrue, parseFalse]);
