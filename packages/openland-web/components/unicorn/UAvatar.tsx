import * as React from 'react';
import { XView, XImage, XViewProps } from 'react-mental';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { doSimpleHash } from 'openland-y-utils/hash';
import { emoji } from 'openland-y-utils/emoji';
import { XMemo } from 'openland-y-utils/XMemo';
import { css } from 'linaria';
import { PlaceholderOrange, PlaceholderRed, PlaceholderGreen, PlaceholderBlue, PlaceholderCyan, PlaceholderPurple } from 'openland-y-utils/themes/placeholders';

type UAvatarSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';

export interface UAvatarProps extends XViewProps {
    title: string;
    titleEmoji?: any;
    id: string;
    photo?: string | null;
    online?: boolean;
    size?: UAvatarSize;
    selected?: boolean;
}

export const PlaceholderColor = [
    `linear-gradient(138deg, ${PlaceholderOrange.start}, ${PlaceholderOrange.end})`,
    `linear-gradient(138deg, ${PlaceholderRed.start}, ${PlaceholderRed.end})`,
    `linear-gradient(138deg, ${PlaceholderGreen.start}, ${PlaceholderGreen.end})`,
    `linear-gradient(138deg, ${PlaceholderBlue.start}, ${PlaceholderBlue.end})`,
    `linear-gradient(138deg, ${PlaceholderCyan.start}, ${PlaceholderCyan.end})`,
    `linear-gradient(138deg, ${PlaceholderPurple.start}, ${PlaceholderPurple.end})`,
];

const AvatarSizes: { [key in UAvatarSize]: { size: number, placeholder: number, dotSize: number, dotPosition: number, dotBorderWidth: number } } = {
    'x-small': { size: 24, placeholder: 8, dotSize: 6, dotPosition: 0, dotBorderWidth: 1 },
    'small': { size: 32, placeholder: 16, dotSize: 10, dotPosition: 0, dotBorderWidth: 2 },
    'medium': { size: 40, placeholder: 20, dotSize: 12, dotPosition: 0, dotBorderWidth: 2 },
    'large': { size: 56, placeholder: 24, dotSize: 12, dotPosition: 2, dotBorderWidth: 2 },
    'x-large': { size: 72, placeholder: 32, dotSize: 14, dotPosition: 4, dotBorderWidth: 2 },
    'xx-large': { size: 96, placeholder: 40, dotSize: 16, dotPosition: 6, dotBorderWidth: 2 },
};

const AvatarPlaceholder = React.memo((props: UAvatarProps & { index: number }) => {
    const { title, titleEmoji, index, size = 'medium' } = props;
    const ph = extractPlaceholder(title);

    return (
        <XView
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            borderRadius={50}
            backgroundImage={PlaceholderColor[index]}
            color="white"
            fontSize={AvatarSizes[size].placeholder}
            overflow="hidden"
            hoverTextDecoration="none"
        >
            {titleEmoji ||
                emoji(ph)}
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

const AvatarImage = React.memo((props: UAvatarProps) => {
    const { photo, size = 'medium' } = props;
    const boxSize = AvatarSizes[size].size;

    let ops = '-/format/auto/-/scale_crop/' + (boxSize + 'x' + boxSize) + '/center/-/quality/best/-/progressive/yes/';
    let opsRetina =
        '-/format/auto/-/scale_crop/' +
        (boxSize * 2 + 'x' + boxSize * 2) +
        '/center/-/quality/best/-/progressive/yes/ 2x';

    return (
        <div className={imageWrapper} style={{ width: boxSize, height: boxSize }}>
            <XImage
                width="100%"
                height="100%"
                src={photo + ops}
                srcSet={photo + opsRetina}
                borderRadius="100%"
                overflow="hidden"
            />
        </div>
    );
});

export const AvatarSquare = React.memo((props: UAvatarProps) => {
    const { photo } = props;
    const boxSize = 144;

    let ops = '-/format/auto/-/scale_crop/' + (boxSize + 'x' + boxSize) + '/center/-/quality/best/-/progressive/yes/';
    let opsRetina =
        '-/format/auto/-/scale_crop/' +
        (boxSize * 2 + 'x' + boxSize * 2) +
        '/center/-/quality/best/-/progressive/yes/ 2x';

    return (
        <div style={{ width: boxSize, height: boxSize }}>
            <XImage
                width="100%"
                height="100%"
                src={photo + ops}
                srcSet={photo + opsRetina}
                overflow="hidden"
            />
        </div>
    );
});

const OnlineDotXXLarge = () => (
    <XView
        position="absolute"
        bottom={6}
        right={6}
        width={16}
        height={16}
        borderRadius={8}
        borderWidth={2}
        borderColor="var(--dotBorder)"
        backgroundColor="var(--dotBackground)"
        zIndex={2}
    />
);

const OnlineDotXLarge = () => (
    <XView
        position="absolute"
        bottom={4}
        right={4}
        width={14}
        height={14}
        borderRadius={7}
        borderWidth={2}
        borderColor="var(--dotBorder)"
        backgroundColor="var(--dotBackground)"
        zIndex={2}
    />
);

const OnlineDotLarge = () => (
    <XView
        position="absolute"
        bottom={2}
        right={2}
        width={12}
        height={12}
        borderRadius={6}
        borderWidth={2}
        borderColor="var(--dotBorder)"
        backgroundColor="var(--dotBackground)"
        zIndex={2}
    />
);

const OnlineDotMedium = () => (
    <XView
        position="absolute"
        bottom={0}
        right={0}
        width={12}
        height={12}
        borderRadius={6}
        borderWidth={2}
        borderColor="var(--dotBorder)"
        backgroundColor="var(--dotBackground)"
        zIndex={2}
    />
);

const OnlineDotSmall = () => (
    <XView
        position="absolute"
        bottom={0}
        right={0}
        width={10}
        height={10}
        borderRadius={5}
        borderWidth={2}
        borderColor="var(--dotBorder)"
        backgroundColor="var(--dotBackground)"
        zIndex={2}
    />
);

const OnlineDotXSmall = () => (
    <XView
        position="absolute"
        bottom={0}
        right={0}
        width={6}
        height={6}
        borderRadius={3}
        borderWidth={1}
        borderColor="var(--dotBorder)"
        backgroundColor="var(--dotBackground)"
        zIndex={2}
    />
);

const colorProvider = css`
    display: flex;
    flex-grow: 1;
`;

export const UAvatar = XMemo<UAvatarProps>(props => {
    const { title, titleEmoji, id, photo, online, size = 'medium', selected, ...other } = props;
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
        <XView
            {...other}
            cursor={props.onClick || props.path ? 'pointer' : undefined}
        >
            <div
                className={colorProvider}
                style={{ width: boxSize, height: boxSize, '--dotBorder': dotBorder, '--dotBackground': dotBackground } as React.CSSProperties}
            >
                <XView width="100%" height="100%" borderRadius={boxSize / 2} overflow="hidden">
                    {content}
                </XView>

                {online && size === 'x-small' && <OnlineDotXSmall />}
                {online && size === 'small' && <OnlineDotSmall />}
                {online && size === 'medium' && <OnlineDotMedium />}
                {online && size === 'large' && <OnlineDotLarge />}
                {online && size === 'x-large' && <OnlineDotXLarge />}
                {online && size === 'xx-large' && <OnlineDotXXLarge />}
            </div>
        </XView >
    );
});
