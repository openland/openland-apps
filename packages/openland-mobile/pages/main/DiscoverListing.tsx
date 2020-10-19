import * as React from 'react';
import * as Types from '../../../openland-api/spacex.types';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SDeferred } from 'react-native-s/SDeferred';
import { SFlatList } from 'react-native-s/SFlatList';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { useTheme, ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TouchableHighlight, View, Image, StyleSheet, ViewStyle, Text, Share, Platform, Dimensions, PixelRatio } from 'react-native';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { joinPaidGroup } from './components/ChatJoin';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { normalizePopularItems, DiscoverRoom, DiscoverOrganization, normalizePopularOrgItems } from 'openland-y-utils/discover/normalizePopularItems';
import { DiscoverListItem, DiscoverListItemOrg } from './components/discover/DiscoverListItem';
import { AppStorage } from 'openland-mobile/utils/AppStorage';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { DiscoverCover } from './components/discover/DiscoverCover';
import { isPad } from '../Root';

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

    React.useEffect(() => {
        setState(props.isFollowing ? 'done' : 'initial');
    }, [props.isFollowing]);

    const tintColor = state === 'done'
        ? theme.foregroundTertiary
        : theme.foregroundInverted;
    const backgroundColor = state === 'done'
        ? theme.backgroundTertiaryTrans
        : props.room.isPremium
            ? theme.accentPay
            : theme.accentPrimary;
    const underlayColor = state === 'done'
        ? theme.backgroundTertiaryActive
        : props.room.isPremium
            ? theme.accentPayActive
            : theme.accentPrimaryActive;

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
    beforeContent?: JSX.Element;
}

