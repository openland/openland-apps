import * as React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import LoaderSpinner from 'openland-mobile/components/LoaderSpinner';

var watchers: ((isLoading: boolean, isNewLoader?: boolean) => void)[] = [];
var loading = false;

export function startLoader(isNewLoader?: boolean) {
    if (!loading) {
        loading = true;
        for (let w of watchers) {
            w(true, isNewLoader);
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.3)'
    } as ViewStyle,
    loader: {
        width: 96,
        height: 96,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F2F5',
        borderRadius: 18,
    } as ViewStyle
});

function GlobalLoader() {
    return (
        <View style={styles.overlay}>
            <View style={styles.loader}>
                <LoaderSpinner />
            </View>
        </View>
    );
} 

export const withGlobalLoader = (Wrapped: React.ComponentType) => {
    class GlobalLoaderproviderComponent extends React.PureComponent<{}, { loading: boolean, newLoader: boolean }> {

        state = {
            loading: loading,
            newLoader: false
        };

        componentWillMount() {
            watchers.push(this.handleLoadingChanged);
        }

        handleLoadingChanged = (isLoading: boolean, isNewLoader?: boolean ) => {
            console.log(isLoading);
            this.setState({ 
                loading: isLoading,
                newLoader: isNewLoader !== undefined
            });
        }

        render() {
            if (this.state.newLoader) {
                return (
                    <View height="100%" width="100%">
                        <Wrapped />
                        {this.state.loading && (
                            <GlobalLoader />
                        )}
                    </View>
                );
            } 

            return (
                <View height="100%" width="100%">
                    <Wrapped />
                    {this.state.loading &&
                        <View position="absolute" left={0} top={0} right={0} bottom={0} alignContent="center" justifyContent="center" backgroundColor="rgba(52, 52, 52, 0.3)">
                            <View width={100} height={100} backgroundColor="#fff" borderRadius={6} alignContent="center" justifyContent="center" alignSelf="center">
                                <ActivityIndicator size="large" />
                            </View>
                        </View>
                    }
                </View>
            );
        }
    }
    return GlobalLoaderproviderComponent;
};