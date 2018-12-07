"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const t = tslib_1.__importStar(require("@babel/types"));
const XStyles_1 = require("../../openland-x-styles/XStyles"); // Do not use absolute path
const v4_1 = tslib_1.__importDefault(require("uuid/v4"));
const parse_1 = require("./parse");
function createTraversal() {
    let isImported = false;
    let pageHasStyles = false;
    let body = [];
    let pending = [];
    const traverseOptions = {
        Program: {
            enter(traversePath) {
                isImported = false;
                pageHasStyles = false;
                body = traversePath.node.body;
                pending = [];
            },
            exit(traversePath) {
                if (!isImported && pageHasStyles) {
                    for (let p of pending) {
                        body.unshift(p);
                    }
                    body.unshift(t.importDeclaration([t.importSpecifier(t.identifier('calculateStyles'), t.identifier('calculateStyles'))], t.stringLiteral('openland-x-styles/calculateStyles')));
                    console.log(parse_1.generate2(traversePath.node));
                }
            }
        },
        JSXElement: {
            enter(traversePath) {
                let attrs = [...traversePath.node.openingElement.attributes];
                let i = 0;
                let removed = false;
                let styles = [];
                let hasStyles = false;
                if (traversePath.node.openingElement.name.name !== 'XView') {
                    return;
                }
                for (let a of attrs) {
                    removed = false;
                    if (a.type === 'JSXAttribute' && a.name.type === 'JSXIdentifier' && a.value) {
                        if (XStyles_1.XStyleKeys.findIndex((v) => v === a.name.name) >= 0) {
                            if (a.value.type === 'StringLiteral') {
                                styles.push(t.objectProperty(t.identifier(a.name.name), t.stringLiteral(a.value.value)));
                                // styles[a.name.name] = a.value;
                                traversePath.node.openingElement.attributes.splice(i, 1);
                                removed = true;
                                hasStyles = true;
                                pageHasStyles = true;
                            }
                            else if (a.value.type === 'JSXExpressionContainer') {
                                if (a.value.expression.type === 'StringLiteral' || a.value.expression.type === 'NumericLiteral' || a.value.expression.type === 'BooleanLiteral') {
                                    // styles[a.name.name] = a.value.expression;
                                    styles.push(t.objectProperty(t.identifier(a.name.name), a.value.expression));
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
                    let key = v4_1.default();
                    while (key.indexOf('-') > 0) {
                        key = key.replace('-', '_');
                    }
                    let uuid = 'style_' + key;
                    pending.push(t.variableDeclaration('var', [
                        t.variableDeclarator(t.identifier('___' + uuid), t.callExpression(t.identifier('calculateStyles'), [
                            t.objectExpression(styles)
                        ]))
                    ]));
                    traversePath.node.openingElement.attributes.push(t.jsxAttribute(t.jsxIdentifier('className'), t.jsxExpressionContainer(t.identifier('___' + uuid))));
                }
            }
        }
    };
    return traverseOptions;
}
exports.createTraversal = createTraversal;
//# sourceMappingURL=createTraversal.js.map