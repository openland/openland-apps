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
import { SRouter } from 'react-native-s/SRouter';

const styles = StyleSheet.create({
    btn: {
        width: 56,
        height: 36,
        borderRadius: RadiusStyles.Large,
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle
});

type FollowButtonState = 'initial' | 'loading' | 'done';
interface FollowButtonProps {
    isFollowing: boolean;
    room: Types.DiscoverSharedRoom;
    router: SRouter;
}

const FollowButton = React.memo((props: FollowButtonProps) => {
    const theme = useTheme();
    let [state, setState] = React.useState<FollowButtonState>(props.isFollowing ? 'done' : 'initial');
    let handleBtnPress = React.useCallback(async () => {
        if (props.room.isPremium && !props.room.premiumPassIsActive && props.room.premiumSettings) {
            joinPaidGroup({
                id: props.room.id,
                title: props.room.title,
                premiumSettings: props.room.premiumSettings,
                router: props.router,
                client: getClient(),
                onSuccess: () => { setState('done'); },
            });
        } else {
            setState('loading');
            await getClient().mutateRoomJoin({ roomId: props.room.id });
            setState('done');
        }

    }, [props.room]);
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
                {state === 'initial' && <Image source={require('assets/ic-add-24.png')} style={{ tintColor }} />}
                {state === 'loading' && <LoaderSpinner size="small" color={tintColor} />}
                {state === 'done' && <Image source={require('assets/ic-done-24.png')} style={{ tintColor }} />}
            </View>
        </TouchableHighlight>
    );
});

type ListingType = 'new' | 'popular' | 'top-free' | 'top-premium' | 'collections';
interface UseFetchMoreRoomsArgs {
    first: number;
    initialAfter: string;
    seed: number;
    type: ListingType;
    initialRooms: Types.DiscoverSharedRoom[];
}
type UseFetchMoreRoomsReturned = [Types.DiscoverSharedRoom[], boolean, () => void];
const useFetchMoreRooms = ({first, type, seed, initialAfter, initialRooms}: UseFetchMoreRoomsArgs): UseFetchMoreRoomsReturned => {
    const [rooms, setRooms] = React.useState(initialRooms);
    const [loading, setLoading] = React.useState(false);
    const [after, setAfter] = React.useState<string | null>(initialAfter);

    const loadMore = async () => {
        if (type === 'collections') {
            return;
        }
        if (!loading && !!after) {
            setLoading(true);
            let items: Types.DiscoverSharedRoom[] = [], cursor: string | null = null;
            if (type === 'new') {
                let res = (await getClient().queryDiscoverNewAndGrowing({ after, seed, first }, { fetchPolicy: 'network-only' })).discoverNewAndGrowing;
                items = res.items;
                cursor = res.cursor;
            } else if (type === 'popular') {
                let res = (await getClient().queryDiscoverPopularNow({ after, first }, { fetchPolicy: 'network-only' })).discoverPopularNow;
                items = res.items;
                cursor = res.cursor;
            } else if (type === 'top-free') {
                let res = (await getClient().queryDiscoverTopFree({ after, first }, { fetchPolicy: 'network-only' })).discoverTopFree;
                items = res.items;
                cursor = res.cursor;
            } else if (type === 'top-premium') {
                let res = (await getClient().queryDiscoverTopPremium({ after, first }, { fetchPolicy: 'network-only' })).discoverTopPremium;
                items = res.items;
                cursor = res.cursor;
            }
            
            if (items.length < first) {
                setAfter('');
            } else {
                setAfter(cursor);
            }

            setRooms([...rooms, ...items]);
            setLoading(false);
        }
    };

    return [rooms, loading, loadMore];
};

const DiscoverListingComponent = React.memo<PageProps>((props) => {
    let initialRooms = props.router.params.initialRooms as Types.DiscoverSharedRoom[];
    let type = props.router.params.type as ListingType;
    let initialAfter = props.router.params.after as string;
    let seed = props.router.params.seed as number;

    const [rooms, loading, handleLoadMore] = useFetchMoreRooms({first: 10, type, seed, initialAfter, initialRooms });

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
                                room={item}
                                router={props.router}
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

export const DiscoverListing = withApp(DiscoverListingComponent);