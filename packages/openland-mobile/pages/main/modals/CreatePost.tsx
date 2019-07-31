import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { STrackedValue } from 'react-native-s/STrackedValue';
import { HeaderConfigRegistrator } from 'react-native-s/navigation/HeaderConfigRegistrator';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { TypeStyles } from 'openland-mobile/styles/AppStyles';

const styles = StyleSheet.create({
    textarea: {
        textAlignVertical: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        ...TypeStyles.body,
    },
});

const CreatePostModal = (props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const area = React.useContext(ASSafeAreaContext);
    const contentOffset = new STrackedValue();

    return (
        <>
            <SHeader title="New post" />
            <SHeaderButton title={'Post'} />
            <HeaderConfigRegistrator config={{ contentOffset }} />
            
            <View style={{ paddingTop: area.top, paddingBottom: area.bottom }}>
                <TextInput
                    multiline
                    style={styles.textarea}
                    placeholder={'Write a post...'}
                    placeholderTextColor={theme.foregroundTertiary}
                />
            </View>
        </>
    );
};

export const CreatePost = withApp(CreatePostModal, { navigationAppearance: 'small' });
