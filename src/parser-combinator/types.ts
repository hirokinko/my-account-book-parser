export type ParserInput = {
    inputs: readonly string[];
    col: number;
    line: number;
};

interface ParserSuccess<T> {
    result: 'success';
    data: T;
    rest: ParserInput;
}

interface ParserFail {
    result: 'fail';
    col: number;
    line: number;
}

export type ParserOutput<T> = Readonly<ParserSuccess<T> | ParserFail>;

export type Parser<T> = (input: ParserInput) => ParserOutput<T>;

export type ParserData<P> = P extends Parser<infer T> ? T : never;
