import * as React from 'react';
import { XView } from 'react-mental';
import { DialogSearchInput } from './DialogSearcInput';
import { XListView } from 'openland-web/components/XListView';
import { DialogViewCompact } from './DialogViewCompact';
import { withChatSearchText } from 'openland-web/api/withChatSearchText';
import Glamorous from 'glamorous';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XButton } from 'openland-x/XButton';
import { DialogView } from './DialogView';
import { XText } from 'openland-x/XText';
import { XLoadingCircular } from 'openland-x/XLoadingCircular';
import { XVertical } from 'openland-x-layout/XVertical';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';

const LoadingWrapper = Glamorous.div({
    height: 60,
});

const PlaceholderEmpty = Glamorous(XText)({
    opacity: 0.5,
});

const PlaceholderLoader = Glamorous(XLoadingCircular)({
    alignSelf: 'center',
});

const NoResultWrapper = Glamorous(XVertical)({
    marginTop: 34,
});

const Image = Glamorous.div({
    width: 178,
    height: 155,
    backgroundImage: "url('/static/X/messenger/channels-search-empty.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
});

const SearchChats = withChatSearchText((props) => {

    if (!props.data || !props.data.items) {
        return <PlaceholderLoader color="#334562" />;
    }

    // Why?
    let items = props.data.items.reduce(
        (p, x) => {
            if (!p.find(c => c.id === x.id)) {
                p.push(x);
            }
            return p;
        },
        [] as any[],
    );

    if (items.length === 0) {
        return (
            <NoResultWrapper separator={10} alignItems="center">
                <Image />
                <PlaceholderEmpty>No results</PlaceholderEmpty>
            </NoResultWrapper>
        );
    }

    return (<>
        {items.map((i, j) => (
            <DialogViewCompact
                key={i.id}
                onSelect={(props as any).onSelect}
                item={{
                    key: i.id,
                    flexibleId: i.flexibleId,
                    kind: i.kind,
                    title: i.title,
                    photo: i.photo || i.photos[0],
                    unread: 0,
                }}
            />
        ))}
    </>);
});

export interface DialogListViewProps {
    onDialogClick: (id: string) => void;
}

export const DialogListView = React.memo<DialogListViewProps>((props) => {

    let messenger = React.useContext(MessengerContext);
    let [query, setQuery] = React.useState('');
    let isSearching = query.trim().length > 0;

    const renderLoading = React.useMemo((() => {
        return () => {
            return (
                <LoadingWrapper>
                    <XButton alignSelf="center" style="flat" loading={true} />
                </LoadingWrapper>
            );
        }
    }), []);
    const renderDialog = React.useMemo(() => {
        return (item: DialogDataSourceItem) => (
            <DialogView
                onSelect={props.onDialogClick}
                item={item}
            />
        );
    }, []);

    return (
        <XView flexGrow={1} flexBasis={0}>
            <DialogSearchInput
                value={query}
                onChange={setQuery}
            />
            <XView flexGrow={1} flexBasis={0} minHeight={0}>
                {isSearching && (
                    <SearchChats
                        variables={{ query: query }}
                    />
                )}
                {!isSearching && (
                    <XListView
                        dataSource={messenger.dialogList.dataSource}
                        itemHeight={72}
                        loadingHeight={60}
                        renderItem={renderDialog}
                        renderLoading={renderLoading}
                    />
                )}
            </XView>
        </XView>
    )
})