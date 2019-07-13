import * as React from 'react';
import { View } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ZAvatar, avatarSizes, ZAvatarSize } from 'openland-mobile/components/ZAvatar';

const mock1 = {
    src: 'https://ucarecdn.com/ce2508ab-8048-4e28-a1aa-8c2d64fdf3c7/-/crop/708x708/89,0/-/format/jpeg/-/scale_crop/80x80/center/-/quality/lighter/-/progressive/yes/',
    placeholderKey: '1',
    placeholderTitle: 'A'
};

const mock2 = {
    placeholderKey: '1',
    placeholderTitle: 'A'
};

export const AvatarsComponent = (props: PageProps) => {
    const variants: JSX.Element[] = [];

    Object.keys(avatarSizes).forEach((size: ZAvatarSize) => {
        variants.push(
            <View flexDirection="row" flexWrap="wrap" marginHorizontal={16}>
                <View marginVertical={10} marginRight={10}>
                    <ZAvatar size={size} {...mock1} />
                </View>
                <View marginVertical={10} marginRight={10}>
                    <ZAvatar size={size} {...mock1} online={true} />
                </View>
                <View marginVertical={10} marginRight={10}>
                    <ZAvatar size={size} {...mock2} />
                </View>
                <View marginVertical={10}>
                    <ZAvatar size={size} {...mock2} online={true} />
                </View>
            </View>
        );
    });

    return (
        <SScrollView>
            {variants}
        </SScrollView>
    );
};

export const Avatars = withApp(AvatarsComponent, { navigationAppearance: 'small-hidden' });