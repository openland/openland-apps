import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { ZQuery } from '../../../components/ZQuery';
import { UsersQuery } from 'openland-api';
import { ZListItem } from '../../../components/ZListItem';
import { ZListItemEdit } from '../../../components/ZListItemEdit';
import { Keyboard } from 'react-native';
import { startLoader, stopLoader } from '../../../components/ZGlobalLoader';
import { PageProps } from '../../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
// import { FastHeader } from 'react-native-fast-navigation/FastHeader';

class UserPickerComponent extends React.PureComponent<PageProps, { query: string }> {

    state = {
        query: ''
    };

    handlePicked = async (id: string) => {
        let action = this.props.router.params.action as (value: string) => any;
        try {
            Keyboard.dismiss();
            startLoader();
            let res = await action(id);
            this.props.router.back();
        } catch (e) {
            // 
        } finally {
            stopLoader();
        }
    }

    render() {
        return (
            <>
                {/* <FastHeader title="Add member" /> */}
                <ZQuery query={UsersQuery} variables={{ query: this.state.query }}>
                    {(reponse) => (
                        <SScrollView>
                            <ZListItemEdit title="Search" value={this.state.query} onChange={(v) => this.setState({ query: v })} />
                            {reponse.data.items.map((v) => (
                                <ZListItem key={v.id} text={v.title} onPress={() => this.handlePicked(v.id)} />
                            ))}
                        </SScrollView>
                    )}
                </ZQuery>
            </>
        );
    }
}

export const UserPicker = withApp(UserPickerComponent, { navigationAppearance: 'small' });