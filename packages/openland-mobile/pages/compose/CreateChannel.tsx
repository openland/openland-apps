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
import { YMutation } from 'openland-y-graphql/YMutation';
import { UserError } from 'openland-y-forms/errorHandling';
import { RoomCreateMutation } from 'openland-api';

interface CreateChannelComponentState {
    query: string;
    users: { id: string, name: string }[];
}

class CreateChannelComponent extends React.PureComponent<PageProps, CreateChannelComponentState> {
    constructor(props: any) {
        super(props);
        this.state = { users: [], query: '' };
    }
    private ref = React.createRef<ZForm>();

    handleChange = (query: string) => {
        this.setState({ query });
    }

    handleAddUser = (user: UserShort) => {
        if (!this.state.users.find((v) => v.id === user.id)) {
            this.setState({ users: [...this.state.users, user] });
        }
    }

    handleRemoveUser = (id: string) => {
        this.setState({ users: this.state.users.filter((v) => v.id !== id) });
    }

    render() {
        return (
            <>
                <SHeader title="New Channel" />
                <SHeaderButton title="Create" onPress={() => { this.ref.current!.submitForm(); }} />
                <YMutation mutation={RoomCreateMutation}>
                    {(create) => (<ZForm
                        ref={this.ref}
                        action={async (src) => {
                            if (!src.title) {
                                throw new UserError('Channel name can\'t be empty');
                            }
                            let channel = await create({
                                variables: {
                                    kind: SharedRoomKind.PUBLIC,
                                    title: src.title,
                                    description: src.description,
                                    photoRef: src.photoRef,
                                    members: []
                                }
                            });
                            this.props.router.pushAndReset('Conversation', { id: (channel as any).data.channel.id });
                        }}
                    >
                        <View >
                            <View alignSelf="center" marginTop={30} marginBottom={10}>
                                <ZAvatarPicker field="photoRef" />
                            </View>
                            <ZTextInput marginLeft={16} autoFocus={true} placeholder="Title" field="title" height={44} style={{ fontSize: 16 }} />
                            <View marginLeft={16} height={1} alignSelf="stretch" backgroundColor={AppStyles.separatorColor} />
                            <ZTextInput marginLeft={16} marginTop={21} placeholder="Description" field="description" height={44} style={{ fontSize: 16 }} />
                            <View marginLeft={16} height={1} alignSelf="stretch" backgroundColor={AppStyles.separatorColor} />
                        </View>
                    </ZForm>)}

                </YMutation>
            </>
        );
    }
}

export const CreateChannel = withApp(CreateChannelComponent);