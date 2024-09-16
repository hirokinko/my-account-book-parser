export type ParserInput = readonly string[];

interface ParserSuccess<T> {
  result: 'success';
  data: T;
  rest: ParserInput;
}

interface ParserFail {
  result: 'fail';
}

export type ParserOutput<T> = Readonly<ParserSuccess<T> | ParserFail>;

export type Parser<T> = (input: ParserInput) => ParserOutput<T>;

export type ParserData<P> = P extends Parser<infer T> ? T : never;
