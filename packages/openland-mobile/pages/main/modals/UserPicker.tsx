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
import { UserShort } from 'openland-api/Types';

class UserSearch extends React.Component<{ query: string, router: SRouter }> {

    handlePicked = async (id: UserShort) => {
        let action = this.props.router.params.action as (value: UserShort) => any;
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
            <ZQuery query={ChatSearchForComposeMobileQuery} variables={{ organizations: false, query: this.props.query, limit: 200 }} fetchPolicy="cache-and-network">
                {(reponse) => (
                    <SScrollView>
                        <ZListItemGroup>
                            {reponse.data.items.filter(u => u.__typename === 'User').map((v) => (
                                <UserView key={v.id} user={v as any} role={(v as any).primaryOrganization ? (v as any).primaryOrganization.name : undefined} onPress={() => this.handlePicked(v as UserShort)} />
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
        let searchRender = (props: { query: string }) => (<UserSearch query={props.query} router={this.props.router} />);
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