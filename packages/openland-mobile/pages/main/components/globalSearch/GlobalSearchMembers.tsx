import * as React from 'react';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { SFlatList } from 'react-native-s/SFlatList';
import { SDevice } from 'react-native-s/SDevice';
import { DeviceConfig } from 'react-native-s/navigation/DeviceConfig';
import { Loader } from './GlobalSearch';
import { View, Text, Keyboard } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { UserView } from '../UserView';
import { RoomMemberType, OrgMemberType, RoomLongPressHanlder, OrgLongPressHanlder } from '../../modals/MembersSearch';
import { PageProps } from 'openland-mobile/components/PageProps';
import { RoomMemberRole, OrganizationMemberRole } from 'openland-api/spacex.types';

const useSearchKeyboardHeight = () => {
    const area = React.useContext(ASSafeAreaContext);
    const [keyboardHeight, setKeyboardHeight] = React.useState(0);
    React.useEffect(() => {
        const handleShow = (e: any) => {
            setKeyboardHeight(e?.endCoordinates?.height);
        };
        const handleHide = () => {
            setKeyboardHeight(0);
        };
        Keyboard.addListener('keyboardWillShow', handleShow);
        Keyboard.addListener('keyboardWillHide', handleHide);
        return () => {
            Keyboard.removeListener('keyboardWillShow', handleShow);
            Keyboard.removeListener('keyboardWillHide', handleHide);
        };
    }, []);
    return keyboardHeight - (area.top - DeviceConfig.statusBarHeight) + (area.bottom - SDevice.safeArea.bottom);
};

const EmptyView = React.memo((props: { theme: ThemeGlobal, keyboardHeight: number; }) => {
    return (
        <View
            style={{
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: props.keyboardHeight,
            }}
        >
            <Text
                style={{
                    ...TextStyles.Body,
                    color: props.theme.foregroundSecondary,
                }}
            >
                Nobody found
            </Text>
        </View>
    );
});

export interface RoomMembersSearchProps {
    query: string;
    onPress: (member: RoomMemberType) => void;
    onLongPress: RoomLongPressHanlder;
    roomId: string;
}

const RoomMembersSearch = (props: RoomMembersSearchProps) => {
    const area = React.useContext(ASSafeAreaContext);
    const theme = React.useContext(ThemeContext);
    const client = getClient();
    const { query, roomId, onPress, onLongPress } = props;
    const [loading, setLoading] = React.useState(false);
    const [initialLoading, setInitialLoading] = React.useState(true);
    const [after, setAfter] = React.useState<string | undefined>();
    const [hasNextPage, setHasNextPage] = React.useState(true);
    const [items, setItems] = React.useState<RoomMemberType[]>([]);
    const keyboardHeight = useSearchKeyboardHeight();

    const onRoleChange = (memberId: string, role: RoomMemberRole) => {
        setItems(prev => prev.map(member => member.user.id === memberId ? ({ ...member, role }) : member));
    };
    const onKick = (memberId: string) => {
        setItems(prev => prev.filter(member => member.user.id !== memberId));
    };

    const handleLoadMore = async () => {
        if (!loading && hasNextPage && !initialLoading) {
            setLoading(true);
            const { edges, pageInfo } = (
                await client.queryRoomMembersSearch(
                    { cid: roomId, query, first: 10, after },
                    { fetchPolicy: 'network-only' },
                )
            ).chatMembersSearch;
            setItems((prev) => prev.concat(edges.map((x) => x.node)));
            setAfter(edges[edges.length - 1]?.cursor);
            setHasNextPage(pageInfo.hasNextPage);
            setLoading(false);
        }
    };

    const loadFirst = async () => {
        setInitialLoading(true);
        const { edges, pageInfo } = (
            await client.queryRoomMembersSearch(
                { cid: roomId, query, first: 10 },
                { fetchPolicy: 'network-only' },
            )
        ).chatMembersSearch;
        setItems(edges.map((x) => x.node));
        setAfter(edges[edges.length - 1]?.cursor);
        setHasNextPage(pageInfo.hasNextPage);
        setInitialLoading(false);
    };

    React.useEffect(() => {
        loadFirst();
    }, [props.query]);

    if (initialLoading) {
        return <Loader theme={theme} />;
    }

    if (!items.length) {
        return <EmptyView theme={theme} keyboardHeight={keyboardHeight} />;
    }

    return (
        <SFlatList
            data={items}
            keyExtractor={(item, index) => `${index}-${item.user.id}`}
            renderItem={({ item }) => (
                <UserView
                    user={item.user}
                    memberRole={item.role}
                    onPress={() => onPress(item)}
                    onLongPress={() => onLongPress(item, { onRoleChange, onKick })}
                />
            )}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
            scrollEventThrottle={1}
            legacyImplementation={true}
            onEndReachedThreshold={1}
            refreshing={loading}
            onEndReached={handleLoadMore}
            style={{
                backgroundColor: theme.backgroundPrimary
            }}
            scrollIndicatorInsets={{
                top: area.top - DeviceConfig.statusBarHeight,
                bottom: area.bottom - SDevice.safeArea.bottom,
            }}
        />
    );
};

