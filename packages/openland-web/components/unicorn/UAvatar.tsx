import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XImage, XViewProps } from 'react-mental';
import { useReloadImage } from 'openland-web/components/ImgWithRetry';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { UIcon } from './UIcon';
import { AvatarBauhaus } from './UAvatarNew';
import BookmarkIcon from 'openland-icons/s/ic-bookmark-filled-24.svg';

export type UAvatarSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'xxx-large';

type AvatarSizesRecord = {
    size: number;
    placeholder: number;
    dotSize: number;
    dotPosition: number;
    dotBorderWidth: number;
};
export interface UAvatarProps extends XViewProps {
    id: string;
    photo?: string | null;
    uuid?: string | null;
    badge?: string | null;
    online?: boolean;
    size?: UAvatarSize;
    selected?: boolean;
    squared?: boolean;
    savedMessages?: boolean;
    dotColor?: string;
    customSizes?: AvatarSizesRecord;
}

export const AvatarSizes: {
    [key in UAvatarSize]: AvatarSizesRecord;
} = {
    'x-small': { size: 24, placeholder: 8, dotSize: 6, dotPosition: 0, dotBorderWidth: 1 },
    small: { size: 32, placeholder: 16, dotSize: 10, dotPosition: 0, dotBorderWidth: 2 },
    medium: { size: 40, placeholder: 20, dotSize: 12, dotPosition: 0, dotBorderWidth: 2 },
    large: { size: 56, placeholder: 24, dotSize: 12, dotPosition: 2, dotBorderWidth: 2 },
    'x-large': { size: 72, placeholder: 32, dotSize: 14, dotPosition: 4, dotBorderWidth: 2 },
    'xx-large': { size: 96, placeholder: 40, dotSize: 16, dotPosition: 6, dotBorderWidth: 2 },
    'xxx-large': { size: 128, placeholder: 40, dotSize: 16, dotPosition: 6, dotBorderWidth: 2 },
};

export const AvatarSavedMessages = (props: { squared?: boolean, bookmarkSize: number }) => {
    return (
        <XView
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            borderRadius={props.squared ? 0 : 100}
            backgroundImage="linear-gradient(135deg, #FFC619 0%, #FF7919 100%)"
            overflow="hidden"
        >
            <UIcon icon={<BookmarkIcon />} color="var(--foregroundContrast)" size={props.bookmarkSize} />
        </XView>
    );
};

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

export const AvatarImage = React.memo((props: UAvatarProps & { boxSize: number }) => {
    const { photo, uuid, boxSize, squared } = props;
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
    & svg {
      width: 100%;
      height: 100%;
    }
`;

const badgeBoxStyle = {
    position: 'absolute',
    bottom: 2,
    right: 2,
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 18,
    paddingVertical: 3,
    paddingHorizontal: 6,
} as XViewProps;

export const UAvatar = React.memo((props: UAvatarProps) => {
    const {
        id,
        photo,
        uuid,
        online,
        size = 'medium',
        selected,
        squared,
        savedMessages,
        badge,
        dotColor,
        customSizes,
        ...other
    } = props;
    let content: JSX.Element;
    let sizes = customSizes || AvatarSizes[size];
    if (savedMessages) {
        content = <AvatarSavedMessages squared={squared} bookmarkSize={sizes.placeholder} />;
    } else if (photo || uuid) {
        if (photo && photo.startsWith('ph://')) {
            content = <AvatarBauhaus name={props.id} size="100%" />;
        } else {
            content = <AvatarImage {...props} boxSize={sizes.size} />;
        }
    } else {
        content = <AvatarBauhaus name={props.id} size="100%" />;
    }

    const boxSize = sizes.size;

    const dotBorder = selected ? 'var(--accentMuted)' : 'var(--backgroundPrimary)';
    const dotBackground = dotColor ? dotColor : selected ? 'var(--foregroundContrast)' : 'var(--accentPrimary)';

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
                {!savedMessages && online && <OnlineDot size={size} />}
                {badge && badge.length > 0 && (
                    <XView {...badgeBoxStyle} backgroundColor="var(--backgroundTertiary)" borderColor="var(--backgroundPrimary)">
                        <XView {...TextStyles.Detail} color="var(--foregroundSecondary)">{badge}</XView>
                    </XView>
                )}
            </div>
        </XView>
    );
});
