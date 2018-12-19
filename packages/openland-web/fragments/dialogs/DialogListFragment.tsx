import * as React from 'react';
import {
    DialogDataSourceItem,
} from 'openland-engines/messenger/DialogListEngine';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { withChatSearchText } from '../../api/withChatSearchText';
import { XText } from 'openland-x/XText';
import { XLoadingCircular } from 'openland-x/XLoadingCircular';
import { XLink } from 'openland-x/XLink';
import InviteIcon from '../../components/messenger/components/icons/ic-invite-plus.svg';
import { DialogView } from './components/DialogView';
import { XView } from 'react-mental';
import { XListView } from '../../components/XListView';
import { DialogViewCompact } from './components/DialogViewCompact';
import { DialogSearchInput } from './components/DialogSearcInput';

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

const LoadingWrapper = Glamorous.div({
    height: 60,
});

const InviteWrapper = Glamorous(XLink)({
    borderTop: '1px solid #ececec',
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2196f3',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '16px',
    '&:hover': {
        backgroundColor: '#F9F9F9',
    },
    '& svg': {
        width: 16,
        height: 16,
        display: 'block',
        opacity: 0.6,
        marginRight: 6,
        '& *': {
            fill: '#2196f3',
        },
    },
    span: {
        display: 'block',
    },
});

export const DialogListFragment = React.memo(() => {
    let messenger = React.useContext(MessengerContext);

    let [query, setQuery] = React.useState('');
    let isSearching = query.trim().length > 0;

    const onSelect = React.useMemo(() => {
        return () => {
            //
        };
    }, [])

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
                onSelect={onSelect}
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

            <InviteWrapper query={{ field: 'invite_global', value: 'true' }}>
                <InviteIcon />
                <span>Invite people</span>
            </InviteWrapper>
        </XView >
    )
});
