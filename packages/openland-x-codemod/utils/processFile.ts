import { parse, generate2 } from './parse';
import traverse, { VisitNodeObject, NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { XStyleKeys } from '../../openland-x-styles/XStyles'; // Do not use absolute path
import UUID from 'uuid/v4';

export function processFile(content: string) {
    let res = parse(content);
    let body = res.program.body;
    let isImported = false;
    let pageHasStyles = false;

    const traverseOptions: { JSXElement: VisitNodeObject<t.JSXElement> } = {
        JSXElement: {
            enter(traversePath: NodePath<t.JSXElement>) {
                let attrs = [...traversePath.node.openingElement.attributes];
                let i = 0;
                let removed = false;
                let styles: (t.ObjectProperty)[] = [];
                let hasStyles = false;
                for (let a of attrs) {
                    removed = false;
                    if (a.type === 'JSXAttribute' && a.name.type === 'JSXIdentifier' && a.value) {
                        if (XStyleKeys.findIndex((v) => v === (a as any).name.name) >= 0) {
                            if (a.value.type === 'StringLiteral') {
                                styles.push(t.objectProperty(t.identifier(a.name.name),
                                    t.stringLiteral(a.value.value)
                                ));
                                // styles[a.name.name] = a.value;
                                traversePath.node.openingElement.attributes.splice(i, 1);
                                removed = true;
                                hasStyles = true;
                                pageHasStyles = true;
                            } else if (a.value.type === 'JSXExpressionContainer') {
                                if (a.value.expression.type === 'StringLiteral' || a.value.expression.type === 'NumericLiteral' || a.value.expression.type === 'BooleanLiteral') {
                                    // styles[a.name.name] = a.value.expression;
                                    styles.push(t.objectProperty(t.identifier(a.name.name),
                                        a.value.expression
                                    ));
                                    traversePath.node.openingElement.attributes.splice(i, 1);
                                    removed = true;
                                    hasStyles = true;
                                    pageHasStyles = true;
                                }
                            }
                        }
                    }

                    if (!removed) {
                        i++;
                    }
                }

                if (hasStyles) {
                    let uuid = UUID();
                    body.unshift(
                        t.variableDeclaration('const', [
                            t.variableDeclarator(
                                t.identifier('___' + uuid),
                                t.callExpression(t.identifier('calculateStyles'), [
                                    t.objectExpression(styles)
                                ])
                            )])
                    );

                    traversePath.node.openingElement.attributes.push(t.jsxAttribute(
                        t.jsxIdentifier('className'),
                        t.jsxExpressionContainer(t.identifier('___' + uuid))
                    ))
                }
            }
        }
    };
    traverse(res, traverseOptions);

    if (!isImported && pageHasStyles) {
        body.unshift(t.importDeclaration([t.importSpecifier(t.identifier('calculateStyles'), t.identifier('calculateStyles'))], t.stringLiteral('openland-x-styles/calculateStyles')));
    }

    return generate2(res);
}