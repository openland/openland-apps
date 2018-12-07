"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const t = tslib_1.__importStar(require("@babel/types"));
const XStyles_1 = require("../../openland-x-styles/XStyles"); // Do not use absolute path
const v4_1 = tslib_1.__importDefault(require("uuid/v4"));
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
                }
            }
        },
        JSXElement: {
            enter(traversePath) {
                let attrs = [...traversePath.node.openingElement.attributes];
                let i = 0;
                let removed = false;
                let styles = [];
                let selectedStyles = [];
                let hasStyles = false;
                if (traversePath.node.openingElement.name.name !== 'XView') {
                    return;
                }
                for (let a of attrs) {
                    removed = false;
                    if (a.type === 'JSXAttribute' && a.name.type === 'JSXIdentifier' && a.value) {
                        if (XStyles_1.XStyleKeys.findIndex((v) => v === a.name.name) >= 0) {
                            if (a.value.type === 'StringLiteral') {
                                if (a.name.name.startsWith('selected')) {
                                    let c = a.name.name.substring(8, 9).toLowerCase() + a.name.name.substring(9);
                                    console.log(c);
                                    selectedStyles.push(t.objectProperty(t.identifier(c), t.stringLiteral(a.value.value)));
                                }
                                else {
                                    styles.push(t.objectProperty(t.identifier(a.name.name), t.stringLiteral(a.value.value)));
                                }
                                // styles[a.name.name] = a.value;
                                traversePath.node.openingElement.attributes.splice(i, 1);
                                removed = true;
                                hasStyles = true;
                                pageHasStyles = true;
                            }
                            else if (a.value.type === 'JSXExpressionContainer') {
                                if (a.value.expression.type === 'StringLiteral' || a.value.expression.type === 'NumericLiteral' || a.value.expression.type === 'BooleanLiteral') {
                                    // styles[a.name.name] = a.value.expression;
                                    if (a.name.name.startsWith('selected')) {
                                        let c = a.name.name.substring(8, 9).toLowerCase() + a.name.name.substring(9);
                                        console.log(c);
                                        selectedStyles.push(t.objectProperty(t.identifier(c), a.value.expression));
                                    }
                                    else {
                                        styles.push(t.objectProperty(t.identifier(a.name.name), a.value.expression));
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
                    let key = v4_1.default();
                    while (key.indexOf('-') > 0) {
                        key = key.replace('-', '_');
                    }
                    let uuid = 'style_' + key;
                    if (styles.length > 0) {
                        pending.push(t.variableDeclaration('var', [
                            t.variableDeclarator(t.identifier('___' + uuid + '_n'), t.callExpression(t.identifier('calculateStyles'), [
                                t.objectExpression(styles)
                            ]))
                        ]));
                        traversePath.node.openingElement.attributes.push(t.jsxAttribute(t.jsxIdentifier('__styleClassName'), t.jsxExpressionContainer(t.identifier('___' + uuid + '_n'))));
                    }
                    if (selectedStyles.length > 0) {
                        pending.push(t.variableDeclaration('var', [
                            t.variableDeclarator(t.identifier('___' + uuid + '_s'), t.callExpression(t.identifier('calculateStyles'), [
                                t.objectExpression([...styles, ...selectedStyles])
                            ]))
                        ]));
                        traversePath.node.openingElement.attributes.push(t.jsxAttribute(t.jsxIdentifier('__styleSelectedClassName'), t.jsxExpressionContainer(t.identifier('___' + uuid + '_s'))));
                        traversePath.node.openingElement.attributes.push(t.jsxAttribute(t.jsxIdentifier('__styleSelectable'), t.jsxExpressionContainer(t.booleanLiteral(true))));
                    }
                }
            }
        }
    };
    return traverseOptions;
}
exports.createTraversal = createTraversal;
//# sourceMappingURL=createTraversal.js.map