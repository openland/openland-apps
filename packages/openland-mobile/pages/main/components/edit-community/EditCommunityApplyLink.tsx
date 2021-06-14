import * as React from 'react';
import { View } from 'react-native';
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
import { ZInput } from 'openland-mobile/components/ZInput';
import { EditPageHeader } from '../EditPageHeader';
import { useText } from 'openland-mobile/text/useText';

const EditCommunityApplyLinkComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const client = getClient();
    const { t } = useText();
    const organizationId = props.router.params.id;
    const organization = getClient().useOrganization({ organizationId }, { fetchPolicy: 'network-only' }).organization;

    if (!organization.private) {
        return null;
    }

    const form = useForm();

    const applyLinkEnabledField = useField('applyLinkEnabled', organization.applyLinkEnabled, form);
    const applyLinkField = useField('applyLink', organization.applyLink || '', form);

    const handleSave = () =>
        form.doAction(async () => {
            try {
                await client.mutateUpdateOrganization({
                    organizationId,
                    input: {
                        applyLinkEnabled: applyLinkEnabledField.value,
                        applyLink: applyLinkField.value,
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
                    icon={require('assets/ic-link-glyph-48.png')}
                    tint={theme.tintPink}
                    title={t('applyLink', 'Apply link')}
                    description={t('applyLinkDescription', 'A link to application form or info')}
                />
                <ZListGroup header={null}>
                    <ZListItem
                        text={t('applyLinkUse', 'Use apply link')}
                        toggle={applyLinkEnabledField.value}
                        onToggle={applyLinkEnabledField.input.onChange}
                        small={true}
                    />
                    <View style={{ height: 16 }} />
                    {applyLinkEnabledField.value && (
                        <ZInput
                            placeholder={t('applyLink', 'Apply link')}
                            field={applyLinkField}
                        />
                    )}
                </ZListGroup>
            </SScrollView>
        </>
    );
});

export const EditCommunityApplyLink = withApp(EditCommunityApplyLinkComponent, {
    navigationAppearance: 'small',
});
