import * as React from 'react';
import { TemplatedReconciler } from './TemplatedReconciler';
import { Example } from './TempatedView';

describe('TemplatedReconciler', () => {
    it('should work', () => {
        let element = (<Example />)
        let root = { type: 'root', children: [] };
        let reconciler = TemplatedReconciler();
        let container = reconciler.createContainer(root);
        reconciler.updateContainer(element, container, null);
        console.warn(JSON.stringify(root));
    });
});