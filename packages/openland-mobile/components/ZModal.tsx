import * as React from 'react';
import { View } from 'react-native';
import { randomKey } from 'react-native-s/utils/randomKey';

export interface ZModalController {
    hide(): void;
}

interface ZModalProviderInt {
    showModal(modal: (modal: ZModalController) => React.ReactElement<{}>): void;
}

let provider: ZModalProviderInt | undefined;

export function showModal(modal: (modal: ZModalController) => React.ReactElement<{}>) {
    if (provider) {
        provider.showModal(modal);
    }
}

export class ZModalProvider extends React.Component<{ children?: any }, { modals: { element: React.ReactElement<{}>, key: string }[] }> implements ZModalProviderInt {

    constructor(props: { children?: any }) {
        super(props);
        this.state = { modals: [] };
    }

    showModal(modal: (modal: ZModalController) => React.ReactElement<{}>) {
        let key = randomKey();
        let cont: ZModalController = {
            hide: () => {
                this.setState((state) => ({ modals: state.modals.filter((v) => v.key !== key) }));
            }
        }
        let element = modal(cont);
        this.setState((state) => ({ modals: [...state.modals, { key, element }] }));
    }

    componentWillMount() {
        provider = this;
    }

    render() {
        return (
            <>
                <View width="100%" height="100%">
                    {this.props.children}
                    {this.state.modals.map((v) => (
                        <View key={v.key} position="absolute" top={0} left={0} right={0} bottom={0}>
                            {v.element}
                        </View>
                    ))}
                </View>
            </>
        )
    }
}