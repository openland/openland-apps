import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZForm } from '../../components/ZForm';
import { View } from 'react-native';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { SilentError } from 'openland-y-forms/errorHandling';
import { ZTextInput } from 'openland-mobile/components/ZTextInput';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ZAvatarPickerInputsGroup } from 'openland-mobile/components/ZAvatarPickerInputsGroup';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { trackEvent } from 'openland-mobile/analytics';

class NewOrganizationComponent extends React.PureComponent<PageProps> {
    private ref = React.createRef<ZForm>();
    render() {
        const isCommunity = this.props.router.params.isCommunity;
        const fromSignup = this.props.router.params.fromSignup;

        return (
            <ZTrack event={fromSignup ? 'signup_org_view' : 'new_org_view'}>
                <SHeader title={isCommunity ? 'New community' : 'New organization'} />
                <SHeaderButton title={isCommunity ? 'Create' : 'Next'} onPress={() => { this.ref.current!.submitForm(); }} />
                <ZForm
                    ref={this.ref}
                    action={async (src) => {
                        if (!src.input || (src.input && !src.input.name)) {
                            if (fromSignup) {
                                trackEvent('signup_org_error');
                            }

                            Alert.builder().title('Please enter a name for this ' + (isCommunity ? 'community' : 'organization')).button('GOT IT!').show();    

                            throw new SilentError();
                        }

                        let client = getClient();

                        let res = await client.mutateCreateOrganization({
                            input: {
                                name: '',
                                personal: false,
                                isCommunity: isCommunity,
                                ...src.input
                            },
                        });

                        await client.refetchAccount();
                        await client.refetchAccountSettings();

                        if (this.props.router.params.action) {
                            await this.props.router.params.action(this.props.router);
                        } else {
                            this.props.router.pushAndRemove('ProfileOrganization', { id: res.organization.id });
                        }
                    }}
                >
                    {!isCommunity && (
                        <>
                            <View alignSelf="center" marginTop={30} marginBottom={31}>
                                <ZAvatarPicker field="input.photoRef" />
                            </View>
                            <ZListItemGroup
                                divider={false}
                                footer="Please, provide organization name and optional logo"
                            >
                                <ZTextInput placeholder="Organization name" field="input.name" autoFocus={true} />
                            </ZListItemGroup>
                        </>
                    )}

                    {isCommunity && (
                        <>
                            <ZAvatarPickerInputsGroup avatarField="input.photoRef">
                                <ZTextInput placeholder="Community name" field="input.name" autoFocus={true} />
                            </ZAvatarPickerInputsGroup>
                            <View height={20} />
                            <ZTextInput placeholder="About" field="input.about" multiline={true} />
                        </>
                    )}
                </ZForm>
            </ZTrack>
        );
    }
}

export const NewOrganization = withApp(NewOrganizationComponent);