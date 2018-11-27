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
import { YMutation } from 'openland-y-graphql/YMutation';
import { Modals } from '../main/modals/Modals';
import { startLoader, stopLoader } from '../../components/ZGlobalLoader';
import { RoomCreateMutation } from 'openland-api';

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
        return (
            <>
                <SHeader title="New group" />
                <SHeaderButton title="Next" onPress={() => { this.ref.current!.submitForm(); }} />
                <YMutation mutation={RoomCreateMutation}>
                    {create => (
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
                                            let res = await create({
                                                variables: {
                                                    kind: SharedRoomKind.GROUP,
                                                    title: src.title,
                                                    photoRef: src.photoRef,
                                                    members: users.map(u => u.id)
                                                }
                                            });
                                            this.props.router.pushAndReset('Conversation', { id: (res as any).data.room.id });
                                        }
                                    },
                                    src.title);
                            }}
                        >
                            <View>
                                <View alignSelf="center" marginTop={30} marginBottom={10}>
                                    <ZAvatarPicker field="photoRef" />
                                </View>
                                <ZTextInput marginLeft={16} marginTop={21} placeholder="Group name" field="title" height={44} style={{ fontSize: 16 }} />
                                <View marginLeft={16} height={1} alignSelf="stretch" backgroundColor={AppStyles.separatorColor} />
                            </View>
                        </ZForm>
                    )}
                </YMutation>
            </>
        );
    }
}

export const CreateGroupAttrs = withApp(CreateGroupComponent);