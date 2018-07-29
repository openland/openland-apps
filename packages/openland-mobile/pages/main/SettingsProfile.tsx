import * as React from 'react';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { View, Button, Image } from 'react-native';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemEdit } from '../../components/ZListItemEdit';
import { ZQuery } from '../../components/ZQuery';
import { ProfileQuery } from 'openland-api/ProfileQuery';
import { ZForm } from '../../components/ZForm';
import { YMutation } from 'openland-y-graphql/YMutation';
import { ProfileUpdateMutation, AccountQuery } from 'openland-api';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { ZListItemBase } from '../../components/ZListItemBase';
import { ZTextInput } from '../../components/ZTextInput';
import { AppStyles } from '../../styles/AppStyles';
import { sanitizeIamgeRef } from 'openland-y-utils/sanitizeImageRef';

class SettingsProfileComponent extends React.Component<NavigationInjectedProps, { firstName: string, lastName: string, loaded: boolean }> {
    private ref = React.createRef<ZForm>();

    static navigationOptions = (args: any) => ({
        title: 'Edit profile',
        headerRight: (
            <View style={{ marginRight: 10 }}>
                <Button
                    onPress={args.navigation.getParam('handleSave')}
                    title="Save"
                    color="#fff"
                />
            </View>
        ),
    })

    constructor(props: NavigationInjectedProps) {
        super(props);
        this.state = {
            loaded: false,
            firstName: '',
            lastName: ''
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleSave: this.handleSave });
    }

    handleSave = () => {
        if (this.ref.current) {
            this.ref.current!!.submitForm();
        }
    }

    handleAvatarChanged = (src: any) => {
        console.log(src);
        //
    }

    render() {
        return (
            <YMutation mutation={ProfileUpdateMutation} refetchQueries={[AccountQuery]}>
                {(save) => (
                    <ZQuery query={ProfileQuery} fetchPolicy="network-only">
                        {(resp) => (
                            <ZForm
                                action={async (args) => {
                                    await save({ variables: args });
                                }}
                                onSuccess={() => this.props.navigation.goBack()}
                                ref={this.ref}
                                defaultData={{
                                    input: {
                                        firstName: resp.data.profile!!.firstName,
                                        lastName: resp.data.profile!!.lastName,
                                        photoRef: sanitizeIamgeRef(resp.data.profile!!.photoRef),
                                        phone: resp.data.profile!!.phone,
                                        email: resp.data.profile!!.email,
                                        website: resp.data.profile!!.website,
                                        alphaLinkedin: resp.data.profile!!.linkedin
                                    }
                                }}
                            >
                                <ZListItemGroup>
                                    <ZListItemBase height={96} separator={false}>
                                        <View padding={15}>
                                            <ZAvatarPicker field="input.photoRef" />
                                        </View>
                                        <View flexDirection="column" flexGrow={1} flexBasis={0} paddingVertical={4}>
                                            <ZTextInput placeholder="First name" field="input.firstName" height={44} style={{ fontSize: 16 }} />
                                            <View height={1} alignSelf="stretch" backgroundColor={AppStyles.separatorColor} />
                                            <ZTextInput placeholder="Last name" field="input.lastName" height={44} style={{ fontSize: 16 }} />
                                        </View>
                                    </ZListItemBase>
                                </ZListItemGroup>
                                <ZListItemGroup header="Contacts">
                                    <ZListItemEdit title="Phone number" field="input.phone" />
                                    <ZListItemEdit title="Email" field="input.email" />
                                    <ZListItemEdit title="Web Site" field="input.website" />
                                    <ZListItemEdit title="Linkedin" field="input.alphaLinkedin" />
                                </ZListItemGroup>
                            </ZForm>
                        )}
                    </ZQuery>
                )}
            </YMutation>
        );
    }
}

export const SettingsProfile = withApp(SettingsProfileComponent);