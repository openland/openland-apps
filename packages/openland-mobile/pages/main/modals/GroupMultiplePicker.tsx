import * as React from 'react';
import { PageProps } from '../../../components/PageProps';
import { withApp } from '../../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { View, LayoutChangeEvent } from 'react-native';
import { RoomShort_SharedRoom, GlobalSearchEntryKind, GlobalSearch_items_SharedRoom } from 'openland-api/Types';
import { SScrollView } from 'react-native-s/SScrollView';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { ZBlurredView } from '../../../components/ZBlurredView';
import { ZTagView } from '../../../components/ZTagView';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { GroupView } from '../components/GroupView';
import { CheckListBoxWraper } from './UserMultiplePicker';

interface PickedItems {
    id: string;
    title: string;
}

interface GroupsListProps {
    searchHeight: number;
    query: string;
    groups: any;
    onAdd: (item: PickedItems) => void;
}

const GroupsList = XMemo<GroupsListProps>((props) => {
    let groups = getClient().useRoomSearch({
        query: "",
        sort: JSON.stringify([
            { 'featured': { order: 'desc' } },
            { 'membersCount': { order: 'desc' } },
        ])
    }).items.edges;

    return (
        <SScrollView marginTop={props.searchHeight}>
            {groups.map((v, i) => {
                const group = v.node as RoomShort_SharedRoom;

                return (
                    <CheckListBoxWraper key={'group-' + i} checked={!!props.groups.find((u: any) => u.id === v.node.id)}>
                        <GroupView
                            key={v.node.id}
                            item={group}
                            photo={group.photo}
                            onPress={() => props.onAdd(group)}
                            paddingRight={56}
                        />
                    </CheckListBoxWraper>
                );
            })}
        </SScrollView >
    );
});

const GroupsSearchList = XMemo<GroupsListProps>((props) => {
    let groups = getClient().useGlobalSearch({
        query: props.query,
        kinds: [GlobalSearchEntryKind.SHAREDROOM]
    }).items as GlobalSearch_items_SharedRoom[];

    return (
        <SScrollView marginTop={props.searchHeight}>
            {groups.map((group, i) => (
                <CheckListBoxWraper checked={!!props.groups.find((g: any) => g.id === group.id)}>
                    <GroupView
                        key={group.id}
                        item={group}
                        photo={group.roomPhoto}
                        onPress={() => props.onAdd(group)}
                        paddingRight={56}
                    />
                </CheckListBoxWraper>
            ))}
        </SScrollView >
    );
});

const GroupMultiplePickerComponent = XMemo<PageProps>((props) => {
    let theme = React.useContext(ThemeContext);

    let [groups, setGroups] = React.useState<PickedItems[]>([]);
    let [query, setQuery] = React.useState('');
    let [searchHeight, setSearchHeight] = React.useState(0);

    let handleRemoveGroup = React.useCallback((id: string) => {
        setGroups(groups.filter((v) => v.id !== id));
    }, [groups])

    let handleAddGroup = React.useCallback((item: PickedItems) => {
        if (!groups.find((v) => v.id === item.id)) {
            setGroups([...groups, item]);
        } else {
            handleRemoveGroup(item.id);
        }
    }, [groups])

    let handleSearchLayout = React.useCallback((event: LayoutChangeEvent) => {
        setSearchHeight(event.nativeEvent.layout.height);
    }, []);

    let paramsAction = props.router.params.action;
    let isEmpty = paramsAction.titleEmpty && (groups.length <= 0);
    let buttonTitle = isEmpty ? paramsAction.titleEmpty : paramsAction.title + ' (' + groups.length + ')';

    return (
        <>
            <SHeader title={props.router.params.title || 'Add to groups'} />
            <SHeaderButton
                key={'bk-' + groups.length}
                title={buttonTitle}
                onPress={isEmpty ? () => props.router.params.action.actionEmpty() : async () => {
                    await props.router.params.action.action(groups);
                }}
            />
            <View style={{ flexDirection: 'column', width: '100%', height: '100%' }}>
                <React.Suspense fallback={<ZLoader />}>
                    {query.length === 0 && <GroupsList groups={groups} searchHeight={searchHeight} query={query} onAdd={handleAddGroup} />}
                    {query.length > 0 && <GroupsSearchList groups={groups} searchHeight={searchHeight} query={query} onAdd={handleAddGroup} />}
                </React.Suspense>
            </View>
            <ASSafeAreaContext.Consumer>
                {area => (
                    <ZBlurredView onLayout={handleSearchLayout} style={{ position: 'absolute', top: area.top, left: 0, right: 0, flexDirection: 'column', maxHeight: 44 * 4 }}>
                        <ZTagView
                            items={groups.map((v) => ({ id: v.id, text: v.title }))}
                            onChange={setQuery}
                            onRemoved={handleRemoveGroup}
                            title="Groups:"
                            theme={theme}
                        />
                        <View style={{ height: 1, backgroundColor: theme.separatorColor }} />
                    </ZBlurredView>
                )}
            </ASSafeAreaContext.Consumer>
        </>
    );
})

export const GroupMultiplePicker = withApp(GroupMultiplePickerComponent, { navigationAppearance: 'small' });