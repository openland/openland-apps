import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemEdit } from '../../components/ZListItemEdit';
import { ZAppContent } from '../../components/ZAppContent';
import { ZScrollView } from '../../components/ZScrollView';
import { withApp } from '../../components/withApp';

export class NavigationComponent extends React.PureComponent<NavigationInjectedProps, { hide: boolean }> {

    static navigationOptions = {
        title: 'Navigation'
    };

    constructor(props: NavigationInjectedProps) {
        super(props);
        this.state = {
            hide: false
        };
    }

    handleNavigate = () => {
        this.props.navigation.navigate('DevTypography');
    }

    updateParams = () => {
        this.setState({ hide: !this.state.hide });
    }

    render() {
        return (
            <ZScrollView>
                <ZListItemGroup>
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItemEdit title="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                    <ZListItem text="Item" />
                </ZListItemGroup>
            </ZScrollView>
        );
    }
}

export const Navigation = withApp(NavigationComponent);