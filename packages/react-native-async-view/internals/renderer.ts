import Reconciler from 'react-reconciler';

var tagIndex = 0;

function createTag() {
    return 't' + (tagIndex++);
}

const createReconciler = (onChanged: () => void) => Reconciler({

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
        onChanged();
    },

    // Declare text contents
    shouldSetTextContent(type: any, props: any) {
        return false;
    },

    //
    // Creation
    //

    createInstance(type: string, props: any, rootContainerInstance: any, _currentHostContext: any, workInProgress: any) {
        if (type !== 'asyncview' && type !== 'asynctext') {
            throw Error('Unexpected element type: ' + type);
        }

        if (type !== 'asynctext') {
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

        let { children, asyncViewName, ...other } = props;
        return { key: createTag(), type: asyncViewName || 'text', props: other, children: [] };
    },
    createTextInstance(text: string) {
        return { key: createTag(), type: 'value', value: text };
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

export class AsyncRenderer {
    private root = { type: 'root', children: [] };
    private reconciler: any;
    private container: any;
    private handler: (state: any) => void;
    private isStarting = true;

    constructor(handler: (state: any) => void, element: any) {
        this.handler = handler;
        this.reconciler = createReconciler(this.handleChanged);
        this.container = this.reconciler.createContainer(this.root);
        this.reconciler.updateContainer(element, this.container, null);
        this.isStarting = false;
    }

    private handleChanged = () => {
        if (!this.isStarting) {
            this.handler(this.getState());
        }
    }

    getState = () => {
        if (this.root.children.length === 1) {
            return this.root.children[0];
        } else {
            return null;
        }
    }

    render = (element: any) => {
        this.reconciler.updateContainer(element, this.container, null);
    }
}