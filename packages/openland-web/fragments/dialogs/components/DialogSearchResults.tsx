import * as React from 'react';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { DialogViewCompact } from './DialogViewCompact';
import { XVertical } from 'openland-x-layout/XVertical';
import { useClient } from 'openland-web/utils/useClient';
import { XLoader } from 'openland-x/XLoader';

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

const DialogSearchResultsInner = (props: DialogSearchResultsT) => {
    const client = useClient();

    const data = client.useGlobalSearch(props.variables, {
        fetchPolicy: 'cache-and-network',
    });

    if (!data || !data.items) {
        return <XLoader loading={true} />;
    }

    // Why?
    let items = data.items.reduce(
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
                <XView color="rgba(0, 0, 0, 0.5)">No results</XView>
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
                        onSelect={props.onSelect}
                        onClick={props.onClick}
                        item={item}
                    />
                );
            })}
        </>
    );
};

export const DialogSearchResults = (props: DialogSearchResultsT) => {
    return (
        <React.Suspense fallback={<XLoader loading={true} />}>
            <DialogSearchResultsInner {...props} />
        </React.Suspense>
    );
};
