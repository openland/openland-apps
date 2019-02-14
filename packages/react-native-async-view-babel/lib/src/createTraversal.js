"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const t = require("@babel/types");
function createTraversal() {
    const traverseOptions = {
        Program: {
            enter(traversePath) {
                traversePath.traverse({
                    JSXElement: {
                        enter(traversePath2) {
                            // throw Error('!!!');
                            // throw traversePath2.buildCodeFrameError('!!!');
                            let node = traversePath2.node;
                            if (node.openingElement.name.name !== 'ASFlex') {
                                return;
                            }
                            // throw traversePath2.buildCodeFrameError(JSON.stringify(node.openingElement.name));
                            let hasBlacklisted = !!node.openingElement.attributes
                                .filter((v) => v.type === 'JSXAttribute')
                                .find((v) => !!['onPress', 'onLongPress', 'backgroundColor'].find((v2) => v.name.name === v2));
                            if (hasBlacklisted) {
                                return;
                            }
                            node.openingElement.name.name = 'asyncview';
                            node.openingElement.attributes.push(t.jsxAttribute(t.jsxIdentifier('asyncViewName'), t.jsxExpressionContainer(t.stringLiteral('flex'))));
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