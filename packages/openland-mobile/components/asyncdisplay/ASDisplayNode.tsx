import * as React from 'react';
import reactTreeWalker from 'react-tree-walker';
import { AsyncDisplayNodeNative } from './ASDisplayNodeNative';
import { StyleProp, ViewStyle } from 'react-native';

async function buildTree(root: any) {
    let res: any[] = [];
    await reactTreeWalker(root, async (element: any, instance: any) => {
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
        const childrennodes = await buildTree(<>{element.props.children}</>);
        const { children, ...nodeargs } = element.props;
        const realargs = element.type.asPreprocessor ? element.type.asPreprocessor(nodeargs) : nodeargs;
        res.push({ element: element.type.asName, props: realargs, children: childrennodes });
        return false;
    });
    return res;
}

export class ASDisplayNode extends React.PureComponent<{ style?: StyleProp<ViewStyle> }, { config?: string }> {

    private generation = 0;

    constructor(props: {}) {
        super(props);
        this.state = {

        };
    }

    private doRefresh = () => {
        let currentGen = ++this.generation;
        (async () => {
            let res = await buildTree(<>{this.props.children}</>);
            if (currentGen === this.generation) {
                this.setState({ config: JSON.stringify(res[0]) });
            }
        })();
    }

    componentWillMount() {
        this.doRefresh();
    }

    componentDidUpdate() {
        this.doRefresh();
    }

    render() {
        return (
            <AsyncDisplayNodeNative style={this.props.style} config={this.state.config} />
        );
    }
}