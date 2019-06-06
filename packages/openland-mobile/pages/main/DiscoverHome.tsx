import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { View, Text, Image, TextStyle } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';

const DiscoverHomeComponent = (props: PageProps) => {
    let theme = React.useContext(ThemeContext);

    return (
        <>
            <ASSafeAreaContext.Consumer>
                {sa => (
                    <View width="100%" height="100%" justifyContent="space-between" alignItems="center" paddingTop={sa.top} paddingBottom={sa.bottom}>
                        <Image marginTop={theme.blurType === 'light' ? -30 : 0} marginBottom={-25} source={theme.blurType === 'dark' ? require('assets/img-unsupported_dark.png') : require('assets/img-unsupported.png')} />
                        <View alignItems="center" justifyContent="center">
                            <Text style={{ fontSize: 30, color: theme.textColor, marginBottom: 10, fontWeight: TextStyles.weight.bold } as TextStyle}>Discover chats</Text>
                            <Text style={{ fontSize: 18, color: theme.textColor }}>Find the right chats for you</Text>
                        </View>

                        <ZRoundedButton size="large" title="Start" onPress={() => props.router.push("Discover")} />
                        <View />
                    </View>
                )}

            </ASSafeAreaContext.Consumer>
        </>
    )
}

export const DiscoverHome = withApp(DiscoverHomeComponent, { navigationAppearance: 'small', hideHairline: true });
