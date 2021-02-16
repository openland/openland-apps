import * as React from 'react';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import { withApp } from 'openland-mobile/components/withApp';
import { ZInput } from 'openland-mobile/components/ZInput';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { View, Text } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { showRoomView } from './RoomView';
import { useClient } from 'openland-api/useClient';
import { ZShaker } from 'openland-mobile/components/ZShaker';

const CreateRoomComponent = React.memo(() => {
    const form = useForm();
    const nameField = useField('room.name', '', form);
    const shakerRef = React.useRef<{ shake: () => void }>(null);
    const theme = useTheme();
    const client = useClient();
    const router = React.useContext(SRouterContext)!;
    // TODO add title validation
    const createRoom = React.useCallback(async () => {
        let name = nameField.value.trim();
        if (name.length <= 0) {
            shakerRef.current?.shake();
            return;
        }
        const room = (await client.mutateVoiceChatCreate({ input: { title: name } })).voiceChatCreate;
        router.pushAndReset('RoomsFeed');
        showRoomView(room, router);
    }, [router, nameField.value]);

    return (
        <>
            <SHeader title="New room" />
            <SHeaderButton title="Start" onPress={createRoom} />
            <KeyboardAvoidingScrollView>
                <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
                    <ZShaker ref={shakerRef}>
                        <ZInput placeholder="Room name" field={nameField} autoFocus={true} noWrapper={true} />
                    </ZShaker>
                    <Text style={{ ...TextStyles.Caption, color: theme.foregroundTertiary, paddingHorizontal: 16, marginTop: 8 }}>
                        Tell everyone about the topic of conversation
                    </Text>
                </View>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const CreateRoom = withApp(CreateRoomComponent, { navigationAppearance: 'small' });
