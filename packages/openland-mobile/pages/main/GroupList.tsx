import * as React from 'react';
import * as Types from '../../../openland-api/spacex.types';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { SDeferred } from 'react-native-s/SDeferred';
import { SFlatList } from 'react-native-s/SFlatList';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { TouchableHighlight, View, Image, StyleSheet, ViewStyle } from 'react-native';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { joinPaidGroup } from './components/ChatJoin';

const styles = StyleSheet.create({
    btn: {
        width: 56,
        height: 36,
        borderRadius: RadiusStyles.Large,
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle
});

type FollowButtonState = 'can_follow' | 'loading' | 'done';
interface FollowButtonProps {
    isFollowing: boolean;
    action: () => Promise<any>;
}

const FollowButton = React.memo((props: FollowButtonProps) => {
    const theme = useTheme();
    let [state, setState] = React.useState<FollowButtonState>(props.isFollowing ? 'done' : 'can_follow');
    let handleBtnPress = React.useCallback(async () => {
        setState('loading');
        await props.action();
        setState('done');
    }, [props.action]);
    const backgroundColor = state === 'done' ? theme.backgroundTertiary : theme.accentPrimary;
    const tintColor = state === 'done' ? theme.foregroundTertiary : theme.foregroundInverted;
    const underlayColor = state === 'done' ? theme.backgroundTertiaryActive : theme.accentPrimaryActive;

    return (
        <TouchableHighlight
            style={[styles.btn, { backgroundColor }]}
            onPress={handleBtnPress}
            disabled={state === 'loading' || state === 'done'}
            underlayColor={underlayColor}
        >
            <View>
                {state === 'can_follow' && <Image source={require('assets/ic-add-24.png')} style={{ tintColor }} />}
                {state === 'loading' && <LoaderSpinner size="small" color={tintColor} />}
                {state === 'done' && <Image source={require('assets/ic-done-24.png')} style={{ tintColor }} />}
            </View>
        </TouchableHighlight>
    );
});

const GroupListComponent = React.memo<PageProps>((props) => {
    let initial = props.router.params.initial as Types.AvailableRooms_availableChats_edges_node[];
    let { query } = props.router.params;

    let [rooms, setRooms] = React.useState(initial);
    const [loading, setLoading] = React.useState(false);
    const [after, setAfter] = React.useState(props.router.params.after as string);
    let handleLoadMore = React.useCallback(async () => {
        if (!loading && !!after) {
            setLoading(true);
            let res = (await getClient().queryUserAvailableRooms({ after, first: 10, query }, { fetchPolicy: 'network-only' })).alphaUserAvailableRooms;
            let newAfter = res.edges[res.edges.length - 1].cursor;
            if (res.pageInfo.hasNextPage) {
                setAfter(newAfter);
            } else {
                setAfter('');
            }
            setRooms([...rooms, ...res.edges.map(x => x.node)]);
            setLoading(false);
        }

    }, [rooms, loading]);
    let action = async (room: Types.AvailableRooms_availableChats_edges_node) => {
        if (room.isPremium && !room.premiumPassIsActive) {
            joinPaidGroup({
                id: room.id,
                title: room.title,
                premiumSettings: room.premiumSettings!,
                router: props.router,
                client: getClient(),
            });
        } else {
            await getClient().mutateRoomJoin({ roomId: room.id });
        }
    };

    return (
        <>
            <SHeader title={props.router.params.title} />
            <SDeferred>
                <SFlatList
                    data={rooms}
                    renderItem={({ item }) => (
                        <ZListItem
                            key={item.id}
                            text={item.title}
                            leftAvatar={{
                                photo: item.photo,
                                id: item.id,
                                title: item.title,
                            }}
                            subTitle={item.membersCount + (item.membersCount === 1 ? ' member' : ' members')}
                            rightElement={<FollowButton 
                                isFollowing={item.membership === Types.SharedRoomMembershipStatus.MEMBER} 
                                action={() => action(item)} 
                            />}
                            path="Conversation"
                            pathParams={{ flexibleId: item.id }}
                        />
                    )}
                    keyExtractor={(item, index) => index + '-' + item.id}
                    onEndReached={handleLoadMore}
                    refreshing={loading}
                />
            </SDeferred>
        </>
    );
});

export const GroupList = withApp(GroupListComponent);