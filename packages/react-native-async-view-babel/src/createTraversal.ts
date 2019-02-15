import * as t from '@babel/types';
import { NodePath } from "@babel/traverse";
import { allTransformers } from './transformers';
export function createTraversal() {
    const traverseOptions: {} = {
        Program: {
            enter(traversePath: NodePath<t.Program>) {
                let pending: t.Statement[] = [];
                let pendingImports = new Set<string>();
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

                            // Process props
                            for (let attr of node.openingElement.attributes) {
                                let jsxAttr = attr as t.JSXAttribute
                                let jsxName = jsxAttr.name.name;
                                // Check if backlisted
                                if (transformer!.blacklist.find((v2) => jsxName === v2)) {
                                    return
                                }

                                for (let pt of transformer!.propTransformers) {
                                    if (pt.name === jsxName) {
                                        let tr = pt.tranform(jsxAttr.value);
                                        if (tr === undefined) {
                                            return;
                                        }
                                        jsxAttr.value = tr;
                                        if (pt.imports) {
                                            for (let i of pt.imports) {
                                                let ik = i.from + ':' + i.what;
                                                if (!pendingImports.has(ik)) {
                                                    pendingImports.add(ik);
                                                    pending.push(t.importDeclaration([t.importSpecifier(t.identifier(i.what), t.identifier(i.what))], t.stringLiteral(i.from)));
                                                }
                                            }
                                        }
                                    }
                                }
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
                // t.importDeclaration([t.importSpecifier(t.identifier('calculateStyles'), t.identifier('calculateStyles'))], t.stringLiteral('openland-x-styles/calculateStyles'))
                for (let p of pending) {
                    traversePath.node.body.unshift(p);
                }
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