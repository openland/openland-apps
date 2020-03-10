import React from 'react';
import { DiscoverCollections_discoverCollections_items } from 'openland-api/spacex.types';
import { XCloudImage } from 'openland-x/XCloudImage';
import { TextLabel1, TextSubhead } from 'openland-web/utils/TextStyles';
import { XView } from 'react-mental';
import { plural } from 'openland-y-utils/plural';
import { css } from 'linaria';

const collectionPhoto = css`
    position: relative;
    width: 176px;
    height: 100px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 16px;
    -webkit-mask-image: -webkit-radial-gradient(white, black);

    &:after {
        display: block;
        content: '';
        background: transparent;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        box-shadow: inset 0 0 0 1px var(--borderLight);
        border-radius: 8px;
        pointer-events: none;
    }

    & img {
        display: block;
        transition: transform 300ms;
    }

    &:hover img {
        transform: scale(1.03);
    }
`;

export const DiscoverCollection = React.memo((props: DiscoverCollections_discoverCollections_items) => {
    return (
        <XView path={`/discover/collections/${props.id}`} cursor="pointer">
            <div className={collectionPhoto}>
                <XCloudImage photoRef={props.image} resize="fill" width={176} height={100} />
            </div>
            <h2 className={TextLabel1}>{props.title}</h2>
            <XView color="var(--foregroundSecondary)">
                <span className={TextSubhead}>{plural(props.chatsCount, ['group', 'groups'])}</span>
            </XView>
        </XView>
    );
});