import { parse, generate2 } from './parse';
import traverse from '@babel/traverse';
import { createTraversal } from './createTraversal';

export function processFile(content: string) {
    let res = parse(content);
    traverse(res, createTraversal());
    return generate2(res);
}