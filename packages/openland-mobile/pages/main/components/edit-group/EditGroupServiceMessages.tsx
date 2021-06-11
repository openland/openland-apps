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
import Toast from 'openland-mobile/components/Toast';
import { EditPageHeader } from '../EditPageHeader';
import { useText } from 'openland-mobile/text/useText';

const EditGroupServiceMessagesComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const { t } = useText();
    const roomId = props.router.params.id;
    const client = getClient();
    const group = client.useRoomChat({ id: roomId }).room;

    if (!group || group.__typename === 'PrivateRoom') {
        return null;
    }

    const [joinsEnabled, setJoinsEnabled] = React.useState(group.serviceMessageSettings.joinsMessageEnabled);
    const [leavesEnabled, setLeavesEnabled] = React.useState(group.serviceMessageSettings.leavesMessageEnabled);

    const form = useForm();

    const handleSave = () =>
        form.doAction(async () => {
            try {
                let variables = {
                    roomId,
                    input: {
                        serviceMessageSettings: {
                            joinsMessageEnabled: joinsEnabled,
                            leavesMessageEnabled: leavesEnabled,
                        }
                    }
                };
                await client.mutateRoomUpdate(variables);
                await client.refetchRoomChat({ id: roomId });
                Toast.success({ duration: 1000 }).show();
                props.router.back();
            } catch (e) {
                Toast.failure({ text: t('errorAbstract', 'Something went wrong'), duration: 1000 });
            }
        });

    return (
        <>
            <SHeaderButton title="Save" onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <EditPageHeader
                    icon={require('assets/ic-megaphone-glyph-48.png')}
                    tint={theme.tintPink}
                    title="Service messages"
                    description="Choose what messages to get"
                />
                <ZListGroup header={null}>
                    <ZListItem
                        text="New member joins"
                        toggle={joinsEnabled}
                        onToggle={(value) => setJoinsEnabled(value)}
                    />
                    <ZListItem
                        text="Member leaves"
                        toggle={leavesEnabled}
                        onToggle={(value) => setLeavesEnabled(value)}
                    />
                </ZListGroup>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const EditGroupServiceMessages = withApp(EditGroupServiceMessagesComponent, {
    navigationAppearance: 'small',
});
