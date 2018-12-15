import * as React from 'react';
import { XView } from 'react-mental';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { doSimpleHash } from 'openland-y-utils/hash';

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

let getOps = (size: XAvatarSize): string => (
    '-/format/jpeg/-/scale_crop/' + (size + 'x' + size) + '/center/-/progressive/yes/'
);

let getOpsRetina = (size: XAvatarSize): string => (
    '-/format/jpeg/-/scale_crop/' + ((size * 2) + 'x' + (size * 2)) + '/center/-/quality/lighter/-/progressive/yes/ 2x'
);

const AvatarContainer74 = React.memo<XAvatar2Props>(props => {
    let contents: any = undefined;

    if (props.src) {
        if (props.src.startsWith('ph://')) {
            let ph = extractPlaceholder(props.title);
            let phIndex = Math.abs(doSimpleHash(props.id)) % PlaceholderColor.length;

            contents = (
                <XView
                    width={74}
                    height={74}
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={37}
                    backgroundImage={PlaceholderColor[phIndex]}
                    color="white"
                    fontSize={26}
                    overflow="hidden"
                >
                    {ph}
                </XView>
            );
        } else {
            let baseUrl = props.src;
            let ops = getOps(74);
            let opsRetina = getOpsRetina(74);

            contents = (
                <XView
                    as="img"
                    width={74}
                    height={74}
                    borderRadius={37}
                    src={baseUrl + ops}
                    srcSet={baseUrl + opsRetina}
                />
            );
        }
    }

    let online: any = undefined;

    if (props.online) {
        online = (
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
    }

    return (
        <XView width={74} height={74} borderRadius={37}>
            {contents}
            {online}
        </XView>
    );
});

const AvatarContainer58 = React.memo<XAvatar2Props>(props => {
    let contents: any = undefined;

    if (props.src) {
        if (props.src.startsWith('ph://')) {
            let ph = extractPlaceholder(props.title);
            let phIndex = Math.abs(doSimpleHash(props.id)) % PlaceholderColor.length;

            contents = (
                <XView
                    width={58}
                    height={58}
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={29}
                    backgroundImage={PlaceholderColor[phIndex]}
                    color="white"
                    fontSize={22}
                    overflow="hidden"
                >
                    {ph}
                </XView>
            );
        } else {
            let baseUrl = props.src;
            let ops = getOps(58);
            let opsRetina = getOpsRetina(58);

            contents = (
                <XView
                    as="img"
                    width={58}
                    height={58}
                    borderRadius={29}
                    src={baseUrl + ops}
                    srcSet={baseUrl + opsRetina}
                />
            );
        }
    }

    let online: any = undefined;

    if (props.online) {
        online = (
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
    }

    return (
        <XView width={58} height={58} borderRadius={29}>
            {contents}
            {online}
        </XView>
    );
});

const AvatarContainer36 = React.memo<XAvatar2Props>(props => {
    let contents: any = undefined;

    if (props.src) {
        if (props.src.startsWith('ph://')) {
            let ph = extractPlaceholder(props.title);
            let phIndex = Math.abs(doSimpleHash(props.id)) % PlaceholderColor.length;

            contents = (
                <XView
                    width={36}
                    height={36}
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={18}
                    backgroundImage={PlaceholderColor[phIndex]}
                    color="white"
                    fontSize={16}
                    overflow="hidden"
                >
                    {ph}
                </XView>
            );
        } else {
            let baseUrl = props.src;
            let ops = getOps(36);
            let opsRetina = getOpsRetina(36);

            contents = (
                <XView
                    as="img"
                    width={36}
                    height={36}
                    borderRadius={18}
                    src={baseUrl + ops}
                    srcSet={baseUrl + opsRetina}
                />
            );
        }
    }

    let online: any = undefined;

    if (props.online) {
        online = (
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
    }

    return (
        <XView width={36} height={36} borderRadius={18}>
            {contents}
            {online}
        </XView>
    );
});

const AvatarContainer32 = React.memo<XAvatar2Props>(props => {
    let contents: any = undefined;

    if (props.src) {
        if (props.src.startsWith('ph://')) {
            let ph = extractPlaceholder(props.title);
            let phIndex = Math.abs(doSimpleHash(props.id)) % PlaceholderColor.length;

            contents = (
                <XView
                    width={32}
                    height={32}
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={16}
                    backgroundImage={PlaceholderColor[phIndex]}
                    color="white"
                    fontSize={15}
                    overflow="hidden"
                >
                    {ph}
                </XView>
            );
        } else {
            let baseUrl = props.src;
            let ops = getOps(32);
            let opsRetina = getOpsRetina(32);

            contents = (
                <XView
                    as="img"
                    width={32}
                    height={32}
                    borderRadius={16}
                    src={baseUrl + ops}
                    srcSet={baseUrl + opsRetina}
                />
            );
        }
    }

    let online: any = undefined;

    if (props.online) {
        online = (
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
    }

    return (
        <XView width={32} height={32} borderRadius={16}>
            {contents}
            {online}
        </XView>
    );
});

const AvatarContainer28 = React.memo<XAvatar2Props>(props => {
    let contents: any = undefined;

    if (props.src) {
        if (props.src.startsWith('ph://')) {
            let ph = extractPlaceholder(props.title);
            let phIndex = Math.abs(doSimpleHash(props.id)) % PlaceholderColor.length;

            contents = (
                <XView
                    width={28}
                    height={28}
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={14}
                    backgroundImage={PlaceholderColor[phIndex]}
                    color="white"
                    fontSize={13}
                    fontWeight="600"
                    overflow="hidden"
                >
                    {ph}
                </XView>
            );
        } else {
            let baseUrl = props.src;
            let ops = getOps(28);
            let opsRetina = getOpsRetina(28);

            contents = (
                <XView
                    as="img"
                    width={28}
                    height={28}
                    borderRadius={14}
                    src={baseUrl + ops}
                    srcSet={baseUrl + opsRetina}
                />
            );
        }
    }

    let online: any = undefined;

    if (props.online) {
        online = (
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
    }

    return (
        <XView width={28} height={28} borderRadius={14}>
            {contents}
            {online}
        </XView>
    );
});

const AvatarContainer24 = React.memo<XAvatar2Props>(props => {
    let contents: any = undefined;

    if (props.src) {
        if (props.src.startsWith('ph://')) {
            let ph = extractPlaceholder(props.title);
            let phIndex = Math.abs(doSimpleHash(props.id)) % PlaceholderColor.length;

            contents = (
                <XView
                    width={24}
                    height={24}
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={12}
                    backgroundImage={PlaceholderColor[phIndex]}
                    color="white"
                    fontSize={12}
                    fontWeight="600"
                    overflow="hidden"
                >
                    {ph}
                </XView>
            );
        } else {
            let baseUrl = props.src;
            let ops = getOps(24);
            let opsRetina = getOpsRetina(24);

            contents = (
                <XView
                    as="img"
                    width={24}
                    height={24}
                    borderRadius={12}
                    src={baseUrl + ops}
                    srcSet={baseUrl + opsRetina}
                />
            );
        }
    }

    let online: any = undefined;

    if (props.online) {
        online = (
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
    }

    return (
        <XView width={24} height={24} borderRadius={12}>
            {contents}
            {online}
        </XView>
    );
});

// Default

const AvatarContainer40 = React.memo<XAvatar2Props>(props => {
    let contents: any = undefined;

    if (props.src) {
        if (props.src.startsWith('ph://')) {
            let ph = extractPlaceholder(props.title);
            let phIndex = Math.abs(doSimpleHash(props.id)) % PlaceholderColor.length;

            contents = (
                <XView
                    width={40}
                    height={40}
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={20}
                    backgroundImage={PlaceholderColor[phIndex]}
                    color="white"
                    fontSize={16}
                    overflow="hidden"
                >
                    {ph}
                </XView>
            );
        } else {
            let baseUrl = props.src;
            let ops = getOps(40);
            let opsRetina = getOpsRetina(40);

            contents = (
                <XView
                    as="img"
                    width={40}
                    height={40}
                    borderRadius={20}
                    src={baseUrl + ops}
                    srcSet={baseUrl + opsRetina}
                />
            );
        }
    }

    let online: any = undefined;

    if (props.online) {
        online = (
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
    }

    return (
        <XView width={40} height={40} borderRadius={20}>
            {contents}
            {online}
        </XView>
    );
});

export const XAvatar2 = (props: XAvatar2Props) => {
    if (props.size === 74) {
        return <AvatarContainer74 {...props} />
    } else if (props.size === 58) {
        return <AvatarContainer58 {...props} />
    } else if (props.size === 36) {
        return <AvatarContainer36 {...props} />
    } else if (props.size === 32) {
        return <AvatarContainer32 {...props} />
    } else if (props.size === 28) {
        return <AvatarContainer28 {...props} />
    } else if (props.size === 24) {
        return <AvatarContainer24 {...props} />
    } else {
        return <AvatarContainer40 {...props} />
    }
};