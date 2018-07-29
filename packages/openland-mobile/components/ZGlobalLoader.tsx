import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';

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

export const withGlobalLoader = (Wrapped: React.ComponentType) => {
    class GlobalLoaderproviderComponent extends React.PureComponent<{}, { loading: boolean }> {

        state = {
            loading: loading
        };

        componentWillMount() {
            watchers.push(this.handleLoadingChanged);
        }

        handleLoadingChanged = (isLoading: boolean) => {
            console.log(isLoading);
            this.setState({ loading: isLoading });
        }

        render() {
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