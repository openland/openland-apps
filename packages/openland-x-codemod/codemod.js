module.exports = function (fileInfo, api) {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);

    let toRemove = [];
    root
        .findJSXElements('XView')
        .forEach((n) => {
            n.value.openingElement.attributes.forEach((n2) => {
                let name = n2.name.name;
                let value;
                if (n2.value.type === 'JSXExpressionContainer') {
                    if (n2.value.expression.type === 'Literal') {
                        value = n2.value.expression;
                    }
                } else if (n2.value.type === 'Literal') {
                    value = n2.value;
                }
                // console.log(name);
                // console.log(value);
                // console.log(Object.getOwnPropertyNames(n2));
                // console.log(n2.name);
                // j(n2).remove();
                // if (value) {
                //     toRemove.push(n2);
                // }

                j(n2).forEach((n3) => {
                    console.log(n3);
                });
                // console.log(n2);
            })
        });


    return root.toSource();
};