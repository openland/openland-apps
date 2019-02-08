import * as React from 'react';
import { XView, XImage } from 'react-mental';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { doSimpleHash } from 'openland-y-utils/hash';
import { emoji } from 'openland-y-utils/emoji';

type XAvatarSize = 74 | 58 | 40 | 36 | 32 | 28 | 24;

export interface XAvatar2Props {
    title: string;
    id: string;
    src?: string | null;
    online?: boolean;
    size?: XAvatarSize;
}

const PlaceholderColor = [
    'linear-gradient(138deg, #ffb600, #ff8d00)',
    'linear-gradient(138deg, #ff655d, #ff3d33)',
    'linear-gradient(138deg, #59d23c, #21ac00)',
    'linear-gradient(138deg, #11b2ff, #1970ff)',
    'linear-gradient(138deg, #00d1d4, #00afc8)',
    'linear-gradient(138deg, #aa22ff, #8e00e6)',
];

const PlaceholderFontSize = {
    74: 26,
    58: 22,
    40: 16,
    36: 16,
    32: 15,
    28: 13,
    24: 12,
};

const AvatarPlaceholder = (props: XAvatar2Props) => {
    let ph = extractPlaceholder(props.title);
    let phIndex = Math.abs(doSimpleHash(props.id)) % PlaceholderColor.length;

    return (
        <XView
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            borderRadius={50}
            backgroundImage={PlaceholderColor[phIndex]}
            color="white"
            fontSize={PlaceholderFontSize[props.size || 40]}
            overflow="hidden"
            hoverTextDecoration="none"
        >
            {emoji(ph, 20)}
        </XView>
    );
};

const AvatarImage = (props: XAvatar2Props) => {
    let baseUrl = props.src;
    let size = props.size || 40;

    let ops = '-/format/jpeg/-/scale_crop/' + (size + 'x' + size) + '/center/-/progressive/yes/';
    let opsRetina =
        '-/format/jpeg/-/scale_crop/' +
        (size * 2 + 'x' + size * 2) +
        '/center/-/quality/lighter/-/progressive/yes/ 2x';

    return <XImage width="100%" height="100%" src={baseUrl + ops} srcSet={baseUrl + opsRetina} />;
};

const OnlineDot74 = () => (
    <XView
        position="absolute"
        bottom={6}
        right={6}
        width={10}
        height={10}
        borderRadius={5}
        borderWidth={1}
        borderColor="#ffffff"
        backgroundColor="#5eb2ff"
    />
);

const OnlineDot58 = () => (
    <XView
        position="absolute"
        bottom={3}
        right={3}
        width={10}
        height={10}
        borderRadius={5}
        borderWidth={1}
        borderColor="#ffffff"
        backgroundColor="#5eb2ff"
    />
);

const OnlineDot36 = () => (
    <XView
        position="absolute"
        bottom={1}
        right={1}
        width={8}
        height={8}
        borderRadius={4}
        borderWidth={1}
        borderColor="#ffffff"
        backgroundColor="#5eb2ff"
    />
);

const OnlineDot32 = () => (
    <XView
        position="absolute"
        bottom={1}
        right={1}
        width={7}
        height={7}
        borderRadius={4}
        borderWidth={1}
        borderColor="#ffffff"
        backgroundColor="#5eb2ff"
    />
);

const OnlineDot28 = () => (
    <XView
        position="absolute"
        bottom={0}
        right={0}
        width={7}
        height={7}
        borderRadius={4}
        borderWidth={1}
        borderColor="#ffffff"
        backgroundColor="#5eb2ff"
    />
);

const OnlineDot24 = () => (
    <XView
        position="absolute"
        bottom={0}
        right={0}
        width={6}
        height={6}
        borderRadius={3}
        borderWidth={1}
        borderColor="#ffffff"
        backgroundColor="#5eb2ff"
    />
);

const OnlineDot40 = () => (
    <XView
        position="absolute"
        bottom={1}
        right={1}
        width={8}
        height={8}
        borderRadius={4}
        borderWidth={1}
        borderColor="#ffffff"
        backgroundColor="#5eb2ff"
    />
);

interface AvatarContainerProps {
    content: any;
    online?: boolean;
}

const AvatarContainer74 = (props: AvatarContainerProps) => (
    <XView width={74} height={74}>
        <XView width="100%" height="100%" borderRadius={37} overflow="hidden">
            {props.content}
        </XView>

        {props.online && <OnlineDot74 />}
    </XView>
);

const AvatarContainer58 = (props: AvatarContainerProps) => (
    <XView width={58} height={58}>
        <XView width="100%" height="100%" borderRadius={29} overflow="hidden">
            {props.content}
        </XView>

        {props.online && <OnlineDot58 />}
    </XView>
);

const AvatarContainer36 = (props: AvatarContainerProps) => (
    <XView width={36} height={36}>
        <XView width="100%" height="100%" borderRadius={18} overflow="hidden">
            {props.content}
        </XView>

        {props.online && <OnlineDot36 />}
    </XView>
);

const AvatarContainer32 = (props: AvatarContainerProps) => (
    <XView width={32} height={32}>
        <XView width="100%" height="100%" borderRadius={16} overflow="hidden">
            {props.content}
        </XView>

        {props.online && <OnlineDot32 />}
    </XView>
);

const AvatarContainer28 = (props: AvatarContainerProps) => (
    <XView width={28} height={28}>
        <XView width="100%" height="100%" borderRadius={14} overflow="hidden">
            {props.content}
        </XView>

        {props.online && <OnlineDot28 />}
    </XView>
);

const AvatarContainer24 = (props: AvatarContainerProps) => (
    <XView width={24} height={24}>
        <XView width="100%" height="100%" borderRadius={12} overflow="hidden">
            {props.content}
        </XView>

        {props.online && <OnlineDot24 />}
    </XView>
);

const AvatarContainer40 = (props: AvatarContainerProps) => (
    <XView width={40} height={40}>
        <XView width="100%" height="100%" borderRadius={20} overflow="hidden">
            {props.content}
        </XView>

        {props.online && <OnlineDot40 />}
    </XView>
);

export const XAvatar2 = React.memo<XAvatar2Props>(props => {
    let content: any = undefined;

    if (props.src) {
        if (props.src.startsWith('ph://')) {
            content = <AvatarPlaceholder {...props} />;
        } else {
            content = <AvatarImage {...props} />;
        }
    } else {
        content = <AvatarPlaceholder {...props} />;
    }

    if (props.size === 74) {
        return <AvatarContainer74 content={content} online={props.online} />;
    } else if (props.size === 58) {
        return <AvatarContainer58 content={content} online={props.online} />;
    } else if (props.size === 36) {
        return <AvatarContainer36 content={content} online={props.online} />;
    } else if (props.size === 32) {
        return <AvatarContainer32 content={content} online={props.online} />;
    } else if (props.size === 28) {
        return <AvatarContainer28 content={content} online={props.online} />;
    } else if (props.size === 24) {
        return <AvatarContainer24 content={content} online={props.online} />;
    } else {
        return <AvatarContainer40 content={content} online={props.online} />;
    }
});
