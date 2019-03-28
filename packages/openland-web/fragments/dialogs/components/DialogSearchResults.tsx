import * as React from 'react';
import Glamorous from 'glamorous';
import { DialogViewCompact } from './DialogViewCompact';
import { XText } from 'openland-x/XText';
import { XLoadingCircular } from 'openland-x/XLoadingCircular';
import { XVertical } from 'openland-x-layout/XVertical';
import { withGlobalSearch } from 'openland-web/api/withGlobalSearch';

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

type DialogSearchResultsT = {
    onClick: () => void;
    onSelect?: () => void;
    variables: { query: string };
};

export const DialogSearchResults = withGlobalSearch(props => {
    const typeProps = props as typeof props & DialogSearchResultsT;
    if (!typeProps.data || !typeProps.data.items) {
        return <PlaceholderLoader color="#334562" />;
    }

    // Why?
    let items = typeProps.data.items.reduce(
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

    return (
        <>
            {items.map(i => {
                let item;

                if (i.__typename === 'SharedRoom') {
                    item = {
                        key: i.id,
                        flexibleId: i.id,
                        kind: i.kind,
                        title: i.title,
                        fallback: i.title,
                        photo: i.roomPhoto,
                        isChannel: i.isChannel,
                        unread: 0,
                    };
                } else if (i.__typename === 'Organization') {
                    item = {
                        key: i.id,
                        flexibleId: i.id,
                        kind: i.kind,
                        title: i.name || '',
                        fallback: i.name || '',
                        photo: i.photo,
                        unread: 0,
                        isOrganization: true,
                    };
                } else if (i.__typename === 'User') {
                    item = {
                        key: i.id,
                        flexibleId: i.id,
                        kind: i.kind,
                        title: i.name || '',
                        fallback: i.name || '',
                        photo: i.photo,
                        unread: 0,
                    };
                } else {
                    return null;
                }

                return (
                    <DialogViewCompact
                        key={i.id}
                        onSelect={typeProps.onSelect}
                        onClick={typeProps.onClick}
                        item={item}
                    />
                );
            })}
        </>
    );
}) as React.ComponentType<DialogSearchResultsT>;
