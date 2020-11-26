import React from 'react';
import {
    DiscoverEditorsChoice_discoverEditorsChoice,
    DiscoverSharedRoom,
} from 'openland-api/spacex.types';
import { XCloudImage } from 'openland-x/XCloudImage';
import { css } from 'linaria';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { XView } from 'react-mental';
import { UserInfoContext } from 'openland-web/components/UserInfo';

const imageContainer = css`
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    background-color: var(--backgroundTertiary);

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

const container = css`
    width: 100%;
    max-width: 560px;
`;

export const EditorsChoiceItem = React.memo(
    (props: DiscoverEditorsChoice_discoverEditorsChoice) => {
        const userInfo = React.useContext(UserInfoContext)!;
        const path = !userInfo.isLoggedIn ? `/${props.chat.id}` : `/mail/${props.chat.id}`;
        return (
            <XView path={path} cursor="pointer">
                <div className={container}>
                    <div className={imageContainer}>
                        <XCloudImage
                            photoRef={props.image}
                            resize="fill"
                            width={560}
                            height={200}
                        />
                    </div>
                    <XView marginTop={8} marginHorizontal={-16}>
                        <UGroupView
                            group={props.chat as DiscoverSharedRoom}
                            disableHover={true}
                            path={null}
                        />
                    </XView>
                </div>
            </XView>
        );
    },
);
