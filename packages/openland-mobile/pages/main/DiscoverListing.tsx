import * as React from 'react';
import * as Types from '../../../openland-api/spacex.types';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SDeferred } from 'react-native-s/SDeferred';
import { SFlatList } from 'react-native-s/SFlatList';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { TouchableHighlight, View, Image, StyleSheet, ViewStyle } from 'react-native';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { joinPaidGroup } from './components/ChatJoin';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { normalizePopularItems, DiscoverRoom } from 'openland-y-utils/discover/normalizePopularItems';
import { DiscoverListItem } from './components/discover/DiscoverListItem';
import { AppStorage } from 'openland-mobile/utils/AppStorage';

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
    room: DiscoverRoom;
}

const FollowButton = React.memo((props: FollowButtonProps) => {
    let router = React.useContext(SRouterContext)!;
    const theme = useTheme();
    let [state, setState] = React.useState<FollowButtonState>(props.isFollowing ? 'done' : 'initial');
    let handleBtnPress = React.useCallback(async () => {
        if (props.room.isPremium && !props.room.premiumPassIsActive && props.room.premiumSettings) {
            joinPaidGroup({
                id: props.room.id,
                title: props.room.title,
                premiumSettings: props.room.premiumSettings,
                router,
                client: getClient(),
                onSuccess: () => { setState('done'); },
            });
        } else {
            setState('loading');
            await getClient().mutateRoomJoin({ roomId: props.room.id });
            setState('done');
        }

    }, [props.room]);
    const backgroundColor = state === 'done' ? theme.backgroundTertiaryTrans : theme.accentPrimary;
    const tintColor = state === 'done' ? theme.foregroundTertiary : theme.foregroundInverted;
    const underlayColor = state === 'done' ? theme.backgroundTertiaryActive : theme.accentPrimaryActive;
    React.useEffect(() => {
        setState(props.isFollowing ? 'done' : 'initial');
    }, [props.isFollowing]);

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

type ListingType = 'new' | 'popular' | 'top-free' | 'top-premium' | 'collections' | 'recommendations';

interface DiscoverListingContentProps {
    title: string;
    rooms: DiscoverRoom[];
    onEndReached?: () => void;
    loading?: boolean;
}

const DiscoverListingContent = React.memo((props: DiscoverListingContentProps) => {
    const [joinedChats, setJoinedChats] = React.useState(new Set<string>());
    const onJoin = React.useCallback((room: Types.Room_room_SharedRoom) => {
        setJoinedChats(prev => prev.add(room.id));
    }, []);
    return (
        <>
            <SHeader title={props.title} />
            <SDeferred>
                <SFlatList
                    data={props.rooms}
                    renderItem={({ item }) => (
                        <DiscoverListItem 
                            item={item} 
                            onJoin={onJoin}
                            rightElement={<FollowButton 
                                isFollowing={
                                    item.membership === Types.SharedRoomMembershipStatus.MEMBER || joinedChats.has(item.id)
                                }
                                room={item}
                            />} 
                        />
                    )}
                    keyExtractor={(item, index) => index + '-' + item.id}
                    onEndReached={props.onEndReached}
                    refreshing={props.loading}
                />
            </SDeferred>
        </>
    );
});

interface DiscoverListingPageProps {
    initialRooms: DiscoverRoom[];
    initialAfter: string;
}

export const getRandomSeed = (): number => {
    const token = AppStorage.token!;
    const tokenSymbols = token.split('');
    let sum = 0;

    tokenSymbols.forEach(symbol => {
        const charCode = symbol.charCodeAt(0);
        sum += charCode;
    });

    return sum;
};

const DiscoverNewListing = (props: DiscoverListingPageProps) => {
    const [rooms, setRooms] = React.useState(props.initialRooms);
    const [loading, setLoading] = React.useState(false);
    const [after, setAfter] = React.useState<string | null>(props.initialAfter);
    const first = 10;
    const seed = getRandomSeed();

    const loadMore = async () => {
        if (loading || (!after && rooms.length > 0)) {
            return;
        }
        setLoading(true);
        
        let {items, cursor} = (await getClient().queryDiscoverNewAndGrowing({ after, first, seed }, { fetchPolicy: 'network-only' })).discoverNewAndGrowing;
        
        if (items.length < first) {
            setAfter('');
        } else {
            setAfter(cursor);
        }

        setRooms([...rooms, ...items]);
        setLoading(false);
    };

    React.useEffect(() => {
        if (rooms.length === 0) {
            loadMore();
        } 
    }, []);

    return (
        <DiscoverListingContent 
            title="New and growing"
            rooms={rooms}
            loading={loading}
            onEndReached={loadMore}
        />
    );
};

const DiscoverPopularListing = (props: DiscoverListingPageProps) => {
    const [rooms, setRooms] = React.useState(props.initialRooms);
    const [loading, setLoading] = React.useState(false);
    const [after, setAfter] = React.useState<string | null>(props.initialAfter);
    const first = 10;

    const loadMore = async () => {
        if (loading || (!after && rooms.length > 0)) {
            return;
        }
        setLoading(true);
        
        let {items, cursor} = (await getClient().queryDiscoverPopularNow({ after, first }, { fetchPolicy: 'network-only' })).discoverPopularNow;
        
        if (items.length < first) {
            setAfter('');
        } else {
            setAfter(cursor);
        }

        setRooms([...rooms, ...normalizePopularItems(items)]);
        setLoading(false);
    };

    React.useEffect(() => {
        if (rooms.length === 0) {
            loadMore();
        } 
    }, []);

    return (
        <DiscoverListingContent 
            title="Popular now"
            rooms={rooms}
            loading={loading}
            onEndReached={loadMore}
        />
    );
};

const DiscoverTopFreeListing = (props: DiscoverListingPageProps) => {
    const [rooms, setRooms] = React.useState(props.initialRooms);
    const [loading, setLoading] = React.useState(false);
    const [after, setAfter] = React.useState<string | null>(props.initialAfter);
    const first = 10;

    const loadMore = async () => {
        if (loading || (!after && rooms.length > 0)) {
            return;
        }
        setLoading(true);
        
        let {items, cursor} = (await getClient().queryDiscoverTopFree({ after, first }, { fetchPolicy: 'network-only' })).discoverTopFree;
        
        if (items.length < first) {
            setAfter('');
        } else {
            setAfter(cursor);
        }

        setRooms([...rooms, ...items]);
        setLoading(false);
    };

    React.useEffect(() => {
        if (rooms.length === 0) {
            loadMore();
        } 
    }, []);

    return (
        <DiscoverListingContent 
            title="Top free"
            rooms={rooms}
            loading={loading}
            onEndReached={loadMore}
        />
    );
};

const DiscoverTopPremiumListing = (props: DiscoverListingPageProps) => {
    const [rooms, setRooms] = React.useState(props.initialRooms);
    const [loading, setLoading] = React.useState(false);
    const [after, setAfter] = React.useState<string | null>(props.initialAfter);
    const first = 10;

    const loadMore = async () => {
        if (loading || (!after && rooms.length > 0)) {
            return;
        }
        setLoading(true);
        
        let {items, cursor} = (await getClient().queryDiscoverTopPremium({ after, first }, { fetchPolicy: 'network-only' })).discoverTopPremium;
        
        if (items.length < first) {
            setAfter('');
        } else {
            setAfter(cursor);
        }

        setRooms([...rooms, ...items]);
        setLoading(false);
    };

    React.useEffect(() => {
        if (rooms.length === 0) {
            loadMore();
        } 
    }, []);

    return (
        <DiscoverListingContent 
            title="Top premium"
            rooms={rooms}
            loading={loading}
            onEndReached={loadMore}
        />
    );
};

interface DiscoverCollectionsListingProps {
    collectionId: string;
    title?: string;
}

const DiscoverCollectionsListing = (props: DiscoverCollectionsListingProps) => {
    const [rooms, setRooms] = React.useState<DiscoverRoom[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [title, setTitle] = React.useState(props.title || '');
    const loadCollections = async() => {
        setLoading(true);
        let res = (await getClient().queryDiscoverCollection({ id: props.collectionId }, {fetchPolicy: 'network-only'})).discoverCollection;
        if (res) {
            setTitle(res.title);
            setRooms(res.chats);
        }
        setLoading(false);
    };
    React.useEffect(() => {
        loadCollections();
    }, []);

    return (
        <DiscoverListingContent
            title={title}
            rooms={rooms}
            loading={loading}
        />
    );
};

const DiscoverRecommendationsListing = (props: {initialRooms: DiscoverRoom[]}) => {
    const [rooms, setRooms] = React.useState(props.initialRooms);
    const [loading, setLoading] = React.useState(false);
    const loadRooms = async() => {
        setLoading(true);
        let items = (await getClient().queryDiscoverSuggestedRooms({fetchPolicy: 'network-only'})).suggestedRooms.filter(x => x.__typename === 'SharedRoom');
        setRooms(items as DiscoverRoom[]);
        setLoading(false);
    };
    React.useEffect(() => {
        if (props.initialRooms.length === 0) {
            loadRooms();
        }
    }, []);

    return (
        <DiscoverListingContent
            title="Recommendations"
            rooms={rooms}
            loading={loading}
        />
    );
};

const DiscoverListingComponent = React.memo<PageProps>((props) => {
    let initialRooms = (props.router.params.initialRooms || []) as DiscoverRoom[];
    let type = props.router.params.type as ListingType;
    let initialAfter = props.router.params.after as string;
    let title = props.router.params.title as string;
    let collectionId = props.router.params.collectionId as string;

    if (type === 'new') {
        return <DiscoverNewListing initialAfter={initialAfter} initialRooms={initialRooms} />;
    } else if (type === 'popular') {
        return <DiscoverPopularListing initialAfter={initialAfter} initialRooms={initialRooms} />;
    } else if (type === 'top-free') {
        return <DiscoverTopFreeListing initialAfter={initialAfter} initialRooms={initialRooms} />;
    } else if (type === 'top-premium') {
        return <DiscoverTopPremiumListing initialAfter={initialAfter} initialRooms={initialRooms} />;
    } else if (type === 'collections') {
        return <DiscoverCollectionsListing collectionId={collectionId} title={title} />;
    } else if (type === 'recommendations') {
        return <DiscoverRecommendationsListing initialRooms={initialRooms} />;
    } else {
        return <DiscoverListingContent title={title} rooms={initialRooms} />;
    }
});

export const DiscoverListing = withApp(DiscoverListingComponent);