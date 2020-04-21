import * as React from 'react';
import { XView, XImage, XViewProps } from 'react-mental';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { doSimpleHash } from 'openland-y-utils/hash';
import { emoji } from 'openland-y-utils/emoji';
import { XMemo } from 'openland-y-utils/XMemo';
import { css, cx } from 'linaria';
import {
    PlaceholderOrange,
    PlaceholderRed,
    PlaceholderGreen,
    PlaceholderBlue,
    PlaceholderCyan,
    PlaceholderPurple,
} from 'openland-y-utils/themes/placeholders';
import { useReloadImage } from 'openland-web/components/ImgWithRetry';

export type UAvatarSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'xxx-large';

export interface UAvatarProps extends XViewProps {
    title: string;
    titleEmoji?: any;
    id: string;
    photo?: string | null;
    uuid?: string | null;
    online?: boolean;
    size?: UAvatarSize;
    selected?: boolean;
    squared?: boolean;
}

export const PlaceholderColor = [
    PlaceholderOrange,
    PlaceholderRed,
    PlaceholderGreen,
    PlaceholderBlue,
    PlaceholderCyan,
    PlaceholderPurple,
];

const getPlaceholderIndex = (id: string) => Math.abs(doSimpleHash(id)) % PlaceholderColor.length;

export const getPlaceholderColorByIndex = (index: number) => {
    let color = PlaceholderColor[index];
    return `linear-gradient(138deg, ${color.start}, ${color.end})`;
};

export const getPlaceholderColorById = (id: string) => {
    let color = PlaceholderColor[getPlaceholderIndex(id)];
    return `linear-gradient(138deg, ${color.start}, ${color.end})`;
};

export const getPlaceholderColorRawById = (id: string) => {
    return PlaceholderColor[getPlaceholderIndex(id)];
};

export const AvatarSizes: {
    [key in UAvatarSize]: {
        size: number;
        placeholder: number;
        dotSize: number;
        dotPosition: number;
        dotBorderWidth: number;
    }
} = {
    'x-small': { size: 24, placeholder: 8, dotSize: 6, dotPosition: 0, dotBorderWidth: 1 },
    small: { size: 32, placeholder: 16, dotSize: 10, dotPosition: 0, dotBorderWidth: 2 },
    medium: { size: 40, placeholder: 20, dotSize: 12, dotPosition: 0, dotBorderWidth: 2 },
    large: { size: 56, placeholder: 24, dotSize: 12, dotPosition: 2, dotBorderWidth: 2 },
    'x-large': { size: 72, placeholder: 32, dotSize: 14, dotPosition: 4, dotBorderWidth: 2 },
    'xx-large': { size: 96, placeholder: 40, dotSize: 16, dotPosition: 6, dotBorderWidth: 2 },
    'xxx-large': { size: 144, placeholder: 40, dotSize: 16, dotPosition: 6, dotBorderWidth: 2 },
};

const avatarPlaceholderStyle = css`
    -webkit-user-select: none;
`;

const AvatarPlaceholder = React.memo((props: UAvatarProps & { index: number }) => {
    const { title, titleEmoji, index, size = 'medium', squared } = props;
    const ph = extractPlaceholder(title);

    return (
        <XView
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            borderRadius={squared ? 0 : 50}
            backgroundImage={getPlaceholderColorByIndex(index)}
            color="white"
            fontSize={AvatarSizes[size].placeholder}
            overflow="hidden"
            hoverTextDecoration="none"
        >
            <span className={avatarPlaceholderStyle}>
                {titleEmoji || emoji(ph)}
            </span>
        </XView>
    );
});

const imageWrapper = css`
    position: relative;
    z-index: 0;
    background-color: var(--backgroundTertiaryTrans);

    & > img {
        z-index: 1;
        position: relative;
        display: block;
    }
`;

const imageWrapperRound = css`
    &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: 100%;
        border: 1px solid var(--borderLight);
        z-index: 2;
        pointer-events: none;
    }

    & img {
        -webkit-user-drag: none;
    }
`;

