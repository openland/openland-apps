import * as t from '@babel/types';
import { VisitNodeObject, NodePath } from "@babel/traverse";

export function createTraversal() {
    const traverseOptions: {} = {
        Program: {
            enter(traversePath: NodePath<t.Program>) {
                traversePath.traverse({
                    JSXElement: {
                        enter(traversePath2: NodePath<t.Node>) {
                            // throw Error('!!!');
                            // throw traversePath2.buildCodeFrameError('!!!');
                            let node = traversePath2.node as t.JSXElement;
                            if ((node.openingElement.name as t.JSXIdentifier).name !== 'ASFlex') {
                                return;
                            }
                            // throw traversePath2.buildCodeFrameError(JSON.stringify(node.openingElement.name));

                            let hasBlacklisted = !!node.openingElement.attributes
                                .filter((v) => v.type === 'JSXAttribute')
                                .find((v) => !!['onPress', 'onLongPress', 'backgroundColor'].find((v2) => ((v as t.JSXAttribute).name as t.JSXIdentifier).name === v2))
                            if (hasBlacklisted) {
                                return;
                            }

                            (node.openingElement.name as t.JSXIdentifier).name = 'asyncview';
                            node.openingElement.attributes.push(t.jsxAttribute(
                                t.jsxIdentifier('asyncViewName'),
                                t.jsxExpressionContainer(t.stringLiteral('flex'))
                            ))

                            if (node.closingElement) {
                                (node.closingElement.name as t.JSXIdentifier).name = 'asyncview'
                            }
                        }
                    }
                })
                // throw traversePath.buildCodeFrameError('???');
                // isImported = false;
                // pageHasStyles = false;
                // body = traversePath.node.body;
                // pending = [];
            },
            exit(traversePath: NodePath<t.Program>) {
                // if (!isImported && pageHasStyles) {
                //     for (let p of pending) {
                //         body.unshift(p);
                //     }
                //     body.unshift(t.importDeclaration([t.importSpecifier(t.identifier('calculateStyles'), t.identifier('calculateStyles'))], t.stringLiteral('openland-x-styles/calculateStyles')));
                // }
            }
        }
    }
    return traverseOptions;
}