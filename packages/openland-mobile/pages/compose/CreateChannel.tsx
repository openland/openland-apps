import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { ZForm } from '../../components/ZForm';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { View } from 'react-native';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { UserShort, SharedRoomKind } from 'openland-api/Types';
import { UserError } from 'openland-y-forms/errorHandling';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZTextInput } from 'openland-mobile/components/ZTextInput';

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
                <SHeader title="New group" />
                <SHeaderButton title="Create" onPress={() => { this.ref.current!.submitForm(); }} />
                <ZForm
                    ref={this.ref}
                    action={async (src) => {
                        if (!src.title) {
                            throw new UserError('Group name can\'t be empty');
                        }
                        let channel = await getClient().mutateRoomCreate({
                            kind: SharedRoomKind.PUBLIC,
                            title: src.title,
                            description: src.description,
                            photoRef: src.photoRef,
                            members: [],
                            channel: true,
                        });

                        this.props.router.pushAndReset('Conversation', { id: channel.room.id });
                    }}
                >
                    <View>
                        <View alignSelf="center" marginTop={30} marginBottom={10}>
                            <ZAvatarPicker field="photoRef" size="x-large" />
                        </View>
                        <ZTextInput autoFocus={true} placeholder="Title" field="title" />
                        <View marginTop={21}>
                            <ZTextInput placeholder="Description" field="description" multiline={true} />
                        </View>
                    </View>
                </ZForm>
            </>
        );
    }
}

export const CreateChannel = withApp(CreateChannelComponent);