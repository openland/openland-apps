import * as React from 'react';
import { css, cx } from 'linaria';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { doSimpleHash } from 'openland-y-utils/hash';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { PlaceholderColors } from 'openland-y-utils/themes/placeholders';

const phBackgrounds = [
    css`background-image: linear-gradient(138deg, #ffb600, #ff8d00);`,
    css`background-image: linear-gradient(138deg, #ff655d, #ff3d33);`,
    css`background-image: linear-gradient(138deg, #59d23c, #21ac00);`,
    css`background-image: linear-gradient(138deg, #11b2ff, #1970ff);`,
    css`background-image: linear-gradient(138deg, #00d1d4, #00afc8);`,
    css`background-image: linear-gradient(138deg, #aa22ff, #8e00e6);`
];

const avatarPlaceholderClass = css`
    display: flex;
    width: 40px;
    height: 40px;
    align-items: center;
    border-radius: 40px;
    overflow: hidden;
    font-size: 20px;
    justify-content: center;
    color: #fff;
`;

const avatarLink = css`
    cursor: pointer;

    &,
    &:hover,
    &:focus,
    &:active {
        text-decoration: none;
    }
`;

const AvatarPlaceholder = React.memo((props: { title: string, titleEmoji: any, id: string }) => {
    const { title, id } = props;
    const ph = extractPlaceholder(title);
    const phIndex = Math.abs(doSimpleHash(id)) % PlaceholderColors.length;

    return (
        <ULink path={`/${id}`} className={avatarLink}>
            <div className={cx(avatarPlaceholderClass, phBackgrounds[phIndex])}>
                {/* TODO: preprocess avatar placeholder in DS */}
                {/* {titleEmoji ||
                    emoji({
                        src: ph,
                        size: 20,
                        cache: true,
                    })} */}
                {ph}
            </div>
        </ULink>
    );
});

const avatarImageClass = css`
    width: 40px;  
    height: 40px;  
    border-radius: 40px;
    overflow: hidden;
    cursor: pointer;
`;

const imageWrapper = css`
    position: relative;
    z-index: 0;
    width: 40px;
    height: 40px;
    background-color: var(--backgroundTertiaryTrans);
    border-radius: 100%;

    & > img {
        z-index: 1;
        position: relative;
        display: block;
    }

    &:before {
        content: "";
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        border-radius: 100%;
        border: 1px solid var(--borderLight);
        z-index: 2;
        pointer-events: none;
    }
`;

const AvatarImage = React.memo((props: { photo: string, id: string}) => {
    let ops = '-/format/auto/-/scale_crop/40x40/center/-/quality/best/-/format/jpeg/-/progressive/yes/';
    let opsRetina =
        '-/format/auto/-/scale_crop/80x80/center/-/quality/best/-/format/jpeg/-/progressive/yes/ 2x';

    return (
        <ULink className={cx(avatarLink, imageWrapper)} path={`/${props.id}`}>
            <ImgWithRetry
                className={avatarImageClass}
                src={props.photo + ops}
                srcSet={props.photo + opsRetina}
            />
        </ULink>
    );
});

interface MAvatarProps {
    senderNameEmojify?: string | JSX.Element;
    senderName: string;
    senderId: string;
    senderPhoto?: string | null;
}

export const MAvatar = (props: MAvatarProps) => {
    let res = <AvatarPlaceholder titleEmoji={props.senderNameEmojify} title={props.senderName} id={props.senderId} />;
    if (props.senderPhoto && !props.senderPhoto.startsWith('ph://')) {
        res = <AvatarImage photo={props.senderPhoto} id={props.senderId} />;
    }
    return res;
};