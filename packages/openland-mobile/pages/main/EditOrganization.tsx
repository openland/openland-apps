import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZForm } from '../../components/ZForm';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemBase } from '../../components/ZListItemBase';
import { View, Text } from 'react-native';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { ZTextInput } from '../../components/ZTextInput';
import { AppStyles } from '../../styles/AppStyles';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { YMutation } from 'openland-y-graphql/YMutation';
import { CreateOrganizationMutation, UpdateOrganizationMutation, OrganizationProfileQuery, ProfileQuery, AccountSettingsQuery } from 'openland-api';
import { ZQuery } from '../../components/ZQuery';
import { sanitizeIamgeRef } from 'openland-y-utils/sanitizeImageRef';

class EditOrganizationComponent extends React.PureComponent<PageProps> {
    private ref = React.createRef<ZForm>();
    render() {
        return (
            <>
                <SHeader title="Edit organization" />
                <SHeaderButton title="Save" onPress={() => { this.ref.current!.submitForm(); }} />
                <YMutation mutation={UpdateOrganizationMutation} refetchQueries={[AccountSettingsQuery]}>
                    {save => (
                        <ZQuery
                            query={OrganizationProfileQuery}
                            variables={{ organizationId: this.props.router.params.id }}
                        >
                            {(resp) => {
                                return (
                                    <ZForm
                                        ref={this.ref}
                                        action={(src) => { return save({ variables: src }); }}
                                        defaultData={{
                                            input: {
                                                name: resp.data!!.organizationProfile.name,
                                                photoRef: sanitizeIamgeRef(resp.data!!.organizationProfile.photoRef),
                                            }
                                        }}
                                        staticData={{
                                            organizationId: this.props.router.params.id
                                        }}
                                        onSuccess={() => { this.props.router.back(); }}
                                    >
                                        <View>
                                            <View alignSelf="center" marginTop={30} marginBottom={10}>
                                                <ZAvatarPicker field="input.photoRef" />
                                            </View>
                                            <ZTextInput marginLeft={16} marginTop={21} placeholder="Organization name" field="input.name" height={44} style={{ fontSize: 16 }} />
                                            <View marginLeft={16} height={1} alignSelf="stretch" backgroundColor={AppStyles.separatorColor} />
                                        </View>

                                    </ZForm>
                                );
                            }}
                        </ZQuery>
                    )}
                </YMutation>
            </>
        );
    }
}
export const EditOrganization = withApp(EditOrganizationComponent);