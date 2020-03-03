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
import { SRouterContext } from 'react-native-s/SRouterContext';

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
    const backgroundColor = state === 'done' ? theme.backgroundTertiaryTrans : theme.accentPrimary;
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

interface DiscoverListingContentProps {
    rooms: Types.DiscoverSharedRoom[];
    onEndReached: () => void;
    loading: boolean;
}

const DiscoverListingContent = (props: DiscoverListingContentProps) => {
    let router = React.useContext(SRouterContext)!;
    return (
        <>
            <SHeader title={router.params.title} />
            <SDeferred>
                <SFlatList
                    data={props.rooms}
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
                                router={router}
                            />}
                            path="Conversation"
                            pathParams={{ flexibleId: item.id }}
                        />
                    )}
                    keyExtractor={(item, index) => index + '-' + item.id}
                    onEndReached={props.onEndReached}
                    refreshing={props.loading}
                />
            </SDeferred>
        </>
    );
};

interface DiscoverListingPageProps {
    initialRooms: Types.DiscoverSharedRoom[];
    initialAfter: string;
}

interface DiscoverNewListingPageProps extends DiscoverListingPageProps {
    seed: number;
}

const DiscoverNewListing = (props: DiscoverNewListingPageProps) => {
    const [rooms, setRooms] = React.useState(props.initialRooms);
    const [loading, setLoading] = React.useState(false);
    const [after, setAfter] = React.useState<string | null>(props.initialAfter);
    const first = 10;

    const loadMore = async () => {
        if (!loading && !!after) {
            setLoading(true);
            
            let {items, cursor} = (await getClient().queryDiscoverNewAndGrowing({ after, seed: props.seed, first }, { fetchPolicy: 'network-only' })).discoverNewAndGrowing;
            
            if (items.length < first) {
                setAfter('');
            } else {
                setAfter(cursor);
            }

            setRooms([...rooms, ...items]);
            setLoading(false);
        }
    };

    return (
        <DiscoverListingContent 
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
        if (!loading && !!after) {
            setLoading(true);
            
            let {items, cursor} = (await getClient().queryDiscoverPopularNow({ after, first }, { fetchPolicy: 'network-only' })).discoverPopularNow;
            
            if (items.length < first) {
                setAfter('');
            } else {
                setAfter(cursor);
            }

            setRooms([...rooms, ...items]);
            setLoading(false);
        }
    };

    return (
        <DiscoverListingContent 
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
        if (!loading && !!after) {
            setLoading(true);
            
            let {items, cursor} = (await getClient().queryDiscoverTopFree({ after, first }, { fetchPolicy: 'network-only' })).discoverTopFree;
            
            if (items.length < first) {
                setAfter('');
            } else {
                setAfter(cursor);
            }

            setRooms([...rooms, ...items]);
            setLoading(false);
        }
    };

    return (
        <DiscoverListingContent 
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
        if (!loading && !!after) {
            setLoading(true);
            
            let {items, cursor} = (await getClient().queryDiscoverTopPremium({ after, first }, { fetchPolicy: 'network-only' })).discoverTopPremium;
            
            if (items.length < first) {
                setAfter('');
            } else {
                setAfter(cursor);
            }

            setRooms([...rooms, ...items]);
            setLoading(false);
        }
    };

    return (
        <DiscoverListingContent 
            rooms={rooms}
            loading={loading}
            onEndReached={loadMore}
        />
    );
};

interface DiscoverCollectionsListingProps {
    collectionId: string;
}

const DiscoverCollectionsListing = (props: DiscoverCollectionsListingProps) => {
    const [rooms, setRooms] = React.useState<Types.DiscoverSharedRoom[]>([]);
    const [loading, setLoading] = React.useState(false);
    const loadCollections = async() => {
        setLoading(true);
        let res = (await getClient().queryDiscoverCollection({ id: props.collectionId })).discoverCollection;
        let items = res && res.chats || [];
        setRooms(items);
        setLoading(false);
    };
    React.useEffect(() => {
        loadCollections();
    }, []);
    const loadMore = () => {/* noop */};

    return (
        <DiscoverListingContent 
            rooms={rooms}
            loading={loading}
            onEndReached={loadMore}
        />
    );
};

const DiscoverListingComponent = React.memo<PageProps>((props) => {
    let initialRooms = props.router.params.initialRooms as Types.DiscoverSharedRoom[];
    let type = props.router.params.type as ListingType;
    let initialAfter = props.router.params.after as string;
    let seed = props.router.params.seed as number;
    let collectionId = props.router.params.collectionId as string;

    if (type === 'new') {
        return <DiscoverNewListing seed={seed} initialAfter={initialAfter} initialRooms={initialRooms} />;
    } else if (type === 'popular') {
        return <DiscoverPopularListing initialAfter={initialAfter} initialRooms={initialRooms} />;
    } else if (type === 'top-free') {
        return <DiscoverTopFreeListing initialAfter={initialAfter} initialRooms={initialRooms} />;
    } else if (type === 'top-premium') {
        return <DiscoverTopPremiumListing initialAfter={initialAfter} initialRooms={initialRooms} />;
    } else if (type === 'collections') {
        return <DiscoverCollectionsListing collectionId={collectionId} />;
    }
    
    throw Error('Invalid listing type');
});

export const DiscoverListing = withApp(DiscoverListingComponent);