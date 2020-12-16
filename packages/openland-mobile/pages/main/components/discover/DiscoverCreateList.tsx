import * as React from 'react';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { View, ScrollView, Text, TouchableWithoutFeedback, Animated, Image } from 'react-native';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { usePressableView } from './usePressableView';
import { ZButton } from 'openland-mobile/components/ZButton';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

interface CreateItemProps {
    title: string;
    description: string;
    image: NodeRequire;
    buttonText: string;
    bgColor: string;
    theme: ThemeGlobal;
    onPress: () => void;
}

const CreateItem = (props: CreateItemProps) => {
    const { title, description, buttonText, image, bgColor, theme, onPress } = props;
    const { styles, delayPressIn, handlePressIn, handlePressOut } = usePressableView();

    return (
        <Animated.View style={{ width: 343, marginRight: 8, ...styles }}>
            <TouchableWithoutFeedback delayPressIn={delayPressIn} onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
                <View flexDirection="row" borderRadius={RadiusStyles.Large} padding={24} backgroundColor={bgColor}>
                    <View marginRight={8} flexGrow={1} flexShrink={1} flexDirection="column">
                        <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary, marginBottom: 8 }} allowFontScaling={false}>{title}</Text>
                        <Text style={{ ...TextStyles.Body, color: theme.foregroundPrimary, opacity: 0.72, marginBottom: 24, }} allowFontScaling={false}>
                            {description}
                        </Text>
                        <View alignSelf="flex-start">
                            <ZButton title={buttonText} onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} />
                        </View>
                    </View>
                    <Image source={image} style={{ width: 108, height: 108, alignSelf: 'flex-end' }} />
                </View>
            </TouchableWithoutFeedback>
        </Animated.View>
    );
};

export const DiscoverCreateList = () => {
    const router = React.useContext(SRouterContext)!;
    const theme = useTheme();

    return (
        <ZListGroup header="Create">
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} paddingLeft={16} paddingVertical={8} pagingEnabled={true} decelerationRate="fast" snapToInterval={351}>
                <CreateItem
                    title="Chat"
                    description="Public, secret, or paid group chat"
                    buttonText="New chat"
                    image={require('assets/art-create-chat.png')}
                    bgColor={theme.type === 'Light' ? '#E1EEF8' : '#453D3B'}
                    theme={theme}
                    onPress={() => router.push('CreateGroupAttrs')}
                />
                <CreateItem
                    title="Channel"
                    description="Only admins write, others comment"
                    buttonText="New channel"
                    image={require('assets/art-create-channel.png')}
                    bgColor={theme.type === 'Light' ? '#F4ECF5' : '#343746'}
                    theme={theme}
                    onPress={() => router.push('CreateGroupAttrs', { isChannel: true })}
                />
                <CreateItem
                    title="Community"
                    description="A hub for your chats and channels"
                    buttonText="New community"
                    image={require('assets/art-create-community.png')}
                    bgColor={theme.type === 'Light' ? '#F8F2E1' : '#453440'}
                    theme={theme}
                    onPress={() => router.push('NewOrganization', { isCommunity: true })}
                />
                <View width={24} />
            </ScrollView>
        </ZListGroup>
    );
};
