import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { useClient } from 'openland-mobile/utils/useClient';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { SUPER_ADMIN } from '../Init';
import { ZListItem } from 'openland-mobile/components/ZListItem';

const FeedChannelEditAdvancedComponent = React.memo((props: PageProps) => {
    const { router } = props;
    const { id } = router.params;
    const client = useClient();

    const channel = client.useFeedChannel({ id }, { fetchPolicy: 'network-only' }).channel;

    const form = useForm();
    const globalField = useField('global', channel.isGlobal, form);

    const handleSave = () => {
        form.doAction(async () => {
            await client.mutateFeedChannelUpdate({
                id,
                title: channel.title,

                ...SUPER_ADMIN && { global: globalField.value },
            });

            await client.refetchFeedChannel({ id });

            router.back();
        });
    };

    return (
        <>
            <SHeader title="Advanced settings" />
            <SHeaderButton title="Save" onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                {SUPER_ADMIN && (
                    <ZListGroup header="Superadmin" headerMarginTop={0}>
                        <ZListItem
                            text="Auto-subscribe all"
                            onToggle={globalField.input.onChange}
                            toggle={globalField.value}
                        />
                    </ZListGroup>
                )}
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const FeedChannelEditAdvanced = withApp(FeedChannelEditAdvancedComponent, { navigationAppearance: 'small' });
