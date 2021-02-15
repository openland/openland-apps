import { withApp } from 'openland-mobile/components/withApp';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import * as React from 'react';
import { Image, Text, View } from 'react-native';
// import { SFlatList } from 'react-native-s/SFlatList';
import { SHeader } from 'react-native-s/SHeader';

const EmptyView = React.memo(() => {
    const theme = useTheme();
    return (
        <View
            style={{
                flexGrow: 1,
                paddingHorizontal: 32,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Image
                source={require('assets/art-empty.png')}
                style={{ width: 240, height: 150, marginBottom: 4 }}
            />
            <Text
                allowFontScaling={false}
                style={{
                    ...TextStyles.Title2,
                    color: theme.foregroundPrimary,
                    textAlign: 'center',
                    marginBottom: 6,
                }}
            >
                All quiet
            </Text>
            <Text
                allowFontScaling={false}
                style={{
                    ...TextStyles.Body,
                    color: theme.foregroundSecondary,
                    textAlign: 'center',
                }}
            >
                Noone raised their hand
            </Text>
        </View>
    );
});

const RaisedHandsComponent = React.memo(() => {
    const data: [] = [];
    return (
        <>
            <SHeader title="Raised hands" />
            {data.length <= 0 ? (
                <EmptyView />
            ) : null}
            {/* <SFlatList
                data={data}
                renderItem={({ item }) => (
                    <DiscoverListItem
                        item={item}
                        onJoin={onJoin}
                        rightElement={(
                            <FollowButton
                                isFollowing={
                                    item.membership === Types.SharedRoomMembershipStatus.MEMBER || joinedChats.has(item.id)
                                }
                                room={item}
                            />
                        )}
                    />
                )}
                keyExtractor={(item, index) => index + '-' + item.id}
                onEndReached={props.onEndReached}
                ListHeaderComponent={props.beforeContent}
                refreshing={props.loading}
            /> */}
        </>
    );
});

export const RaisedHands = withApp(RaisedHandsComponent, { navigationAppearance: 'large' });
