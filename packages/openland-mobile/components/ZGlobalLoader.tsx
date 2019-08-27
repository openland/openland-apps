import * as React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';

var watchers: ((isLoading: boolean) => void)[] = [];
var loading = false;

export function startLoader() {
    if (!loading) {
        loading = true;
        for (let w of watchers) {
            w(true);
        }
    }
}

export function stopLoader() {
    if (loading) {
        loading = false;
        for (let w of watchers) {
            w(false);
        }
    }
}

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
        backgroundColor: '#F0F2F5',
        borderRadius: 18
    } as ViewStyle
});

function GlobalLoader() {
    return (
        <View style={styles.overlay}>
            <View style={styles.loader}>
                <LoaderSpinner size="large" />
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