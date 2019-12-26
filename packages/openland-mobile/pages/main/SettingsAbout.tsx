import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { View, Text, StyleSheet } from 'react-native';
// import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZLinearGradient } from 'openland-mobile/components/visual/ZLinearGradient.native';

const styles = StyleSheet.create({
    // image: {
    //     width: 240,
    //     height: 150,
    //     resizeMode: 'cover'
    // } as ImageStyle,
    // title: {
    //     ...TextStyles.Title2,
    //     marginTop: 16,
    //     textAlign: 'center'
    // } as TextStyle,
    // subtitle: {
    //     ...TextStyles.Body,
    //     marginTop: 8,
    //     marginBottom: 24,
    //     textAlign: 'center'
    // } as TextStyle
    hero: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 242
    }
});

const SettingsAboutComponent = React.memo<PageProps>((props) => {
    // const theme = React.useContext(ThemeContext);

    return (
        <SScrollView>
            <ZLinearGradient colors={['rgba(242, 243, 245, 0)', '#F2F3F5']} fallbackColor="#F2F3F5" start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                <View style={styles.hero}>
                    <Text>Hello!</Text>
                </View>
            </ZLinearGradient>

        </SScrollView>
    );
});

export const SettingsAbout = withApp(SettingsAboutComponent);