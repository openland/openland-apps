import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../../components/withApp';
import { ZScrollView } from '../../../components/ZScrollView';

class ComposeModalComponent extends React.PureComponent<NavigationInjectedProps> {
    static navigationOptions = {
        title: 'New message'
    };

    render() {
        return (
            <ZScrollView />
        );
    }
}

export const ComposeModal = withApp(ComposeModalComponent);