const DiscoverListingContent = React.memo((props: DiscoverListingContentProps) => {
    const [joinedChats, setJoinedChats] = React.useState(new Set<string>());
    const onJoin = React.useCallback((room: Types.RoomChat_room_SharedRoom) => {
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
                    ListHeaderComponent={props.beforeContent}
                    refreshing={props.loading}
                />
            </SDeferred>
        </>
    );
});

interface DiscoverOrgsListingProps {
    title: string;
    orgs: DiscoverOrganization[];
    onEndReached?: () => void;
    loading?: boolean;
    beforeContent?: JSX.Element;
}

const DiscoverOrgsListing = React.memo((props: DiscoverOrgsListingProps) => {
    return (
        <>
            <SHeader title={props.title} />
            <SDeferred>
                <SFlatList
                    data={props.orgs}
                    renderItem={({ item }) => (
                        <DiscoverListItemOrg
                            item={item}
                        />
                    )}
                    keyExtractor={(item, index) => index + '-' + item.id}
                    onEndReached={props.onEndReached}
                    ListHeaderComponent={props.beforeContent}
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

        let { items, cursor } = (await getClient().queryDiscoverNewAndGrowing({ after, first, seed }, { fetchPolicy: 'network-only' })).discoverNewAndGrowing;

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

        let { items, cursor } = (await getClient().queryDiscoverPopularNow({ after, first }, { fetchPolicy: 'network-only' })).discoverPopularNow;

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

        let { items, cursor } = (await getClient().queryDiscoverTopFree({ after, first }, { fetchPolicy: 'network-only' })).discoverTopFree;

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

        let { items, cursor } = (await getClient().queryDiscoverTopPremium({ after, first }, { fetchPolicy: 'network-only' })).discoverTopPremium;

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
    description?: string;
}

export const layoutCollectionCover = () => {
    const screenWidth = Dimensions.get('screen').width;
    let coverWidth = Dimensions.get('screen').width - 32;

    if (isPad && screenWidth > 375 * 2) {
        coverWidth -= screenWidth > 1000 ? 375 : 320;
    }

    return {
        width: coverWidth,
        height: coverWidth * 9 / 16,
    };
};

const DiscoverCollectionsListing = (props: DiscoverCollectionsListingProps) => {
    const theme = React.useContext(ThemeContext);
    const [rooms, setRooms] = React.useState<DiscoverRoom[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [title, setTitle] = React.useState(props.title || '');
    const [description, setDescription] = React.useState(props.description || null);
    const [image, setImage] = React.useState<Types.DiscoverChatsCollection_image | null>(null);
    const [shortname, setShortname] = React.useState<string | null>(null);
    const [path, setPath] = React.useState('');
    const [layoutCover, setLayoutCover] = React.useState(layoutCollectionCover());
    const loadCollections = async () => {
        setLoading(true);
        let res = (await getClient().queryDiscoverCollection({ id: props.collectionId }, { fetchPolicy: 'network-only' })).discoverCollection;
        if (res) {
            setTitle(res.title);
            setRooms(res.chats);
            setDescription(res.description);
            setImage(res.image);
            setShortname(res.shortname);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        return image ? DownloadManagerInstance.watch(
            image.uuid,
            {
                width: Math.round(layoutCover.width * PixelRatio.get()),
                height: Math.round(layoutCover.height * PixelRatio.get())
            },
            state => {
                if (state.path) {
                    let newPath = Platform.select({ ios: state.path, android: 'file://' + state.path });
                    setPath(newPath);
                }
            }) : () => { return; };
    }, [image]);

    React.useEffect(() => {
        loadCollections();
    }, []);

    const beforeContent = React.useMemo(() => {
        const preloadedContent = !!props.title;
        const showCover = preloadedContent || !loading;

        return (
            <View paddingHorizontal={16} paddingBottom={24} onLayout={() => setLayoutCover(layoutCollectionCover())}>
                {!!description && <Text style={[TextStyles.Body, { color: theme.foregroundPrimary }]}>{description}</Text>}
                {showCover &&
                    <View marginTop={16}>
                        <DiscoverCover width={layoutCover.width} height={layoutCover.height} path={path} />
                    </View>
                }
            </View>
        );
    }, [description, image, path, loading, layoutCover]);

    return (
        <>
            <SHeaderButton
                title="Share"
                icon={require('assets/ic-share-24.png')}
                onPress={() => Share.share({
                    message: shortname ? `https://openland.com/${shortname}` : `https://openland.com/discover/collections/${props.collectionId}`
                })}
            />

            <DiscoverListingContent
                title={title}
                rooms={rooms}
                loading={loading}
                beforeContent={beforeContent}
            />
        </>
    );
};

const DiscoverRecommendationsListing = (props: { initialRooms: DiscoverRoom[] }) => {
    const [rooms, setRooms] = React.useState(props.initialRooms);
    const [loading, setLoading] = React.useState(false);
    const loadRooms = async () => {
        setLoading(true);
        let items = (await getClient().queryDiscoverSuggestedRooms({ fetchPolicy: 'network-only' })).suggestedRooms.filter(x => x.__typename === 'SharedRoom');
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

interface DiscoverListingOrgsPageProps {
    initialOrgs: DiscoverOrganization[];
    initialAfter: string;
}

const DiscoverTopOrgsListing = (props: DiscoverListingOrgsPageProps) => {
    const [orgs, setOrgs] = React.useState(props.initialOrgs);
    const [loading, setLoading] = React.useState(false);
    const [after, setAfter] = React.useState<string | null>(props.initialAfter);
    const first = 10;

    const loadMore = async () => {
        if (loading || (!after && orgs.length > 0)) {
            return;
        }
        setLoading(true);

        let { items, cursor } = (await getClient().queryDiscoverPopularOrganizations({ after, first }, { fetchPolicy: 'network-only' })).discoverPopularNowOrganizations;

        if (items.length < first) {
            setAfter('');
        } else {
            setAfter(cursor);
        }

        setOrgs([...orgs, ...normalizePopularOrgItems(items)]);
        setLoading(false);
    };

    React.useEffect(() => {
        if (orgs.length === 0) {
            loadMore();
        }
    }, []);

    return (
        <DiscoverOrgsListing
            title="Top communities"
            orgs={orgs}
            loading={loading}
            onEndReached={loadMore}
        />
    );
};

interface DiscoverListingOrgsPageProps {
    initialOrgs: DiscoverOrganization[];
    initialAfter: string;
}

const DiscoverNewOrgsListing = (props: DiscoverListingOrgsPageProps) => {
    const [orgs, setOrgs] = React.useState(props.initialOrgs);
    const [loading, setLoading] = React.useState(false);
    const [after, setAfter] = React.useState<string | null>(props.initialAfter);
    const first = 10;
    const seed = getRandomSeed();

    const loadMore = async () => {
        if (loading || (!after && orgs.length > 0)) {
            return;
        }
        setLoading(true);

        let { items, cursor } = (await getClient().queryDiscoverNewOrganizations({ after, first, seed }, { fetchPolicy: 'network-only' })).discoverNewAndGrowingOrganizations;

        if (items.length < first) {
            setAfter('');
        } else {
            setAfter(cursor);
        }

        setOrgs([...orgs, ...items]);
        setLoading(false);
    };

    React.useEffect(() => {
        if (orgs.length === 0) {
            loadMore();
        }
    }, []);

    return (
        <DiscoverOrgsListing
            title="New communities"
            orgs={orgs}
            loading={loading}
            onEndReached={loadMore}
        />
    );
};

const DiscoverListingComponent = React.memo<PageProps>((props) => {
    const initialRooms = (props.router.params.initialRooms || []) as DiscoverRoom[];
    const type = props.router.params.type as ListingType;
    const initialAfter = props.router.params.after as string;
    const title = props.router.params.title as string;
    const collectionId = props.router.params.collectionId as string;
    const description = props.router.params.description as string;
    const initialOrgs = (props.router.params.initialOrgs || []) as DiscoverOrganization[];

    if (type === 'new') {
        return <DiscoverNewListing initialAfter={initialAfter} initialRooms={initialRooms} />;
    } else if (type === 'popular') {
        return <DiscoverPopularListing initialAfter={initialAfter} initialRooms={initialRooms} />;
    } else if (type === 'top-free') {
        return <DiscoverTopFreeListing initialAfter={initialAfter} initialRooms={initialRooms} />;
    } else if (type === 'top-premium') {
        return <DiscoverTopPremiumListing initialAfter={initialAfter} initialRooms={initialRooms} />;
    } else if (type === 'collections') {
        return <DiscoverCollectionsListing collectionId={collectionId} title={title} description={description} />;
    } else if (type === 'recommendations') {
        return <DiscoverRecommendationsListing initialRooms={initialRooms} />;
    } else if (type === 'top-orgs') {
        return <DiscoverTopOrgsListing initialAfter={initialAfter} initialOrgs={initialOrgs} />;
    } else if (type === 'new-orgs') {
        return <DiscoverNewOrgsListing initialAfter={initialAfter} initialOrgs={initialOrgs} />;
    } else {
        return <DiscoverListingContent title={title} rooms={initialRooms} />;
    }
});

export const DiscoverListing = withApp(DiscoverListingComponent);