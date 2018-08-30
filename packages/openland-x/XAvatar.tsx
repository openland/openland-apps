import * as React from 'react';
import Glamorous from 'glamorous';
import { makeNavigable, NavigableParentProps } from './Navigable';
import { makeActionable, ActionableParentProps } from './Actionable';
import { XFlexStyles, applyFlex } from './basics/Flex';
import { styleResolver, styleResolverWithProps } from 'openland-x-utils/styleResolver';
import { XCloudImage, XPhotoRef } from './XCloudImage';
import { XPImage } from 'openland-xp/XPImage';
import { doSimpleHash } from 'openland-y-utils/hash';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';

export type XAvatarSize = 'x-large' | 'large' | 's-large' | 'x-medium' | 's-medium' | 'medium' | 'default' | 'small' | 'x-small';
export type XAvatarStyle = 'organization' | 'person' | 'channel' | 'group' | 'colorus' | undefined;

export interface XAvatarStyleProps extends XFlexStyles {
    className?: string;
    size?: XAvatarSize;
    border?: string;
    style?: XAvatarStyle;
    attach?: 'left' | 'right' | 'both';
    userId?: string;
    userName?: string;
}

export type XAvatarProps = ActionableParentProps<NavigableParentProps<XAvatarStyleProps & { src?: string, cloudImageUuid?: string, photoRef?: XPhotoRef }>>;

let sizeStyles = styleResolver({
    'x-large': {
        height: 152,
        width: 152,
        fontSize: 16
    },
    'large': {
        height: 130,
        width: 130,
        fontSize: 16
    },
    's-large': {
        height: 100,
        width: 100,
        fontSize: 16
    },
    'x-medium': {
        height: 86,
        width: 86,
        fontSize: 16
    },
    's-medium': {
        height: 66,
        width: 66,
        fontSize: 16
    },
    'medium': {
        height: 46,
        width: 46,
        fontSize: 16
    },
    'default': {
        height: 40,
        width: 40,
        fontSize: 16
    },
    'small': {
        height: 36,
        width: 36,
        fontSize: 10
    },
    'x-small': {
        height: 18,
        width: 18,
        fontSize: 8
    }
});

let borderRadiusStyles = styleResolverWithProps((props: { style: XAvatarStyle, attach?: 'left' | 'right' | 'both' }) => ({
    'x-large': props.style === 'organization' ? {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 9,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 9,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 9,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 9,
    } : { borderRadius: 76 },
    'large': props.style === 'organization' ? {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 8,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 8,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 8,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 8,
    } : { borderRadius: 65 },
    's-large': props.style === 'organization' ? {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 8,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 8,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 8,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 8,
    } : { borderRadius: 65 },
    'x-medium': props.style === 'organization' ? {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 8,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 8,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 8,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 8,
    } : { borderRadius: 43 },
    's-medium': props.style === 'organization' ? {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 8,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 8,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 8,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 8,
    } : { borderRadius: 33 },
    'medium': props.style === 'organization' ? {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 5,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 5,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 5,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 5,
    } : { borderRadius: 24 },
    'default': props.style === 'organization' ? {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 4,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 4,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 4,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 4,
    } : { borderRadius: 20 },
    'small': props.style === 'organization' ? {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 3,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 3,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 3,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 3,
    } : { borderRadius: 18 },
    'x-small': props.style === 'organization' ? {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 3,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 3,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 3,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 3,
    } : { borderRadius: 9 },
}));

interface StyledAvatarProps extends XFlexStyles {
    avatarSize?: XAvatarSize;
    avatarStyle?: XAvatarStyle;
    attach?: 'left' | 'right' | 'both';
    src?: string;
}

const AvatarBehaviour = [
    (props: any) => ({
        display: 'flex',
        border: props.avatarBorder ? props.avatarBorder : (props as any).avatarStyle === 'organization' ? undefined : '1px solid rgba(164,169,177,0.2)',
        cursor: (props as any).enabled === false ? 'default' : 'pointer',
        src: props.src,
        flexShrink: 0
    }),
    (props: any) => applyFlex(props),
    (props: any) => ({
        width: sizeStyles(props.avatarSize).width,
        height: sizeStyles(props.avatarSize).height,
    }),
    (props: any) => borderRadiusStyles({ style: props.avatarStyle || 'person', attach: props.attach }, props.avatarSize)
];
const StyledAvatarSrc = Glamorous.img<StyledAvatarProps>(AvatarBehaviour);
const StyledAvatar = Glamorous.div<StyledAvatarProps>([...AvatarBehaviour,
(props: any) => ({
    overflow: 'hidden'
})]);

