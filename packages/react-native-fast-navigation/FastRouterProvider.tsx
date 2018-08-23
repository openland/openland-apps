import * as React from 'react';
import { View, BackHandler } from 'react-native';
import { FastRoutes } from './FastRoutes';
import { FastHistoryManager } from './FastHistory';
import UUID from 'uuid/v4';
import { AndroidishContainer } from './containers/AndroidishContainer';

function generateKey() {
    return UUID();
}

export interface FastRouterProviderProps {
    routes: FastRoutes;
}

export class FastRouterProvider extends React.PureComponent<FastRouterProviderProps> {

    private history: FastHistoryManager;

    constructor(props: FastRouterProviderProps) {
        super(props);

        this.history = new FastHistoryManager(props.routes);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleHardwareBack);
    }

    private handleHardwareBack = () => {
        return this.history.pop();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleHardwareBack);
    }

    render() {
        return (
            <View height="100%" width="100%">
                <AndroidishContainer historyManager={this.history} />
                {/* {this.history.history.map((v, i) => {
                    let CurrentPage = v.context.component;
                    return (
                        <View
                            key={v.context.router.key}
                            opacity={i === this.history.history.length - 1 ? 1 : 0}
                            position="absolute"
                            top={0}
                            bottom={0}
                            left={0}
                            right={0}
                        >
                            <FastRouterContext.Provider value={v.context.router}>
                                <CurrentPage />
                            </FastRouterContext.Provider>
                        </View>
                    );
                })} */}
            </View>
        );
    }
}