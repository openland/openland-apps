import * as React from 'react';
import { XView, XImage, XViewProps } from 'react-mental';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { doSimpleHash } from 'openland-y-utils/hash';
import { emoji } from 'openland-y-utils/emoji';
import { XMemo } from 'openland-y-utils/XMemo';

type UAvatarSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';

export interface UAvatarProps extends XViewProps {
    title: string;
    titleEmoji?: any;
    id: string;
    photo?: string | null;
    online?: boolean;
    size?: UAvatarSize;
}

export const PlaceholderColor = [
    'linear-gradient(138deg, #ffb600, #ff8d00)',
    'linear-gradient(138deg, #ff655d, #ff3d33)',
    'linear-gradient(138deg, #59d23c, #21ac00)',
    'linear-gradient(138deg, #11b2ff, #1970ff)',
    'linear-gradient(138deg, #00d1d4, #00afc8)',
    'linear-gradient(138deg, #aa22ff, #8e00e6)',
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

const AvatarImage = React.memo((props: UAvatarProps) => {
    const { photo, size = 'medium' } = props;
    const boxSize = AvatarSizes[size].size;

    let ops = '-/format/auto/-/scale_crop/' + (boxSize + 'x' + boxSize) + '/center/-/quality/best/-/progressive/yes/';
    let opsRetina =
        '-/format/auto/-/scale_crop/' +
        (boxSize * 2 + 'x' + boxSize * 2) +
        '/center/-/quality/best/-/progressive/yes/ 2x';

    return (
        <XImage
            width="100%"
            height="100%"
            src={photo + ops}
            srcSet={photo + opsRetina}
            borderRadius="100%"
            overflow="hidden"
            backgroundColor="var(--backgroundTertiary)"
        />
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
        borderColor="var(--backgroundPrimary)"
        backgroundColor="var(--accentPrimary)"
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
        borderColor="var(--backgroundPrimary)"
        backgroundColor="var(--accentPrimary)"
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
        borderColor="var(--backgroundPrimary)"
        backgroundColor="var(--accentPrimary)"
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
        borderColor="var(--backgroundPrimary)"
        backgroundColor="var(--accentPrimary)"
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
        borderColor="var(--backgroundPrimary)"
        backgroundColor="var(--accentPrimary)"
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
        borderColor="var(--backgroundPrimary)"
        backgroundColor="var(--accentPrimary)"
    />
);

export const UAvatar = XMemo<UAvatarProps>(props => {
    const { title, titleEmoji, id, photo, online, size = 'medium', ...other } = props;
    let content: any = undefined;

    if (photo) {
        if (photo.startsWith('ph://')) {
            const phIndex = parseInt(photo.substr(4), 10) || 0;
            content = <AvatarPlaceholder {...props} index={phIndex} />;
        } else {
            content = <AvatarImage {...props} />;
        }
    } else {
        const phIndex = Math.abs(doSimpleHash(id)) % 6;
        content = <AvatarPlaceholder {...props} index={phIndex} />;
    }

    const boxSize = AvatarSizes[size].size;

    return (
        <XView
            {...other}
            width={boxSize}
            height={boxSize}
            cursor={props.onClick || props.path ? 'pointer' : undefined}
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
        </XView>
    );
});