const StyledPlaceholder = Glamorous.div<StyledAvatarProps>([...AvatarBehaviour,
(props: any) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(51, 69, 98, 0.3)',
    overflow: 'hidden',
    '> svg': {
        width: '100%',
        height: '100%',
    },
    border: 'none'
})]);

const AvatarStub = Glamorous.div({
    width: '100%',
    height: '100%',
    backgroundImage: 'url(\'/static/img/avatars/user.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    '&.org-large': {
        backgroundImage: 'url(\'/static/img/avatars/org-large.svg\')',
    },
    '&.org-small': {
        backgroundImage: 'url(\'/static/img/avatars/org-small.svg\')',
    },
    '&.channel': {
        backgroundImage: 'url(\'/static/img/avatars/community.svg\')',
    },
    '&.group': {
        backgroundImage: 'url(\'/static/img/avatars/group.svg\')',
    },
    '&.user-large': {
        backgroundImage: 'url(\'/static/img/avatars/user-large.svg\')',
    },
    '&.user': {
        backgroundImage: 'url(\'/static/img/avatars/user.svg\')',
    }
});

const ColorusArr = [
    'linear-gradient(138deg, #ffb600, #ff8d00)',
    'linear-gradient(138deg, #ff655d, #ff3d33)',
    'linear-gradient(138deg, #59d23c, #21ac00)',
    'linear-gradient(138deg, #11b2ff, #1970ff)',
    'linear-gradient(138deg, #00d1d4, #00afc8)',
    'linear-gradient(138deg, #aa22ff, #8e00e6)'
];

const ColorusStub = Glamorous.div<{ backgroundImage: string, fontSize: number }>(props => ({
    width: '100%',
    height: '100%',
    backgroundImage: props.backgroundImage,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: props.fontSize,
    fontWeight: 500,
    letterSpacing: -0.2,
    color: '#fff'
}));

const XAvatarRaw = makeActionable(makeNavigable<XAvatarProps>((props) => {

    let avatarProps = {
        href: props.href,
        target: props.hrefTarget,
        avatarSize: props.size,
        avatarBorder: props.border,
        avatarStyle: props.style,
        attach: props.attach,
        flexBasis: props.flexBasis,
        flexGrow: props.flexGrow,
        flexShrink: props.flexShrink,
        alignSelf: props.alignSelf,
        onClick: props.onClick,
        className: props.className,
        zIndex: props.zIndex,
        src: props.src || undefined,
        enabled: !!(props.onClick)
    };

    let imageWidth = typeof props.size === 'number' ? props.size : sizeStyles(props.size).width as number;
    let imageHeight = typeof props.size === 'number' ? props.size : sizeStyles(props.size).height as number;
    let fontSize = typeof props.size === 'number' ? props.size : sizeStyles(props.size).fontSize as number;

    let initials = props.userName && extractPlaceholder(props.userName);
    return (
        <>
            {props.src && (
                <StyledAvatarSrc {...avatarProps} />
            )}
            {(props.photoRef || props.cloudImageUuid) && (
                <StyledAvatar {...avatarProps}>
                    <XPImage source={props.cloudImageUuid ? props.cloudImageUuid : props.photoRef!!} width={imageWidth} height={imageHeight} />
                </StyledAvatar>
            )}
            {!props.src && !(props.photoRef || props.cloudImageUuid) && (
                <StyledPlaceholder {...avatarProps} >
                    {props.style === 'organization' && ((props.size === 'large' || props.size === 'x-large' || props.size === 's-large') ? <AvatarStub className="org-large" /> : <AvatarStub className="org-small" />)}
                    {props.style === 'channel' && <AvatarStub className="channel" />}
                    {props.style === 'group' && <AvatarStub className="group" />}
                    {(props.style === undefined || props.style === 'person') && ((props.size === 'large' || props.size === 'x-large' || props.size === 's-large') ? <AvatarStub className="user-large" /> : <AvatarStub className="user" />)}
                    {props.style === 'colorus' && (
                        <ColorusStub
                            fontSize={fontSize}
                            backgroundImage={props.userId && ColorusArr[Math.abs(doSimpleHash(props.userId)) % ColorusArr.length] || ColorusArr[1]}
                        >
                            {initials}
                        </ColorusStub>
                    )}
                </StyledPlaceholder>
            )}
        </>
    );
}));

export const XAvatar = Glamorous(XAvatarRaw)();
