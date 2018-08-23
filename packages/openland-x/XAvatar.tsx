import * as React from 'react';
import Glamorous from 'glamorous';
import { makeNavigable, NavigableParentProps } from './Navigable';
import { makeActionable, ActionableParentProps } from './Actionable';
import { XFlexStyles, applyFlex } from './basics/Flex';
import { styleResolver, styleResolverWithProps } from 'openland-x-utils/styleResolver';
import { XCloudImage, XPhotoRef } from './XCloudImage';
import PlaceholderOrg from './icons/avatar_org_large.svg';
import PlaceholderOrgSmall from './icons/avatar_org_small.svg';
import PlaceholderUser from './icons/avatar_user_large.svg';
import PlaceholderUserSmall from './icons/avatar_user_small.svg';
import PlaceholderChannel from './icons/avatar_community_large.svg';
import PlaceholderChannelSmall from './icons/avatar_community_small.svg';
import { XPImage } from 'openland-xp/XPImage';

export type XAvatarSize = 'x-large' | 'large' | 's-large' | 'medium' | 'default' | 'small';
export type XAvatarStyle = 'organization' | 'person' | 'channel';

export interface XAvatarStyleProps extends XFlexStyles {
    className?: string;
    size?: XAvatarSize;
    border?: string;
    style?: XAvatarStyle;
    attach?: 'left' | 'right' | 'both';
}

export type XAvatarProps = ActionableParentProps<NavigableParentProps<XAvatarStyleProps & { src?: string, cloudImageUuid?: string, photoRef?: XPhotoRef }>>;

let sizeStyles = styleResolver({
    'x-large': {
        height: 152,
        width: 152,
    },
    'large': {
        height: 130,
        width: 130,
    },
    's-large': {
        height: 100,
        width: 100,
    },
    'medium': {
        height: 46,
        width: 46,
    },
    'default': {
        height: 40,
        width: 40,
    },
    'small': {
        height: 36,
        width: 36,
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
                    {props.style === 'organization' && ((props.size === 'large' || props.size === 'x-large' || props.size === 's-large') ? <PlaceholderOrg /> : <PlaceholderOrgSmall />)}
                    {props.style === 'channel' && ((props.size === 'large' || props.size === 'x-large' || props.size === 's-large') ? <PlaceholderChannel /> : <PlaceholderChannelSmall />)}
                    {(props.style === undefined || props.style === 'person') && ((props.size === 'large' || props.size === 'x-large' || props.size === 's-large') ? <PlaceholderUser /> : <PlaceholderUserSmall />)}
                </StyledPlaceholder>
            )}
        </>
    );
}));

export const XAvatar = Glamorous(XAvatarRaw)();
