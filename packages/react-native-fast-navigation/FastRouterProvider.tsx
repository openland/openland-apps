import * as React from 'react';
import { View, BackHandler } from 'react-native';
import { FastHistoryManager } from './FastHistory';
import { Container } from './implementation/Container';

export interface FastRouterProviderProps {
    history: FastHistoryManager;
}

export class FastRouterProvider extends React.PureComponent<FastRouterProviderProps> {

    private history: FastHistoryManager;

    constructor(props: FastRouterProviderProps) {
        super(props);

        this.history = props.history;
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