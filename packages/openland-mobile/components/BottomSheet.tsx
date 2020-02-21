import * as React from 'react';
import { View, Keyboard, Text } from 'react-native';
import Modalize from 'react-native-modalize';
import { ZButton } from 'openland-mobile/components/ZButton';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { randomKey } from 'react-native-s/utils/randomKey';
import { SDevice } from 'react-native-s/SDevice';
import { GQLClientContext } from 'openland-api/useClient';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZLoader } from './ZLoader';

export interface BottomSheetActions {
    hide: () => void;
    show: () => void;
}
interface BuildConfig {
    view: (actions: BottomSheetActions) => React.ReactElement;
    cancelable?: boolean;
    title?: string;
    buttonTitle?: string;
}

interface Modal extends BuildConfig {
    key: string;
    actions: BottomSheetActions;
}

interface BottomSheetProviderProps {
    theme: ThemeGlobal;
}

interface BottomSheetProviderState {
    modals: Modal[];
}

let provider: BottomSheetProviderComponent;

export function showBottomSheet(config: BuildConfig) {
    if (provider) {
        provider.create(config).show();
    }
}

class BottomSheetProviderComponent extends React.Component<
    BottomSheetProviderProps,
    BottomSheetProviderState
    > {
    private _refs: { key: string; current: Modalize }[] = [];
    state = { modals: [] };

    componentDidMount() {
        provider = this;
    }

    setRef = (key: string) => (ref: Modalize) => {
        const existRef = this._refs.find(r => r.key === key);
        if (!existRef) {
            this._refs.push({ key, current: ref });
        }
    }

    handleClose = (key: string) => () => {
        setTimeout(() => {
            const modals = this.state.modals.filter((modal: Modal) => modal.key !== key);
            this.setState({ modals });
            this._refs = this._refs.filter(ref => ref.key !== key);
        }, 1);
    }

    create = (config: BuildConfig) => {
        const { modals } = this.state;

        const key = randomKey();
        const actions = {
            show: () => this.show(key),
            hide: () => this.hide(key),
        };

        const modal = { key, actions, ...config };

        this.setState({
            modals: [...modals, modal],
        });

        return actions;
    }

    private show = (key: string) => {
        setTimeout(() => {
            Keyboard.dismiss();
            const modalRef = this._refs.find(ref => ref.key === key);
            if (!modalRef || !modalRef.current) {
                return;
            }

            modalRef.current.open();
        }, 1);
    }

    hide = (key: string) => {
        const modalRef = this._refs.find(ref => ref.key === key);
        if (!modalRef || !modalRef.current) {
            return;
        }

        modalRef.current.close();
    }

    renderFooter = (modal: Modal) => () => {
        if (modal.cancelable === false) {
            return <View />;
        }

        return (
            <View padding={16} paddingBottom={SDevice.safeArea.bottom || undefined}>
                <ZButton
                    title={modal.buttonTitle ? modal.buttonTitle : 'Cancel'}
                    size="large"
                    style="secondary"
                    onPress={() => this.hide(modal.key)}
                />
            </View>
        );
    }

    render() {
        const { modals } = this.state;
        const { theme } = this.props;

        const overlayStyle = {
            backgroundColor: theme.overlayMedium,
        };

        const modalizeStyle = {
            borderTopLeftRadius: RadiusStyles.Large,
            borderTopRightRadius: RadiusStyles.Large,
            backgroundColor: theme.backgroundSecondary,
        };

        const handleStyle = {
            width: 48,
            height: 4,
            backgroundColor: theme.foregroundQuaternary,
        };

        return modals.map((modal: Modal) => (
            <Modalize
                key={modal.key}
                ref={this.setRef(modal.key)}
                onClosed={this.handleClose(modal.key)}
                overlayStyle={overlayStyle}
                adjustToContentHeight={true}
                handlePosition={'inside'}
                modalStyle={modalizeStyle}
                handleStyle={handleStyle}
                FooterComponent={this.renderFooter(modal)}
            >
                <View paddingTop={20} paddingBottom={modal.cancelable === false ? SDevice.safeArea.bottom || 20 : 0}>
                    {!!modal.title && (
                        <View paddingTop={6} paddingBottom={10} alignItems="center">
                            <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }} allowFontScaling={false}>
                                {modal.title}
                            </Text>
                        </View>
                    )}
                    <GQLClientContext.Provider value={getClient()}>
                        <React.Suspense fallback={<ZLoader />}>
                            {modal.view(modal.actions)}
                        </React.Suspense>
                    </GQLClientContext.Provider>
                </View>
            </Modalize>
        ));
    }
}

export const BottomSheetProvider = XMemo(() => {
    const theme = React.useContext(ThemeContext);

    return <BottomSheetProviderComponent theme={theme} />;
});
