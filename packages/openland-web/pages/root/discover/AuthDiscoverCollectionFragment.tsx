import * as React from 'react';
import { AuthDiscoverContainer } from './AuthDiscoverContainer';
import { useClient } from 'openland-api/useClient';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import { XCloudImage } from 'openland-x/XCloudImage';
import { TextBody } from 'openland-web/utils/TextStyles';
import { Page } from 'openland-unicorn/Page';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { DiscoverSharedRoom } from 'openland-api/spacex.types';
import { JoinButtonSimple } from 'openland-web/fragments/discover/components/JoinButton';

const descriptionBox = css`
    color: var(--foregroundPrimary);
    margin-bottom: 16px;
    white-space: pre-wrap;
    word-wrap: break-word;
`;

const imageBox = css`
    padding: 35% 0 0;
    position: relative;

    img {
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0; 
        display: block;
        border-radius: 8px;
        overflow: hidden;
        width: 100%!important;
        height: 100%!important;
    }
`;

const AuthDiscoverCollectionInner = React.memo((props: { id: string, setTitle: (title: string) => void }) => {
    const client = useClient();
    const collection = client.useDiscoverCollection({ id: props.id }).discoverCollection;

    if (!collection) {
        // TODO replace with empty placeholder
        return null;
    }

    const { title, description, image, chats } = collection;

    React.useEffect(() => {
        props.setTitle(title);
    }, [title]);

    return (
        <Page padded={false} maxWidth={630} track="discover_collection">
            <XView paddingLeft={16} paddingRight={16} paddingBottom={8}>
                {!!description && <div className={cx(descriptionBox, TextBody)}>{description}</div>}
                <div className={imageBox}>
                    <XCloudImage photoRef={image} resize="fill" width={568} height={200} />
                </div>
            </XView>

            <XView marginTop={16} marginBottom={56}>
                {chats.map(item => (
                    <UGroupView
                        key={'group-' + item.id}
                        group={item as DiscoverSharedRoom}
                        path={'/' + item.id}
                        rightElement={<JoinButtonSimple group={item as DiscoverSharedRoom} />}
                    />
                ))}
            </XView>
        </Page>
    );
});

export const AuthDiscoverCollectionFragment = React.memo((props: { id: string }) => {
    const [title, setTitle] = React.useState('');

    return (
        <AuthDiscoverContainer title={title} showBack={true}>
            <AuthDiscoverCollectionInner id={props.id} setTitle={setTitle} />
        </AuthDiscoverContainer>
    );
});
