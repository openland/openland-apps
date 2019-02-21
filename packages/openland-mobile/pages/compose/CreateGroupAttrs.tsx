import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { ZForm } from '../../components/ZForm';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { View } from 'react-native';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { ZTextInput } from '../../components/ZTextInput';
import { AppStyles } from '../../styles/AppStyles';
import { UserShort, SharedRoomKind } from 'openland-api/Types';
import { UserError } from 'openland-y-forms/errorHandling';
import { Modals } from '../main/modals/Modals';
import { getClient } from 'openland-mobile/utils/apolloClient';

interface CreateGroupComponentState {
    query: string;
}

class CreateGroupComponent extends React.PureComponent<PageProps, CreateGroupComponentState> {
    constructor(props: any) {
        super(props);
        this.state = { query: '' };
    }
    private ref = React.createRef<ZForm>();

    handleChange = (query: string) => {
        this.setState({ query });
    }

    render() {
        let orgId = this.props.router.params.organizationId;
        let kind = orgId ? SharedRoomKind.PUBLIC : SharedRoomKind.GROUP;

        return (
            <>
                <SHeader title="New group" />
                <SHeaderButton title="Next" onPress={() => { this.ref.current!.submitForm(); }} />
                <ZForm
                    ref={this.ref}
                    action={async (src) => {
                        if (!src.title) {
                            throw new UserError('Group name can\'t be empty');
                        }
                        Modals.showUserMuptiplePicker(
                            this.props.router,
                            {
                                title: 'Create',
                                action: async (users: UserShort[]) => {
                                    let res = await getClient().mutateRoomCreate({
                                        kind: kind,
                                        title: src.title,
                                        photoRef: src.photoRef,
                                        members: users.map(u => u.id),
                                        organizationId: orgId,
                                    });
                                    
                                    if (orgId) {
                                        await getClient().refetchOrganization({ organizationId: orgId });
                                    }

                                    this.props.router.pushAndReset('Conversation', { id: res.room.id });
                                }
                            },
                            src.title);
                    }}
                >
                    <View flexDirection="row" marginLeft={16} marginVertical={16}>
                        <ZAvatarPicker field="photoRef" size={70} />
                        <View flexDirection="column" marginLeft={16} flexGrow={1} flexBasis={0} minWidth={0} height={70} justifyContent="center">
                            <ZTextInput placeholder="Group name" field="title" height={44} style={{ fontSize: 16 }} placeholderTextColor="#a0a0a0" autoFocus={true} />
                            <View height={1} alignSelf="stretch" backgroundColor={AppStyles.separatorColor} />
                        </View>
                    </View>
                </ZForm>
            </>
        );
    }
}

export const CreateGroupAttrs = withApp(CreateGroupComponent, { navigationAppearance: 'small' });