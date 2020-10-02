import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { useForm } from 'openland-form/useForm';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { CheckListBoxWraper } from '../../modals/UserMultiplePicker';
import Toast from 'openland-mobile/components/Toast';
import { EditPageHeader } from '../EditPageHeader';

enum CommunityType {
    COMMUNITY_PUBLIC = 'COMMUNITY_PUBLIC',
    COMMUNITY_PRIVATE = 'COMMUNITY_PRIVATE',
}

const EditGroupSuperAdminComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const organizationId = props.router.params.id;
    const client = getClient();
    const profile = getClient().useOrganizationProfile(
        { organizationId },
        { fetchPolicy: 'network-only' },
    ).organizationProfile;

    const initialFeatured = profile.featured ? 'true' : 'false';
    const isInitialPublic = profile.private
        ? CommunityType.COMMUNITY_PRIVATE
        : CommunityType.COMMUNITY_PUBLIC;
    const [isPublic, setIsPublic] = React.useState(isInitialPublic);
    const [isFeatured, setIsFeatured] = React.useState(initialFeatured);

    const form = useForm();

    const handleSave = () => {
        form.doAction(async () => {
            try {
                const variables = {
                    input: {
                        alphaIsPrivate: isPublic === CommunityType.COMMUNITY_PRIVATE,
                        alphaFeatured: isFeatured === 'true',
                    },
                    organizationId: organizationId,
                };
                await client.mutateUpdateOrganization(variables);
                await Promise.all([
                    client.refetchOrganization({ organizationId: organizationId }),
                    client.refetchOrganizationProfile({ organizationId: organizationId }),
                ]);
                Toast.success({ duration: 1000 }).show();
                props.router.back();
            } catch (e) {
                Toast.failure({ text: 'Something went wrong', duration: 1000 });
            }
        });
    };

    return (
        <>
            <SHeaderButton title="Save" onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <EditPageHeader
                    icon={require('assets/ic-lock-glyph-48.png')}
                    tint={theme.tintGrey}
                    title="Superadmin settings"
                    description="For Openland team only"
                />
                <ZListGroup header="Visibility">
                    <CheckListBoxWraper
                        isRadio={true}
                        checked={isPublic === CommunityType.COMMUNITY_PUBLIC}
                    >
                        <ZListItem
                            text="Public"
                            onPress={() => setIsPublic(CommunityType.COMMUNITY_PUBLIC)}
                        />
                    </CheckListBoxWraper>
                    <CheckListBoxWraper
                        isRadio={true}
                        checked={isPublic === CommunityType.COMMUNITY_PRIVATE}
                    >
                        <ZListItem
                            text="Private"
                            onPress={() => setIsPublic(CommunityType.COMMUNITY_PRIVATE)}
                        />
                    </CheckListBoxWraper>
                </ZListGroup>
                <ZListGroup header="Featured group">
                    <CheckListBoxWraper isRadio={true} checked={isFeatured === 'true'}>
                        <ZListItem text="Yes" onPress={() => setIsFeatured('true')} />
                    </CheckListBoxWraper>
                    <CheckListBoxWraper isRadio={true} checked={isFeatured === 'false'}>
                        <ZListItem text="No" onPress={() => setIsFeatured('false')} />
                    </CheckListBoxWraper>
                </ZListGroup>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const EditCommunitySuperAdmin = withApp(EditGroupSuperAdminComponent, {
    navigationAppearance: 'small',
});