export interface OrgMembersSearchProps {
    query: string;
    onPress: (member: OrgMemberType) => void;
    onLongPress: OrgLongPressHanlder;
    orgId: string;
}

const OrgMembersSearch = (props: OrgMembersSearchProps) => {
    const area = React.useContext(ASSafeAreaContext);
    const theme = React.useContext(ThemeContext);
    const client = getClient();
    const { query, orgId, onPress, onLongPress } = props;
    const [loading, setLoading] = React.useState(false);
    const [initialLoading, setInitialLoading] = React.useState(true);
    const [after, setAfter] = React.useState<string | undefined>();
    const [hasNextPage, setHasNextPage] = React.useState(true);
    const [items, setItems] = React.useState<OrgMemberType[]>([]);
    const keyboardHeight = useSearchKeyboardHeight();

    const onRoleChange = (memberId: string, role: OrganizationMemberRole) => {
        setItems(prev => prev.map(member => member.user.id === memberId ? ({ ...member, role }) : member));
    };
    const onKick = (memberId: string) => {
        setItems(prev => prev.filter(member => member.user.id !== memberId));
    };

    const handleLoadMore = async () => {
        if (!loading && hasNextPage && !initialLoading) {
            setLoading(true);
            const { edges, pageInfo } = (
                await client.queryOrganizationMembersSearch(
                    { orgId, query, first: 10, after },
                    { fetchPolicy: 'network-only' },
                )
            ).orgMembersSearch;
            setItems((prev) => prev.concat(edges.map((x) => x.node)));
            setAfter(edges[edges.length - 1]?.cursor);
            setHasNextPage(pageInfo.hasNextPage);
            setLoading(false);
        }
    };

    const loadFirst = async () => {
        setInitialLoading(true);
        const { edges, pageInfo } = (
            await client.queryOrganizationMembersSearch(
                { orgId, query, first: 10 },
                { fetchPolicy: 'network-only' },
            )
        ).orgMembersSearch;
        setItems(edges.map((x) => x.node));
        setAfter(edges[edges.length - 1]?.cursor);
        setHasNextPage(pageInfo.hasNextPage);
        setInitialLoading(false);
    };

    React.useEffect(() => {
        loadFirst();
    }, [props.query]);

    if (initialLoading) {
        return <Loader theme={theme} />;
    }

    if (!items.length) {
        return <EmptyView theme={theme} keyboardHeight={keyboardHeight} />;
    }

    return (
        <SFlatList
            data={items}
            keyExtractor={(item, index) => `${index}-${item.user.id}`}
            renderItem={({ item }) => (
                <UserView
                    user={item.user}
                    memberRole={item.role}
                    onPress={() => onPress(item)}
                    onLongPress={() => onLongPress(item, { onRoleChange, onKick })}
                />
            )}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
            scrollEventThrottle={1}
            legacyImplementation={true}
            onEndReachedThreshold={1}
            refreshing={loading}
            onEndReached={handleLoadMore}
            style={{
                backgroundColor: theme.backgroundPrimary
            }}
            scrollIndicatorInsets={{
                top: area.top - DeviceConfig.statusBarHeight,
                bottom: area.bottom - SDevice.safeArea.bottom,
            }}
        />
    );
};

export const GlobalSearchMembers = React.memo((props: PageProps & { query: string }) => {
    return props.router.params.roomId ? (
        <RoomMembersSearch
            query={props.query}
            roomId={props.router.params.roomId as string}
            onPress={props.router.params.onPress as (member: RoomMemberType) => void}
            onLongPress={props.router.params.onLongPress as RoomLongPressHanlder}
        />
    ) : props.router.params.orgId ? (
        <OrgMembersSearch
            query={props.query}
            orgId={props.router.params.orgId as string}
            onPress={props.router.params.onPress as (member: OrgMemberType) => void}
            onLongPress={props.router.params.onLongPress as (member: OrgMemberType) => void}
        />
    ) : null;
});
