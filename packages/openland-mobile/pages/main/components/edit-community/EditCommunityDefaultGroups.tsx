import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { SScrollView } from 'react-native-s/SScrollView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { EditPageHeader } from '../EditPageHeader';
import { useText } from 'openland-mobile/text/useText';

const EditCommunityDefaultGroupsComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const client = getClient();
    const { t } = useText();
    const organizationId = props.router.params.id;
    const profile = getClient().useOrganizationProfile({ organizationId }, { fetchPolicy: 'network-only' }).organizationProfile;
    const publicRooms = client.useOrganizationPublicRooms({ organizationId, first: 100 }, { fetchPolicy: 'network-only' }).organizationPublicRooms;

    const form = useForm();
    const autosubscribeRoomsField = useField('applyLink', profile.autosubscribeRooms, form);

    const handleSave = () =>
        form.doAction(async () => {
            try {
                await client.mutateUpdateOrganization({
                    organizationId,
                    input: {
                        autosubscribeRooms: autosubscribeRoomsField.value,
                    }
                });
                await client.refetchOrganization({ organizationId });
                await client.refetchOrganizationProfile({ organizationId });

                props.router.back();
            } catch (e) {
                console.warn('error', e);
                props.router.back();
            }
        });

    return (
        <>
            <SHeaderButton title={t('save', 'Save')} onPress={handleSave} />
            <SScrollView>
                <EditPageHeader
                    icon={require('assets/ic-group-glyph-48.png')}
                    tint={theme.tintCyan}
                    title={t('defaultGroups', 'Default groups')}
                    description={t('defaultGroupsDescription', 'Select groups that will be automatically joined by all new community members')}
                />
                <ZListGroup header={null}>
                    {publicRooms.items.map((group) => (
                        <ZListItem
                            key={group.id}
                            text={group.title}
                            leftAvatar={{
                                photo: group.photo,
                                id: group.id,
                            }}
                            checkmark={autosubscribeRoomsField.value.includes(group.id)}
                            checkmarkType="checkbox"
                            onPress={() => {
                                if (autosubscribeRoomsField.value.indexOf(group.id) !== -1) {
                                    autosubscribeRoomsField.input.onChange(autosubscribeRoomsField.value.filter(r => r !== group.id));
                                } else {
                                    autosubscribeRoomsField.input.onChange([...autosubscribeRoomsField.value, group.id]);
                                }
                            }}
                        />
                    ))}
                </ZListGroup>
            </SScrollView>
        </>
    );
});

export const EditCommunityDefaultGroups = withApp(EditCommunityDefaultGroupsComponent, {
    navigationAppearance: 'small',
});
