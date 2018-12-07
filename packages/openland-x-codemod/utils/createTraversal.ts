import * as t from '@babel/types';
import { XStyleKeys } from '../../openland-x-styles/XStyles'; // Do not use absolute path
import UUID from 'uuid/v4';
import { VisitNodeObject, NodePath } from '@babel/traverse';

export function createTraversal() {
    let isImported = false;
    let pageHasStyles = false;
    let body: t.Statement[] = [];
    let pending: t.Statement[] = [];
    const traverseOptions: { JSXElement: VisitNodeObject<t.JSXElement>, Program: VisitNodeObject<t.Program> } = {
        Program: {
            enter(traversePath: NodePath<t.Program>) {
                isImported = false;
                pageHasStyles = false;
                body = traversePath.node.body;
                pending = [];
            },
            exit(traversePath: NodePath<t.Program>) {
                if (!isImported && pageHasStyles) {
                    for (let p of pending) {
                        body.unshift(p);
                    }
                    body.unshift(t.importDeclaration([t.importSpecifier(t.identifier('calculateStyles'), t.identifier('calculateStyles'))], t.stringLiteral('openland-x-styles/calculateStyles')));
                }
            }
        },
        JSXElement: {
            enter(traversePath: NodePath<t.JSXElement>) {
                let attrs = [...traversePath.node.openingElement.attributes];
                let i = 0;
                let removed = false;
                let styles: (t.ObjectProperty)[] = [];
                let selectedStyles: (t.ObjectProperty)[] = [];
                let hasStyles = false;
                if ((traversePath.node.openingElement.name as t.JSXIdentifier).name !== 'XView') {
                    return;
                }
                for (let a of attrs) {
                    removed = false;
                    if (a.type === 'JSXAttribute' && a.name.type === 'JSXIdentifier' && a.value) {
                        if (XStyleKeys.findIndex((v) => v === (a as any).name.name) >= 0) {
                            if (a.value.type === 'StringLiteral') {
                                if (a.name.name.startsWith('selected')) {
                                    let c = a.name.name.substring(8, 9).toLowerCase() + a.name.name.substring(9);
                                    console.log(c);
                                    selectedStyles.push(t.objectProperty(t.identifier(c),
                                        t.stringLiteral(a.value.value)
                                    ));
                                } else {
                                    styles.push(t.objectProperty(t.identifier(a.name.name),
                                        t.stringLiteral(a.value.value)
                                    ));
                                }
                                // styles[a.name.name] = a.value;
                                traversePath.node.openingElement.attributes.splice(i, 1);
                                removed = true;
                                hasStyles = true;
                                pageHasStyles = true;
                            } else if (a.value.type === 'JSXExpressionContainer') {
                                if (a.value.expression.type === 'StringLiteral' || a.value.expression.type === 'NumericLiteral' || a.value.expression.type === 'BooleanLiteral') {
                                    // styles[a.name.name] = a.value.expression;
                                    if (a.name.name.startsWith('selected')) {
                                        let c = a.name.name.substring(8, 9).toLowerCase() + a.name.name.substring(9);
                                        console.log(c);
                                        selectedStyles.push(t.objectProperty(t.identifier(c),
                                            a.value.expression
                                        ));
                                    } else {
                                        styles.push(t.objectProperty(t.identifier(a.name.name),
                                            a.value.expression
                                        ));
                                    }
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
                    if (styles.length > 0) {
                        pending.push(
                            t.variableDeclaration('var', [
                                t.variableDeclarator(
                                    t.identifier('___' + uuid + '_n'),
                                    t.callExpression(t.identifier('calculateStyles'), [
                                        t.objectExpression(styles)
                                    ])
                                )])
                        );

                        traversePath.node.openingElement.attributes.push(t.jsxAttribute(
                            t.jsxIdentifier('__styleClassName'),
                            t.jsxExpressionContainer(t.identifier('___' + uuid + '_n'))
                        ))
                    }
                    if (selectedStyles.length > 0) {
                        pending.push(
                            t.variableDeclaration('var', [
                                t.variableDeclarator(
                                    t.identifier('___' + uuid + '_s'),
                                    t.callExpression(t.identifier('calculateStyles'), [
                                        t.objectExpression([...styles, ...selectedStyles])
                                    ])
                                )])
                        );

                        traversePath.node.openingElement.attributes.push(t.jsxAttribute(
                            t.jsxIdentifier('__styleSelectedClassName'),
                            t.jsxExpressionContainer(t.identifier('___' + uuid + '_s'))
                        ))
                        traversePath.node.openingElement.attributes.push(t.jsxAttribute(
                            t.jsxIdentifier('__styleSelectable'),
                            t.jsxExpressionContainer(t.booleanLiteral(true))
                        ));
                    }
                }
            }
        }
    };
    return traverseOptions;
}