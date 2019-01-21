import * as React from 'react';
import { View } from 'react-native';
import { randomKey } from 'react-native-s/utils/randomKey';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';
import { SDevice } from 'react-native-s/SDevice';
import { SSafeAreaContext, SSafeAreaProvider } from 'react-native-s/SSafeArea';

export interface ZModalController {
    hide(): void;
}

export type ZModal = (modal: ZModalController) => React.ReactElement<{}>;

interface ZModalProviderInt {
    showModal(modal: ZModal): void;
}

let provider: ZModalProviderInt | undefined;

export function showModal(modal: ZModal) {
    if (provider) {
        provider.showModal(modal);
    }
}

export class ZModalProvider extends React.Component<{ children?: any }, { modals: { element: React.ReactElement<{}>, key: string }[] }> implements ZModalProviderInt {

    constructor(props: { children?: any }) {
        super(props);
        this.state = { modals: [] };
    }

    showModal(modal: ZModal) {
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
                            <SSafeAreaProvider bottom={SDevice.safeArea.bottom} top={SDevice.safeArea.top}>
                                {v.element}
                            </SSafeAreaProvider>
                        </View>
                    ))}
                </View>
            </>
        )
    }
}