import { parse, generate2 } from './parse';
import traverse, { VisitNodeObject, NodePath } from '@babel/traverse';
import t = require('@babel/types');

let code = `
import * as React from 'react';
import { XView } from 'openland-x/XView';

export class TextView extends React.Component {
    render() {
        return <XView margin={10} flexDirection="column" />;
    }
}
`;

interface TraversePath<TNode = any> {
    node: TNode;
    scope: {}; // TODO
    _complexComponentProp?: any; // t.VariableDeclarator;
    parentPath: TraversePath<any>;
    insertBefore: (arg: t.Node) => void;
}

describe('parser', () => {
    it('should parse', () => {
        let res = parse(code);
        let body = res.program.body;
        // console.log(body);

        const traverseOptions: { JSXElement: VisitNodeObject<t.JSXElement> } = {
            JSXElement: {
                enter(traversePath: NodePath<t.JSXElement>) {
                    // traversePath.remove();
                    let attrs = [...traversePath.node.openingElement.attributes];
                    let i = 0;
                    for (let a of attrs) {
                        if (a.type === 'JSXAttribute') {
                            if (a.name.type === 'JSXIdentifier') {
                                console.log(a.name.name);
                            }
                            console.log(a);
                            traversePath.node.openingElement.attributes.splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                    //
                    // console.log('enter');
                },
                exit(traversePath: NodePath<t.JSXElement>) {
                    //
                    // console.log('exit');
                }
            }
        };
        traverse(res, traverseOptions);

        let r = generate2(res);
        console.log(r);
    });
});