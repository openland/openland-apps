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

type UAvatarSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'xxx-large';

export interface UAvatarProps extends XViewProps {
    title: string;
    titleEmoji?: any;
    id: string;
    photo?: string | null;
    online?: boolean;
    size?: UAvatarSize;
    selected?: boolean;
    squared?: boolean;
}

export const PlaceholderColor = [
    `linear-gradient(138deg, ${PlaceholderOrange.start}, ${PlaceholderOrange.end})`,
    `linear-gradient(138deg, ${PlaceholderRed.start}, ${PlaceholderRed.end})`,
    `linear-gradient(138deg, ${PlaceholderGreen.start}, ${PlaceholderGreen.end})`,
    `linear-gradient(138deg, ${PlaceholderBlue.start}, ${PlaceholderBlue.end})`,
    `linear-gradient(138deg, ${PlaceholderCyan.start}, ${PlaceholderCyan.end})`,
    `linear-gradient(138deg, ${PlaceholderPurple.start}, ${PlaceholderPurple.end})`,
];

const AvatarSizes: {
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
            backgroundImage={PlaceholderColor[index]}
            color="white"
            fontSize={AvatarSizes[size].placeholder}
            overflow="hidden"
            hoverTextDecoration="none"
        >
            {titleEmoji || emoji(ph)}
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
`;

const AvatarImage = React.memo((props: UAvatarProps) => {
    const { photo, size = 'medium', squared } = props;
    const boxSize = AvatarSizes[size].size;
    const [imageKey, handleImageError] = useReloadImage();

    let ops =
        '-/format/auto/-/scale_crop/' +
        (boxSize + 'x' + boxSize) +
        '/center/-/quality/best/-/progressive/yes/';
    let opsRetina =
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
                src={photo + ops}
                srcSet={photo + opsRetina}
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

const OnlineDotXXLarge = () => (
    <div className={cx(onlineDotStyle, onlineDotXXLarge, 'online-dot')} />
);

const OnlineDotXLarge = () => <div className={cx(onlineDotStyle, onlineDotXLarge, 'online-dot')} />;

const OnlineDotLarge = () => <div className={cx(onlineDotStyle, onlineDotLarge, 'online-dot')} />;

const OnlineDotMedium = () => <div className={cx(onlineDotStyle, onlineDotMedium, 'online-dot')} />;

const OnlineDotSmall = () => <div className={cx(onlineDotStyle, onlineDotSmall, 'online-dot')} />;

const OnlineDotXSmall = () => <div className={cx(onlineDotStyle, onlineDotXSmall, 'online-dot')} />;

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
        online,
        size = 'medium',
        selected,
        squared,
        ...other
    } = props;
    let content: any = undefined;

    if (photo) {
        if (photo.startsWith('ph://')) {
            const phIndex = parseInt(photo.substr(5), 10) || 0;
            content = <AvatarPlaceholder {...props} index={phIndex} />;
        } else {
            content = <AvatarImage {...props} />;
        }
    } else {
        const phIndex = Math.abs(doSimpleHash(id)) % 6;
        content = <AvatarPlaceholder {...props} index={phIndex} />;
    }

    const boxSize = AvatarSizes[size].size;

    const dotBorder = selected ? 'var(--accentMuted)' : 'var(--backgroundPrimary)';
    const dotBackground = selected ? 'var(--foregroundContrast)' : 'var(--accentPrimary)';

    return (
        <XView {...other} cursor={props.onClick || props.path ? 'pointer' : undefined}>
            <div
                className={colorProvider}
                style={
                    {
                        width: boxSize,
                        height: boxSize,
                        '--dotBorder': dotBorder,
                        '--dotBackground': dotBackground,
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

                {online && size === 'x-small' && <OnlineDotXSmall />}
                {online && size === 'small' && <OnlineDotSmall />}
                {online && size === 'medium' && <OnlineDotMedium />}
                {online && size === 'large' && <OnlineDotLarge />}
                {online && size === 'x-large' && <OnlineDotXLarge />}
                {online && size === 'xx-large' && <OnlineDotXXLarge />}
            </div>
        </XView>
    );
});