const AvatarImage = React.memo((props: UAvatarProps) => {
    const { photo, uuid, size = 'medium', squared } = props;
    const boxSize = AvatarSizes[size].size;
    const [imageKey, handleImageError] = useReloadImage();

    const ops =
        '-/format/auto/-/scale_crop/' +
        (boxSize + 'x' + boxSize) +
        '/center/-/quality/best/-/progressive/yes/';
    const opsRetina =
        '-/format/auto/-/scale_crop/' +
        (boxSize * 2 + 'x' + boxSize * 2) +
        '/center/-/quality/best/-/progressive/yes/ 2x';

    return (
        <div
            className={cx(imageWrapper, !squared && imageWrapperRound)}
            style={{ width: boxSize, height: boxSize }}
        >
            <XImage
                key={imageKey}
                width="100%"
                height="100%"
                src={!!uuid ? 'https://ucarecdn.com/' + uuid + '/' + ops : photo + ops}
                srcSet={!!uuid ? 'https://ucarecdn.com/' + uuid + '/' + opsRetina : photo + opsRetina}
                borderRadius={squared ? '0' : '100%'}
                overflow="hidden"
                onError={handleImageError}
            />
        </div>
    );
});

const onlineDotStyle = css`
    position: absolute;
    border-radius: 100%;
    background-color: var(--dotBackground);
    border-color: var(--dotBorder);
    border-width: 2px;
    border-style: solid;
    z-index: 2;
`;

const onlineDotXXLarge = css`
    bottom: 6px;
    right: 6px;
    width: 16px;
    height: 16px;
`;

const onlineDotXLarge = css`
    bottom: 4px;
    right: 4px;
    width: 14px;
    height: 14px;
`;

const onlineDotLarge = css`
    bottom: 2px;
    right: 2px;
    width: 12px;
    height: 12px;
`;

const onlineDotMedium = css`
    bottom: 0px;
    right: 0px;
    width: 12px;
    height: 12px;
`;

const onlineDotSmall = css`
    bottom: 0px;
    right: 0px;
    width: 10px;
    height: 10px;
`;

const onlineDotXSmall = css`
    bottom: 0px;
    right: 0px;
    width: 6px;
    height: 6px;
    border-width: 1px;
`;

const OnlineDot = (props: { size: UAvatarSize }) => {
    const { size = 'medium' } = props;

    const className = cx(
        'online-dot',
        onlineDotStyle,
        size === 'x-small' && onlineDotXSmall,
        size === 'small' && onlineDotSmall,
        size === 'medium' && onlineDotMedium,
        size === 'large' && onlineDotLarge,
        size === 'x-large' && onlineDotXLarge,
        size === 'xx-large' && onlineDotXXLarge,
    );

    return <div className={className} />;
};

const colorProvider = css`
    display: flex;
    flex-grow: 1;
`;

export const UAvatar = XMemo<UAvatarProps>(props => {
    const {
        title,
        titleEmoji,
        id,
        photo,
        uuid,
        online,
        size = 'medium',
        selected,
        squared,
        ...other
    } = props;
    let content: any = undefined;
    if (photo || uuid) {
        if (photo && photo.startsWith('ph://')) {
            const phIndex = parseInt(photo.substr(5), 10) || 0;
            content = <AvatarPlaceholder {...props} index={phIndex} />;
        } else {
            content = <AvatarImage {...props} />;
        }
    } else {
        const phIndex = getPlaceholderIndex(id);
        content = <AvatarPlaceholder {...props} index={phIndex} />;
    }

    const boxSize = AvatarSizes[size].size;

    const dotBorder = selected ? 'var(--accentMuted)' : 'var(--backgroundPrimary)';
    const dotBackground = selected ? 'var(--foregroundContrast)' : 'var(--accentPrimary)';

    return (
        <XView height={boxSize} width={boxSize} cursor={props.onClick || props.path ? 'pointer' : undefined} {...other}>
            <div
                className={colorProvider}
                style={
                    {
                        width: boxSize,
                        height: boxSize,
                        '--dotBorder': dotBorder,
                        '--dotBackground': dotBackground,
                        userSelect: 'none'
                    } as React.CSSProperties
                }
            >
                <XView
                    width="100%"
                    height="100%"
                    borderRadius={squared ? 0 : boxSize / 2}
                    overflow="hidden"
                >
                    {content}
                </XView>
                {online && <OnlineDot size={size} />}
            </div>
        </XView>
    );
});
