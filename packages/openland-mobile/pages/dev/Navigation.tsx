import * as React from 'react';
import { ScrollView, SafeAreaView, Button, View, Text, Modal, Dimensions, Animated } from 'react-native';
import { AppStyles } from '../../styles/AppStyles';
import { NavigationInjectedProps } from 'react-navigation';
import { ZHeader } from '../../components/ZHeader';
import { ZHeaderSearch } from '../../components/ZHeaderSearch';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemEdit } from '../../components/ZListItemEdit';
import { ZSafeAreaView } from '../../components/ZSaveAreaView';
import { ZKeyboardAvoidingView } from '../../components/ZKeyboardAvoidingView';

export class Navigation extends React.PureComponent<NavigationInjectedProps, { hide: boolean }> {

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
            <View width="100%" height="100%" backgroundColor={AppStyles.backyardColor}>
                <ZHeaderSearch navigation={this.props.navigation}>
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
                </ZHeaderSearch>
            </View>
        );
    }
}