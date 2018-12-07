import { parse, generate2 } from './parse';
import traverse, { VisitNodeObject, NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { XStyleKeys } from 'openland-x-styles/XStyles';
import { calculateStyles } from 'openland-x-styles/calculateStyles';

let code = `
import * as React from 'react';
import { XView } from 'openland-x/XView';

export class TextView extends React.Component {
    render() {
        return <XView margin={10} flexDirection="column" />;
    }
}
`;

describe('parser', () => {
    it('should parse', () => {
        let res = parse(code);
        let body = res.program.body;
        // console.log(body);

        const traverseOptions: { JSXElement: VisitNodeObject<t.JSXElement> } = {
            JSXElement: {
                enter(traversePath: NodePath<t.JSXElement>) {
                    let attrs = [...traversePath.node.openingElement.attributes];
                    let i = 0;
                    let removed = false;
                    let styles = {};
                    let hasStyles = false;
                    for (let a of attrs) {
                        removed = false;
                        if (a.type === 'JSXAttribute' && a.name.type === 'JSXIdentifier' && a.value) {
                            if (XStyleKeys.findIndex((v) => v === (a as any).name.name) >= 0) {
                                if (a.value.type === 'StringLiteral') {
                                    styles[a.name.name] = a.value.value;
                                    traversePath.node.openingElement.attributes.splice(i, 1);
                                    removed = true;
                                    hasStyles = true;
                                } else if (a.value.type === 'JSXExpressionContainer') {
                                    if (a.value.expression.type === 'StringLiteral' || a.value.expression.type === 'NumericLiteral' || a.value.expression.type === 'BooleanLiteral') {
                                        styles[a.name.name] = a.value.expression.value;
                                        traversePath.node.openingElement.attributes.splice(i, 1);
                                        removed = true;
                                        hasStyles = true;
                                    }
                                }
                            }
                            // if (XStylesKey)
                            // if (a.name.type === 'JSXIdentifier') {
                            //     console.log(a.name.name);
                            // }
                        }

                        if (!removed) {
                            i++;
                        }
                    }

                    if (hasStyles) {
                        traversePath.node.openingElement.attributes.push(t.jsxAttribute(
                            t.jsxIdentifier('className'),
                            t.stringLiteral(calculateStyles(styles, false))
                        ))
                    }
                }
            }
        };
        traverse(res, traverseOptions);

        let r = generate2(res);
        console.log(r);
    });
});