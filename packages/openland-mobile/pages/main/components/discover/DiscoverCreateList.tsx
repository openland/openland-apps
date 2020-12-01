import * as React from 'react';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { View, ScrollView, Text, TouchableWithoutFeedback, Animated, Image } from 'react-native';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { usePressableView } from './usePressableView';
import { ZButton } from 'openland-mobile/components/ZButton';

interface CreateItemProps {
    title: string;
    description: string;
    image: NodeRequire;
    buttonText: string;
    bgColor: string;
    onPress: () => void;
}

const CreateItem = (props: CreateItemProps) => {
    const { title, description, buttonText, image, bgColor, onPress } = props;
    const { styles, delayPressIn, handlePressIn, handlePressOut } = usePressableView();

    return (
        <Animated.View style={{ width: 343, marginRight: 8, ...styles }}>
            <TouchableWithoutFeedback delayPressIn={delayPressIn} onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
                <View flexDirection="row" borderRadius={RadiusStyles.Large} padding={24} backgroundColor={bgColor}>
                    <View marginRight={8} flexGrow={1} flexShrink={1} flexDirection="column">
                        <Text style={{ ...TextStyles.Title2, color: '#000', marginBottom: 8 }} allowFontScaling={false}>{title}</Text>
                        <Text style={{ ...TextStyles.Body, color: '#000', opacity: 0.75, marginBottom: 24, }} allowFontScaling={false}>
                            {description}
                        </Text>
                        <ZButton title={buttonText} onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} />
                    </View>
                    <Image source={image} style={{ width: 108, height: 108, alignSelf: 'flex-end' }} />
                </View>
            </TouchableWithoutFeedback>
        </Animated.View>
    );
};

export const DiscoverCreateList = () => {
    const router = React.useContext(SRouterContext)!;

    return (
        <ZListGroup header="Create">
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} paddingLeft={16} paddingBottom={8} pagingEnabled={true} decelerationRate="fast" snapToInterval={351}>
                <CreateItem
                    title="Community"
                    description="A hub for your chats and channels"
                    buttonText="New community"
                    image={require('assets/art-create-community.png')}
                    bgColor="#F4ECF5"
                    onPress={() => router.push('NewOrganization', { isCommunity: true })}
                />
                <CreateItem
                    title="Chat"
                    description="Public, secret, or paid group chat"
                    buttonText="New chat"
                    image={require('assets/art-create-chat.png')}
                    bgColor="#F8F2E1"
                    onPress={() => router.push('CreateGroupAttrs')}
                />
                <CreateItem
                    title="Channel"
                    description="Only admins write, others comment"
                    buttonText="New channel"
                    image={require('assets/art-create-channel.png')}
                    bgColor="#E1EEF8"
                    onPress={() => router.push('CreateGroupAttrs', { isChannel: true })}
                />
                <View width={24} />
            </ScrollView>
        </ZListGroup>
    );
};
