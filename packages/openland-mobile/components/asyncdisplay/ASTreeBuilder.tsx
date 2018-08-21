import * as React from 'react';
import reactTreeWalker from 'react-tree-walker';

function traverseTree(root: any) {
    let res: any[] = [];
    reactTreeWalker(root, (element: any, instance: any) => {
        if (element.type === React.Fragment) {
            return true;
        }
        // Treat non ASVIEW as Fragments
        if (!!element.type && !element.type.__ISASVIEW) {
            return true;
        }
        if (typeof element === 'string') {
            res.push({
                element: 'value',
                value: element
            });
            return false;
        }
        const childrennodes = traverseTree(element.props.children);
        const { children, ...nodeargs } = element.props;
        const realargs = element.type.asPreprocessor ? element.type.asPreprocessor(nodeargs) : nodeargs;
        res.push({ element: element.type.asName, props: realargs, children: childrennodes });
        return false;
    });
    return res;
}

export function buildTree(root: any) {
    let res: any[] = traverseTree(root);
    if (res.length === 1) {
        return res[0];
    }
    return res;
}