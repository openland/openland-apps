import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { ZQuery } from '../../../components/ZQuery';
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
import { ExplorePeopleQuery } from 'openland-api';

class UserSearch extends React.Component<{ query: string, router: SRouter }> {

    handlePicked = async (id: UserShort) => {
        let action = this.props.router.params.action as (value: UserShort) => any;
        try {
            Keyboard.dismiss();
            startLoader();
            let res = await action(id);
            if (this.props.router.params.autoclose !== false) {
                this.props.router.back();
            }
        } catch (e) {
            // 
        } finally {
            stopLoader();
        }
    }

    render() {
        return (
            <ZQuery query={ExplorePeopleQuery} variables={{ query: this.props.query }} fetchPolicy="cache-and-network">
                {(reponse) => (
                    <SScrollView>
                        <ZListItemGroup>
                            {reponse.data.items.edges.map((v) => (
                                <UserView key={v.node.id} user={v as any} role={(v as any).primaryOrganization ? (v as any).primaryOrganization.name : undefined} onPress={() => this.handlePicked(v.node)} />
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
                <SHeader title="Add members" />
                <SSearchControler searchRender={searchRender} >
                    {searchRender}
                </SSearchControler>
            </>
        );
    }
}

export const UserPicker = withApp(UserPickerComponent, { navigationAppearance: 'large' });