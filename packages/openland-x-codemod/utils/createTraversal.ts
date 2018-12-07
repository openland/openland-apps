import * as t from '@babel/types';
import { XStyleKeys } from '../../openland-x-styles/XStyles'; // Do not use absolute path
import UUID from 'uuid/v4';
import { VisitNodeObject, NodePath } from '@babel/traverse';
import { generate2 } from './parse';

export function createTraversal() {
    let isImported = false;
    let pageHasStyles = false;
    let body: t.Statement[] = [];
    const traverseOptions: { JSXElement: VisitNodeObject<t.JSXElement>, Program: VisitNodeObject<t.Program> } = {
        Program: {
            enter(traversePath: NodePath<t.Program>) {
                isImported = false;
                pageHasStyles = false;
                body = traversePath.node.body;
            },
            exit(traversePath: NodePath<t.Program>) {
                if (!isImported && pageHasStyles) {
                    body.unshift(t.importDeclaration([t.importSpecifier(t.identifier('calculateStyles'), t.identifier('calculateStyles'))], t.stringLiteral('openland-x-styles/calculateStyles')));
                    // console.log('start------');
                    // console.log(generate2(traversePath.node));
                    // console.log('end------');
                }
            }
        },
        JSXElement: {
            enter(traversePath: NodePath<t.JSXElement>) {
                let attrs = [...traversePath.node.openingElement.attributes];
                let i = 0;
                let removed = false;
                let styles: (t.ObjectProperty)[] = [];
                let hasStyles = false;
                if ((traversePath.node.openingElement.name as t.JSXIdentifier).name !== 'XView') {
                    return;
                }
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
                    let key = UUID();
                    while (key.indexOf('-') > 0) {
                        key = key.replace('-', '_');
                    }
                    let uuid = 'style_' + key;
                    body.unshift(
                        t.variableDeclaration('var', [
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
    return traverseOptions;
}