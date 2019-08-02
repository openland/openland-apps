import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { TextInput, StyleSheet, View } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { STrackedValue } from 'react-native-s/STrackedValue';
import { HeaderConfigRegistrator } from 'react-native-s/navigation/HeaderConfigRegistrator';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { TypeStyles } from 'openland-mobile/styles/AppStyles';
import { useForm } from 'openland-form/useForm';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { useField } from 'openland-form/useField';

const styles = StyleSheet.create({
    textarea: {
        textAlignVertical: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        ...TypeStyles.body,
    },
});

const CreatePostModal = (props: PageProps) => {
    const client = getClient();
    const theme = React.useContext(ThemeContext);
    const area = React.useContext(ASSafeAreaContext);
    const contentOffset = new STrackedValue();

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
            <HeaderConfigRegistrator config={{ contentOffset }} />
            
            <View style={{ paddingTop: area.top, paddingBottom: area.bottom }}>
                <TextInput
                    multiline
                    style={styles.textarea}
                    placeholder={'Write a post...'}
                    placeholderTextColor={theme.foregroundTertiary}
                    onChangeText={text => message.input.onChange(text)}
                    value={message.value}
                />
            </View>
        </>
    );
};

export const CreatePost = withApp(CreatePostModal, { navigationAppearance: 'small' });
