import * as React from 'react';
import { View, BackHandler } from 'react-native';
import { FastRoutes } from './FastRoutes';
import { FastHistoryManager } from './FastHistory';
import UUID from 'uuid/v4';
import { Container } from './containers/Container';

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
                <Container historyManager={this.history} />
            </View>
        );
    }
}