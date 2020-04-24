import * as React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { useTheme } from 'openland-mobile/themes/ThemeContext';

let watchers: ((isLoading: boolean) => void)[] = [];
let loading = false;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    } as ViewStyle,
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
    loader: {
        width: 96,
        height: 96,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18
    } as ViewStyle
});

function GlobalLoader() {
    const theme = useTheme();

    return (
        <View style={styles.overlay}>
            <View style={styles.loader} backgroundColor={theme.backgroundTertiaryTrans}>
                <LoaderSpinner size="large" color={theme.foregroundQuaternary} />
            </View>
        </View>
    );
}

export const withGlobalLoader = (Wrapped: React.ComponentType) => {
    class GlobalLoaderproviderComponent extends React.PureComponent<{}, { loading: boolean }> {
        state = { loading: loading };

        componentWillMount() {
            watchers.push(this.handleLoadingChanged);
        }

        handleLoadingChanged = (isLoading: boolean) => {
            console.log(isLoading);
            this.setState({ loading: isLoading });
        }

        render() {
            return (
                <View style={styles.container}>
                    <Wrapped />
                    {this.state.loading && (
                        <GlobalLoader />
                    )}
                </View>
            );
        }
    }
    return GlobalLoaderproviderComponent;
};