import * as t from '@babel/types';
import { VisitNodeObject, NodePath } from "@babel/traverse";
import { allTransformers } from './transformers';
export function createTraversal() {
    const traverseOptions: {} = {
        Program: {
            enter(traversePath: NodePath<t.Program>) {
                traversePath.traverse({
                    JSXElement: {
                        enter(traversePath2: NodePath<t.Node>) {

                            // Resolve Transformer
                            let node = traversePath2.node as t.JSXElement;
                            let name = (node.openingElement.name as t.JSXIdentifier).name;
                            let transformer = allTransformers.find((v) => v.name === name);
                            if (!transformer) {
                                return;
                            }

                            // Ignore anything with spread attributes
                            if (node.openingElement.attributes.find((v) => v.type === 'JSXSpreadAttribute')) {
                                return;
                            }

                            // Search for blacklisted names
                            let hasBlacklisted = !!node.openingElement.attributes
                                .filter((v) => v.type === 'JSXAttribute')
                                .find((v) => !!transformer!.blacklist.find((v2) => (v as t.JSXAttribute).name.name === v2))
                            if (hasBlacklisted) {
                                return;
                            }

                            // Configure basics
                            (node.openingElement.name as t.JSXIdentifier).name = 'asyncview';
                            node.openingElement.attributes.push(t.jsxAttribute(
                                t.jsxIdentifier('asyncViewName'),
                                t.jsxExpressionContainer(t.stringLiteral(transformer.asyncName))
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