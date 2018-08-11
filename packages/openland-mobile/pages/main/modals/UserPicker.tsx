import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../../components/withApp';
import { ZScrollView } from '../../../components/ZScrollView';
import { ZQuery } from '../../../components/ZQuery';
import { UsersQuery } from 'openland-api';
import { ZListItem } from '../../../components/ZListItem';
import { ZListItemEdit } from '../../../components/ZListItemEdit';
import { Keyboard } from 'react-native';
import { startLoader, stopLoader } from '../../../components/ZGlobalLoader';

class UserPickerComponent extends React.PureComponent<NavigationInjectedProps, { query: string }> {

    static navigationOptions = {
        title: 'Add Member',
        headerAppearance: 'small'
    };

    state = {
        query: ''
    };

    handlePicked = async (id: string) => {
        let action = this.props.navigation.getParam('action') as (value: string) => any;
        try {
            Keyboard.dismiss();
            startLoader();
            let res = await action(id);
            this.props.navigation.goBack();
        } catch (e) {
            // 
        } finally {
            stopLoader();
        }
    }

    render() {
        return (
            <>
                <ZQuery query={UsersQuery} variables={{ query: this.state.query }}>
                    {(reponse) => (
                        <ZScrollView>
                            <ZListItemEdit title="Search" value={this.state.query} onChange={(v) => this.setState({ query: v })} />
                            {reponse.data.items.map((v) => (
                                <ZListItem key={v.id} text={v.title} onPress={() => this.handlePicked(v.id)} />
                            ))}
                        </ZScrollView>
                    )}
                </ZQuery>
            </>
        );
    }
}

export const UserPicker = withApp(UserPickerComponent, { navigationStyle: 'small' });