import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { View, Text, Image, TextStyle } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';

const DiscoverHomeComponent = (props: PageProps) => {
    let theme = React.useContext(ThemeContext);

    return (
        <>
            <View width="100%" justifyContent="center" alignItems="center" marginTop={theme.blurType === 'dark' ? 40 : 55}>
                <Image source={theme.blurType === 'dark' ? require('assets/img-unsupported_dark.png') : require('assets/img-unsupported.png')} />
                <Text style={{ fontSize: 30, color: theme.textColor, marginBottom: 10, marginTop: 44, fontWeight: TextStyles.weight.bold } as TextStyle}>Discover chats</Text>
                <Text style={{ fontSize: 18, color: theme.textColor }}>Find the right chats for you</Text>
                <View marginTop={70}>
                    <ZRoundedButton size="large" title="Start" onPress={() => props.router.push("Discover")} />
                </View>
            </View>
        </>
    )
}

export const DiscoverHome = withApp(DiscoverHomeComponent, { navigationAppearance: 'small', hideHairline: true });
