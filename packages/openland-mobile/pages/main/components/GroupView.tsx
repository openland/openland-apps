import * as React from 'react';
import { SharedRoomView } from 'openland-api/spacex.types';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { View, Text, Image } from 'react-native';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useText } from 'openland-mobile/text/useText';

interface GroupViewProps {
    item: Omit<SharedRoomView, 'photo'>;
    photo?: string;
    paddingRight?: number;
    onPress: (id: string) => void;
    onLongPress?: () => void;
}

export const GroupView = React.memo<GroupViewProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { t } = useText();
    const { item, photo, paddingRight, onPress, onLongPress } = props;
    const membersCount = item.membersCount || 0;

    const handlePress = React.useCallback(() => {
        onPress(item.id);
    }, [item.id, onPress]);

    return (
        <ZListItemBase height={52} onPress={handlePress} onLongPress={onLongPress} separator={false}>
            <View style={{ marginHorizontal: 16, height: 52, alignItems: 'center', justifyContent: 'center' }}>
                <ZAvatar
                    photo={photo}
                    size="medium"
                    id={item.id}
                    title={item.title}
                />
            </View>
            <View style={{ paddingRight: paddingRight || 10, flexDirection: 'column', flexGrow: 1, flexBasis: 0, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            ...TextStyles.Label1,
                            color: theme.foregroundPrimary,
                        }}
                        allowFontScaling={false}
                    >
                        {item.title}
                    </Text>
                    {item.featured && theme.displayFeaturedIcon && (
                        <Image
                            source={require('assets/ic-verified-16.png')}
                            style={{ tintColor: '#3DA7F2', width: 16, height: 16, flexShrink: 0, marginLeft: 4, marginTop: 2, alignSelf: 'center' }}
                        />
                    )}
                </View>
                <Text
                    numberOfLines={1}
                    style={{
                        ...TextStyles.Subhead,
                        color: theme.foregroundTertiary,
                    }}
                    allowFontScaling={false}
                >
                    {membersCount} {t('member', { count: membersCount })}
                </Text>
            </View>
        </ZListItemBase>
    );
});