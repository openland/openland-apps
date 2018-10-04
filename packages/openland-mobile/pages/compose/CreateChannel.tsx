import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { ZForm } from '../../components/ZForm';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemBase } from '../../components/ZListItemBase';
import { View, Alert } from 'react-native';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { ZTextInput } from '../../components/ZTextInput';
import { AppStyles } from '../../styles/AppStyles';
import { UserShort } from 'openland-api/Types';
import { YMutation } from 'openland-y-graphql/YMutation';
import { CreateChannelMutation } from 'openland-api';
import { UserError } from 'openland-y-forms/errorHandling';

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
                <SHeader title="📣 New Channel" />
                <SHeaderButton title="Create" onPress={() => { this.ref.current!.submitForm(); }} />
                <YMutation mutation={CreateChannelMutation}>
                    {(create) => (<ZForm
                        ref={this.ref}
                        action={async (src) => {
                            if (!src.title) {
                                throw new UserError('Channel name can\'t be empty');
                            }
                            let channel = await create({
                                variables: {
                                    title: src.title,
                                    description: src.description,
                                    photoRef: src.photoRef
                                }
                            });
                            this.props.router.push('Conversation', { id: (channel as any).data.channel.id });
                        }}
                    >
                        <ZListItemBase height={96} separator={false}>
                            <View padding={15}>
                                <ZAvatarPicker field="photoRef" />
                            </View>
                            <View flexDirection="column" flexGrow={1} flexBasis={0} paddingVertical={4} alignContent="center" alignSelf="center">
                                <ZTextInput autoFocus={true} placeholder="Channel name" field="title" height={44} style={{ fontSize: 16 }} />
                                <View height={1} alignSelf="stretch" backgroundColor={AppStyles.separatorColor} />
                                <ZTextInput placeholder="Description" field="description" height={44} style={{ fontSize: 16 }} />
                                <View height={1} alignSelf="stretch" backgroundColor={AppStyles.separatorColor} />
                            </View>
                        </ZListItemBase>
                    </ZForm>)}

                </YMutation>
            </>
        );
    }
}

export const CreateChannel = withApp(CreateChannelComponent);