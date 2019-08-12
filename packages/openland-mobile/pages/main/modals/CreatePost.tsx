import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { TextInput, StyleSheet, ScrollView } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useForm } from 'openland-form/useForm';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { useField } from 'openland-form/useField';
import { SDevice } from 'react-native-s/SDevice';

const styles = StyleSheet.create({
    textarea: {
        textAlignVertical: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        ...TextStyles.Body,
    },
});

const CreatePostModal = (props: PageProps) => {
    const client = getClient();
    const theme = React.useContext(ThemeContext);
    const area = React.useContext(ASSafeAreaContext);

    const form = useForm();
    const message = useField('messsage', '', form);

    const handlePost = () => {
        if (message.value === '') {
            return;
        }

        form.doAction(async () => {
            try {
                await client.mutateGlobalFeedPost({
                    message: message.value
                });

                await client.refetchGlobalFeedHome();

                props.router.back();
            } catch (error) {
                console.warn(error);
            }
        });
    };

    return (
        <>
            <SHeader title="New post" />
            <SHeaderButton title={'Post'}  onPress={handlePost} />
            <ScrollView flexGrow={1} flexShrink={1} keyboardDismissMode="interactive" keyboardShouldPersistTaps="always" contentContainerStyle={{ paddingTop: area.top, paddingBottom: (area.bottom - SDevice.safeArea.bottom <= 0) ? 80 : area.bottom - SDevice.safeArea.bottom }} scrollIndicatorInsets={{ top: area.top, bottom: (area.bottom - SDevice.safeArea.bottom <= 0) ? 80 : area.bottom - SDevice.safeArea.bottom }}>
                <TextInput
                    multiline
                    // autoFocus
                    style={styles.textarea}
                    placeholder={'Write a post...'}
                    placeholderTextColor={theme.foregroundTertiary}
                    onChangeText={text => message.input.onChange(text)}
                    value={message.value}
                />
            </ScrollView>
            {/* <ZKeyboardAwareBar>
                <View style={{ backgroundColor: '#000', width: 100, height: 40 }} />
            </ZKeyboardAwareBar> */}
        </>
    );
};

export const CreatePost = withApp(CreatePostModal, { navigationAppearance: 'small' });
