import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { ZForm } from '../../components/ZForm';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemBase } from '../../components/ZListItemBase';
import { View } from 'react-native';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { ZTextInput } from '../../components/ZTextInput';
import { AppStyles } from '../../styles/AppStyles';
import { UserShort } from 'openland-api/Types';
import { UserError } from 'openland-y-forms/errorHandling';

interface CreateGroupComponentState {
    query: string;
    users: { id: string, name: string }[];
}

class CreateGroupComponent extends React.PureComponent<PageProps, CreateGroupComponentState> {
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
                <SHeader title="👥 New group" />
                <SHeaderButton title="Next" onPress={() => { this.ref.current!.submitForm(); }} />
                <ZForm
                    ref={this.ref}
                    action={async (src) => {
                        // let group = await create({ variables: { members: this.state.users.map(u => u.id), title: src.title, photoRef: src.photoRef } });
                        if (!src.title) {
                            throw new UserError('Group name can\'t be empty');
                        }
                        this.props.router.push('CreateGroupUsers', { variables: { title: src.title, photoRef: src.photoRef } });
                    }}
                >
                    <ZListItemBase height={96} separator={false}>
                        <View padding={15}>
                            <ZAvatarPicker field="photoRef" />
                        </View>
                        <View flexDirection="column" flexGrow={1} flexBasis={0} paddingVertical={4} alignContent="center" alignSelf="center">
                            <ZTextInput autoFocus={true} placeholder="Group name" field="title" height={44} style={{ fontSize: 16 }} />
                            <View height={1} alignSelf="stretch" backgroundColor={AppStyles.separatorColor} />
                        </View>
                    </ZListItemBase>
                </ZForm>
            </>
        );
    }
}

export const CreateGroupAttrs = withApp(CreateGroupComponent);