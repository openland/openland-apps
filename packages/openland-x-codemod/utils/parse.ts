import * as babelParser from '@babel/parser';
import babelGenerator from '@babel/generator';
import { File, Node } from '@babel/types';

export function parse(src: string) {
    return babelParser.parse(src, {
        plugins: [
            'asyncGenerators',
            'classProperties',
            'dynamicImport',
            'functionBind',
            'jsx',
            'objectRestSpread',
            'typescript'
        ],
        sourceType: 'module'
    });
}

export function generate2(ast: Node) {
    return babelGenerator(ast, {
        quotes: 'single'
    }).code;
}