import React from 'react';
import { DiscoverEditorsChoice_discoverEditorsChoice, DiscoverSharedRoom } from 'openland-api/spacex.types';
import { XCloudImage } from 'openland-x/XCloudImage';
import { css } from 'linaria';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { XView } from 'react-mental';

const imageContainer = css`
    border-radius: 8px;
    overflow: hidden;

    & img {
        display: block;
    }
`;

const container = css`
    width: 100%;
    max-width: 560px;
`;

export const EditorsChoiceItem = React.memo((props: DiscoverEditorsChoice_discoverEditorsChoice) => {
    return (
        <XView path={`/mail/${props.chat.id}`} cursor="pointer">
            <div className={container}>
                <div className={imageContainer}>
                    <XCloudImage photoRef={props.image} resize="fill" width={560} height={200} />
                </div>
                <XView marginTop={8} marginHorizontal={-16}>
                    <UGroupView group={props.chat as DiscoverSharedRoom} disableHover={true} />
                </XView>
            </div>
        </XView>
    );
});
