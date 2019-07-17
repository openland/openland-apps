import * as React from 'react';
import { XView, XImage } from 'react-mental';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { doSimpleHash } from 'openland-y-utils/hash';
import { emoji } from 'openland-y-utils/emoji';
import { XMemo } from 'openland-y-utils/XMemo';

type UAvatarSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';

export interface UAvatarProps {
    title: string;
    titleEmoji?: any;
    key: string;
    photo?: string | null;
    online?: boolean;
    size?: UAvatarSize;
}

const PlaceholderColor = [
    'linear-gradient(138deg, #ffb600, #ff8d00)',
    'linear-gradient(138deg, #ff655d, #ff3d33)',
    'linear-gradient(138deg, #59d23c, #21ac00)',
    'linear-gradient(138deg, #11b2ff, #1970ff)',
    'linear-gradient(138deg, #00d1d4, #00afc8)',
    'linear-gradient(138deg, #aa22ff, #8e00e6)',
];

const AvatarSizes: { [key in UAvatarSize]: { size: number, placeholder: number, dotSize: number, dotPosition: number, dotBorderWidth: number }} = {
    'x-small': { size: 24, placeholder: 8, dotSize: 6, dotPosition: 0, dotBorderWidth: 1 },
    'small': { size: 32, placeholder: 16, dotSize: 10, dotPosition: 0, dotBorderWidth: 2 },
    'medium': { size: 40, placeholder: 20, dotSize: 12, dotPosition: 0, dotBorderWidth: 2 },
    'large': { size: 56, placeholder: 24, dotSize: 12, dotPosition: 2, dotBorderWidth: 2 },
    'x-large': { size: 72, placeholder: 32, dotSize: 14, dotPosition: 4, dotBorderWidth: 2 },
    'xx-large': { size: 96, placeholder: 40, dotSize: 16, dotPosition: 6, dotBorderWidth: 2 },
};

const AvatarPlaceholder = React.memo((props: UAvatarProps) => {
    const { title, titleEmoji, key, size = 'medium' } = props;
    const ph = extractPlaceholder(title);
    const phIndex = Math.abs(doSimpleHash(key)) % PlaceholderColor.length;

    return (
        <XView
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            borderRadius={50}
            backgroundImage={PlaceholderColor[phIndex]}
            color="white"
            fontSize={AvatarSizes[size].placeholder}
            overflow="hidden"
            hoverTextDecoration="none"
        >
            {titleEmoji ||
                emoji({
                    src: ph,
                    size: 20,
                    cache: true,
                })}
        </XView>
    );
});

const AvatarImage = (props: UAvatarProps) => {
    const { photo, size = 'medium' } = props;
    const boxSize = AvatarSizes[size].size;

    let ops = '-/format/jpeg/-/scale_crop/' + (boxSize + 'x' + boxSize) + '/center/-/progressive/yes/';
    let opsRetina =
        '-/format/jpeg/-/scale_crop/' +
        (boxSize * 2 + 'x' + boxSize * 2) +
        '/center/-/quality/lighter/-/progressive/yes/ 2x';

    return (
        <XImage
            width="100%"
            height="100%"
            src={photo + ops}
            srcSet={photo + opsRetina}
            borderRadius="100%"
            overflow="hidden"
        />
    );
};

const OnlineDotXXLarge = () => (
    <XView
        position="absolute"
        bottom={6}
        right={6}
        width={16}
        height={16}
        borderRadius={8}
        borderWidth={2}
        borderColor="#ffffff" // ThemeDefault.backgroundPrimary
        backgroundColor="#0C7FF2" // ThemeDefault.accentPrimary
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
        borderColor="#ffffff" // ThemeDefault.backgroundPrimary
        backgroundColor="#0C7FF2" // ThemeDefault.accentPrimary
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
        borderColor="#ffffff" // ThemeDefault.backgroundPrimary
        backgroundColor="#0C7FF2" // ThemeDefault.accentPrimary
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
        borderColor="#ffffff" // ThemeDefault.backgroundPrimary
        backgroundColor="#0C7FF2" // ThemeDefault.accentPrimary
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
        borderColor="#ffffff" // ThemeDefault.backgroundPrimary
        backgroundColor="#0C7FF2" // ThemeDefault.accentPrimary
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
        borderColor="#ffffff" // ThemeDefault.backgroundPrimary
        backgroundColor="#0C7FF2" // ThemeDefault.accentPrimary
    />
);

interface AvatarContainerProps {
    content: any;
    online?: boolean;
}

const AvatarContainerXXLarge = (props: AvatarContainerProps) => (
    <XView width={96} height={96}>
        <XView width="100%" height="100%" borderRadius={48} overflow="hidden">
            {props.content}
        </XView>

        {props.online && <OnlineDotXXLarge />}
    </XView>
);

const AvatarContainerXLarge = (props: AvatarContainerProps) => (
    <XView width={72} height={72}>
        <XView width="100%" height="100%" borderRadius={36} overflow="hidden">
            {props.content}
        </XView>

        {props.online && <OnlineDotXLarge />}
    </XView>
);

const AvatarContainerLarge = (props: AvatarContainerProps) => (
    <XView width={56} height={56}>
        <XView width="100%" height="100%" borderRadius={28} overflow="hidden">
            {props.content}
        </XView>

        {props.online && <OnlineDotLarge />}
    </XView>
);

const AvatarContainerMedium = (props: AvatarContainerProps) => (
    <XView width={40} height={40}>
        <XView width="100%" height="100%" borderRadius={20} overflow="hidden">
            {props.content}
        </XView>

        {props.online && <OnlineDotMedium />}
    </XView>
);

const AvatarContainerSmall = (props: AvatarContainerProps) => (
    <XView width={32} height={32}>
        <XView width="100%" height="100%" borderRadius={16} overflow="hidden">
            {props.content}
        </XView>

        {props.online && <OnlineDotSmall />}
    </XView>
);

const AvatarContainerXSmall = (props: AvatarContainerProps) => (
    <XView width={24} height={24}>
        <XView width="100%" height="100%" borderRadius={12} overflow="hidden">
            {props.content}
        </XView>

        {props.online && <OnlineDotXSmall />}
    </XView>
);

export const UAvatar = XMemo<UAvatarProps>(props => {
    const { photo, size = 'medium' } = props;
    let content: any = undefined;

    if (photo) {
        if (photo.startsWith('ph://')) {
            content = <AvatarPlaceholder {...props} />;
        } else {
            content = <AvatarImage {...props} />;
        }
    } else {
        content = <AvatarPlaceholder {...props} />;
    }

    if (size === 'x-small') {
        return <AvatarContainerXSmall content={content} online={props.online} />;
    } else if (size === 'small') {
        return <AvatarContainerSmall content={content} online={props.online} />;
    } else if (size === 'medium') {
        return <AvatarContainerMedium content={content} online={props.online} />;
    } else if (size === 'large') {
        return <AvatarContainerLarge content={content} online={props.online} />;
    } else if (size === 'x-large') {
        return <AvatarContainerXLarge content={content} online={props.online} />;
    } else {
        return <AvatarContainerXXLarge content={content} online={props.online} />;
    }
});
