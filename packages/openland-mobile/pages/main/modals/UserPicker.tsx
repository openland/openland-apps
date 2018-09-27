import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { ZQuery } from '../../../components/ZQuery';
import { ChatSearchForComposeMobileQuery } from 'openland-api';
import { Keyboard } from 'react-native';
import { startLoader, stopLoader } from '../../../components/ZGlobalLoader';
import { PageProps } from '../../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { UserView } from '../ProfileGroup';
import { ZListItemGroup } from '../../../components/ZListItemGroup';
import { SSearchControler } from 'react-native-s/SSearchController';
import { SHeader } from 'react-native-s/SHeader';
import { SRouter } from 'react-native-s/SRouter';
import { UserShortFragment } from 'openland-api/Types';

class UserSearch extends React.Component<{ query: string, router: SRouter }> {

    handlePicked = async (id: UserShortFragment) => {
        let action = this.props.router.params.action as (value: UserShortFragment) => any;
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
            <ZQuery query={ChatSearchForComposeMobileQuery} variables={{ query: this.props.query, organizations: false, limit: 100 }}>
                {(reponse) => (
                    <SScrollView>
                        <ZListItemGroup>
                            {reponse.data.items.filter(u => u.__typename === 'User').map((v) => (
                                <UserView key={v.id} user={v as any} role={(v as any).primaryOrganization ? (v as any).primaryOrganization.name : undefined} onPress={() => this.handlePicked(v)} />
                            ))}
                        </ZListItemGroup>

                    </SScrollView>
                )}
            </ZQuery>
        );
    }
}
class UserPickerComponent extends React.PureComponent<PageProps> {

    render() {
        let searchRender = <UserSearch query="" router={this.props.router} />;
        return (
            <>
                <SHeader title="Add user" />
                <SSearchControler searchRender={searchRender} >
                    {searchRender}
                </SSearchControler>
            </>
        );
    }
}

export const UserPicker = withApp(UserPickerComponent, { navigationAppearance: 'large' });