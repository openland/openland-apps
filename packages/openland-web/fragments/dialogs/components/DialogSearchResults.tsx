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

export const DialogSearchResults = withGlobalSearch(props => {
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

    return (
        <>
            {items.map((i, j) => {
                let item;
                if (i.__typename === 'SharedRoom') {
                    item = {
                        key: i.id,
                        flexibleId: i.id,
                        kind: i.kind,
                        title: i.title,
                        photo: i.roomPhoto,
                        unread: 0,
                    };
                } else {
                    item = {
                        key: i.id,
                        flexibleId: i.id,
                        kind: i.kind,
                        title: i.name || '',
                        photo: i.photo,
                        unread: 0,
                    };
                }

                return (
                    <DialogViewCompact
                        key={i.id}
                        onSelect={(props as any).onSelect}
                        onClick={(props as any).onClick}
                        item={item}
                    />
                );
            })}
        </>
    );
}) as React.ComponentType<{ onClick: () => void; variables: { query: string } }>;
