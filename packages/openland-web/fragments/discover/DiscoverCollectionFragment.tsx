import * as React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import copy from 'copy-to-clipboard';
import { useClient } from 'openland-api/useClient';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { Listing } from './components/Listing';
import { DiscoverNoLoginProps } from './utils/DiscoverNoLoginContent';
import { TextBody, TextStyles } from 'openland-web/utils/TextStyles';
import { XCloudImage } from 'openland-x/XCloudImage';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { useToast } from 'openland-web/components/unicorn/UToast';
import LinkIcon from 'openland-icons/s/ic-link-24.svg';

const descriptionBox = css`
    color: var(--foregroundPrimary);
    white-space: pre-wrap;
    word-wrap: break-word;
`;

const imageBox = css`
    padding: 35% 0 0;
    margin: 16px 0 0;
    position: relative;
    background-color: var(--backgroundTertiary);
    border-radius: 8px;
    overflow: hidden;

    img {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: block;
        width: 100% !important;
        height: 100% !important;
    }
`;

export const DiscoverCollectionFragment = React.memo(
    (props: DiscoverNoLoginProps & { id?: string }) => {
        const client = useClient();
        const unicorn = useUnicorn();
        const id = props.id || unicorn.query.collectionId;
        const toastHandlers = useToast();

        const collection = client.useDiscoverCollection({ id }).discoverCollection;

        if (!collection) {
            // TODO replace with empty placeholder
            return null;
        }

        const { title, description, image, chats, shortname } = collection;

        const [toastHash, setToastHash] = React.useState(0);

        return (
            <Page track="discover_collection" padded={false}>
                {!props.noLogin && (
                    <UHeader
                        documentTitle={title}
                        titleView={
                            <XView flexDirection="row" height={56} flexGrow={1} alignItems="center">
                                <XView {...TextStyles.Title1}>{title}</XView>
                                <XView flexGrow={1} />
                                <UIconButton
                                    icon={<LinkIcon />}
                                    onClick={() => {
                                        if (shortname) {
                                            copy(`https://openland.com/${shortname}`, {
                                                format: 'text/plain',
                                            });
                                        } else {
                                            copy(
                                                `https://openland.com/discover/collections/${id}`,
                                                { format: 'text/plain' },
                                            );
                                        }

                                        toastHandlers.show({
                                            type: 'success',
                                            text: 'Link copied',
                                            hash: toastHash,
                                        });

                                        setToastHash((current) => current + 1);
                                    }}
                                />
                            </XView>
                        }
                    />
                )}

                <XView paddingLeft={16} paddingRight={16} paddingBottom={8}>
                    {!!description && (
                        <div className={cx(descriptionBox, TextBody)}>{description}</div>
                    )}
                    <div className={imageBox}>
                        <XCloudImage photoRef={image} resize="fill" width={568} height={200} />
                    </div>
                </XView>

                <Listing items={chats} noLogin={props.noLogin} />
            </Page>
        );
    },
);
