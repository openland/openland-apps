"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const t = require("@babel/types");
const transformers_1 = require("./transformers");
function createTraversal() {
    const traverseOptions = {
        Program: {
            enter(traversePath) {
                traversePath.traverse({
                    JSXElement: {
                        enter(traversePath2) {
                            // Resolve Transformer
                            let node = traversePath2.node;
                            let name = node.openingElement.name.name;
                            let transformer = transformers_1.allTransformers.find((v) => v.name === name);
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
                                .find((v) => !!transformer.blacklist.find((v2) => v.name.name === v2));
                            if (hasBlacklisted) {
                                return;
                            }
                            // Configure basics
                            node.openingElement.name.name = 'asyncview';
                            node.openingElement.attributes.push(t.jsxAttribute(t.jsxIdentifier('asyncViewName'), t.jsxExpressionContainer(t.stringLiteral(transformer.asyncName))));
                            if (node.closingElement) {
                                node.closingElement.name.name = 'asyncview';
                            }
                        }
                    }
                });
                // throw traversePath.buildCodeFrameError('???');
                // isImported = false;
                // pageHasStyles = false;
                // body = traversePath.node.body;
                // pending = [];
            },
            exit(traversePath) {
                // if (!isImported && pageHasStyles) {
                //     for (let p of pending) {
                //         body.unshift(p);
                //     }
                //     body.unshift(t.importDeclaration([t.importSpecifier(t.identifier('calculateStyles'), t.identifier('calculateStyles'))], t.stringLiteral('openland-x-styles/calculateStyles')));
                // }
            }
        }
    };
    return traverseOptions;
}
exports.createTraversal = createTraversal;
//# sourceMappingURL=createTraversal.js.map