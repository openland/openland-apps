import Reconciler from 'react-reconciler';

export const TemplatedReconciler = () => Reconciler({

    // Allow mutations
    supportsMutation: true,

    // Date?
    now: Date.now,

    // Context values (unused)
    getRootHostContext() {
        return {};
    },
    getChildHostContext() {
        return {};
    },

    // Commit lifecycle
    prepareForCommit() {
        // TODO: Call callback
    },
    resetAfterCommit() {
        // onChanged();
    },

    // Declare text contents
    shouldSetTextContent(type: any, props: any) {
        return false;
    },

    //
    // Creation
    //

    createInstance(type: string, props: any, rootContainerInstance: any, _currentHostContext: any, workInProgress: any) {
        if (type !== 'tview' && type !== 'ttext' && type !== 'tif' && type !== 'ttextbind') {
            throw Error('Unexpected element type: ' + type);
        }

        if (type !== 'ttext') {
            if (typeof props === 'string' || typeof props === 'number') {
                throw new Error('Text strings must be rendered within a <Text> component.');
            }

            if (props instanceof Array) {
                props.forEach(item => {
                    if (typeof item === 'string') {
                        throw new Error('Text strings must be rendered within a <Text> component.');
                    }
                });
            }
        }

        let { children, ...other } = props;
        return { type: type, props: other, children: [] };
    },
    createTextInstance(text: string) {
        return { type: 'value', value: text };
    },
    finalizeInitialChildren(element: any, type: any, props: any) {
        // Do nothing
    },

    // 
    // Mutations
    //

    appendInitialChild(parent: any, child: any) {
        parent.children.push(child);
    },
    appendChild(parent: any, child: any) {
        parent.children.push(child);
    },
    removeChild(parent: any, child: any) {
        const index = parent.children.indexOf(child);
        parent.children.splice(index, 1);
    },
    insertBefore(parent: any, child: any, beforeChild: any) {
        const index = parent.children.indexOf(child);
        if (index >= 0) {
            // Move item
            parent.children.splice(index, 1);
            const beforeChildIndex = parent.children.indexOf(beforeChild);
            parent.children.splice(beforeChildIndex, 0, child);
        } else {
            // Add item
            const beforeChildIndex = parent.children.indexOf(beforeChild);
            parent.children.splice(beforeChildIndex, 0, child);
        }
    },
    appendChildToContainer(parent: any, child: any) {
        if (parent.children.length > 1) {
            throw Error('Root element can be only one');
        }
        parent.children.push(child);
    },
    removeChildFromContainer(parent: any, child: any) {
        const index = parent.children.indexOf(child);
        parent.children.splice(index, 1);
    },
    commitUpdate(element: any, updatePayload: any, type: any, oldProps: any, newProps: any) {
        // Update props (without children)
        let { children, asyncViewName, ...other } = newProps;
        if (oldProps.asyncViewName !== newProps.asyncViewName) {
            throw Error('Changing view type is not possible');
        }
        element.props = other;
    },
    prepareUpdate(element: any, oldProps: any, newProps: any) {
        // TODO: Check if props are changed
        return true;
    },
    commitTextUpdate(element: any, oldText: any, newText: any) {
        element.value = newText;
    },
    resetTextContent() {
        // Do nothing
    }
});