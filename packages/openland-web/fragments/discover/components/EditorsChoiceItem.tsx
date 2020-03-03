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

export const EditorsChoiceItem = React.memo((props: DiscoverEditorsChoice_discoverEditorsChoice) => {
    return (
        <div>
            <div className={imageContainer}>
                <XCloudImage photoRef={props.image} width={560} height={200} />
            </div>
            <XView marginTop={8} marginHorizontal={-16}>
                <UGroupView group={props.chat as DiscoverSharedRoom} disableHover={true} />
            </XView>
        </div>
    );
});
