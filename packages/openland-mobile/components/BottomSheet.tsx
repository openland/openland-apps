import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Modalize from 'react-native-modalize';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/types';
import { randomKey } from 'react-native-s/utils/randomKey';
import { ASSafeAreaContext, ASSafeArea } from 'react-native-async-view/ASSafeAreaContext';

interface BuildConfig {
    view?: () => React.ReactElement;
    cancelButton?: boolean;
}

interface Modal extends BuildConfig {
    key: string;
}

interface BottomSheetProviderProps {
    theme: ThemeGlobal;
    safeArea: ASSafeArea;
}

interface BottomSheetProviderState {
    modals: Modal[];
}

const styles = StyleSheet.create({

});

export class BottomSheetProviderComponent extends React.Component<
    BottomSheetProviderProps,
    BottomSheetProviderState
> {
    private _refs: { key: string; current: Modalize }[] = [];
    state = { modals: [] };

    componentDidMount() {
        // tslint:disable-next-line: no-use-before-declare
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

    build = (config: BuildConfig) => {
        const { modals } = this.state;

        const modal = { 
            key: randomKey(), 
            view: config.view
        };

        this.setState({
            modals: [...modals, modal],
        });
        
        return {
            show: () => this.show(modal),
            hide: () => this.hide(modal),
        };
    }

    private show = (modal: Modal) => {
        setTimeout(() => {
            const modalRef = this._refs.find(ref => ref.key === modal.key);

            console.log(this._refs);

            if (!modalRef || !modalRef.current) {
                return;
            }

            modalRef.current.open();
        }, 1);
    }

    hide = (modal: Modal) => {
        const modalRef = this._refs.find(ref => ref.key === modal.key);
        if (!modalRef || !modalRef.current) {
            return;
        }

        modalRef.current.close();
    }

    renderFooter = (modal: Modal) => () => {
        const { safeArea } = this.props;

        if (modal.cancelButton === false) {
            return <View />;
        }

        return (
            <View style={{ padding: 10, marginBottom: 20, paddingHorizontal: 16 }}>
                <ZRoundedButton
                    title={'Cancel'}
                    size="large"
                    style="secondary"
                    onPress={() => this.hide(modal)}
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
            borderTopLeftRadius: RadiusStyles.large,
            borderTopRightRadius: RadiusStyles.large,
            backgroundColor: theme.backgroundPrimary,
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
                adjustToContentHeight
                handlePosition={'inside'}
                style={modalizeStyle}
                handleStyle={handleStyle}
                FooterComponent={this.renderFooter(modal)}
            >
                <View style={{ paddingTop: 30 }}>
                    {modal.view && modal.view()}
                </View>
            </Modalize>
        ));
    }
}

export const BottomSheetProvider = XMemo(() => {
    const theme = React.useContext(ThemeContext);
    const safeArea = React.useContext(ASSafeAreaContext);

    return <BottomSheetProviderComponent theme={theme} safeArea={safeArea} />;
});

let provider: BottomSheetProviderComponent;

export function showBottomSheet(view: () => React.ReactElement) {
    if (provider) {
        provider.build({ view }).show();
    }
}