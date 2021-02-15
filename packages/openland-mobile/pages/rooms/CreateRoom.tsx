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

const CreateRoomComponent = React.memo(() => {
    const form = useForm();
    const nameField = useField('room.name', '', form);
    const theme = useTheme();

    return (
        <>
            <SHeader title="New room" />
            <SHeaderButton title="Start" onPress={() => {/* redirect to room */ }} />
            <KeyboardAvoidingScrollView>
                <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
                    <ZInput placeholder="Room name" field={nameField} autoFocus={true} noWrapper={true} />
                    <Text style={{ ...TextStyles.Caption, color: theme.foregroundTertiary, paddingHorizontal: 16, marginTop: 8 }}>
                        Tell everyone about the topic of conversation
                    </Text>
                </View>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const CreateRoom = withApp(CreateRoomComponent, { navigationAppearance: 'small' });
