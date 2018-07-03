import * as React from 'react';
import Glamorous from 'glamorous';
import { makeNavigable, NavigableParentProps } from './Navigable';
import { makeActionable, ActionableParentProps } from './Actionable';
import { XFlexStyles, applyFlex } from './basics/Flex';
import { styleResolver, styleResolverWithProps } from 'openland-x-utils/styleResolver';
import { XIcon } from './XIcon';
import { XCloudImage, XPhotoRef } from './XCloudImage';

export type XAvatarSize = 'x-large' | 'large' | 'medium' | 'default' | 'small';
export type XAvatarStyle = 'organization' | 'person';

export interface XAvatarStyleProps extends XFlexStyles {
    className?: string;
    size?: XAvatarSize;
    style?: XAvatarStyle;
    attach?: 'left' | 'right' | 'both';
}

export type XAvatarProps = ActionableParentProps<NavigableParentProps<XAvatarStyleProps & { src?: string, cloudImageUuid?: string, photoRef?: XPhotoRef }>>;

let sizeStyles = styleResolver({
    'x-large': {
        height: 152,
        width: 152,
        fontSize: 20,
    },
    'large': {
        height: 130,
        width: 130,
        fontSize: 20,
    },
    'medium': {
        height: 48,
        width: 48,
        fontSize: 20,
    },
    'default': {
        height: 40,
        width: 40,
        fontSize: 20,
    },
    'small': {
        height: 36,
        width: 36,
        fontSize: 20,
    }
});

let placeHolderFontStyle = styleResolver({
    'x-large': {
        fontSize: 152,
    },
    'large': {
        fontSize: 128,
    },
    'medium': {
        fontSize: 39,
    },
    'default': {
        fontSize: 30,
    },
    'small': {
        fontSize: 23,
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
        border: (props as any).avatarStyle === 'organization' ? undefined : '1px solid rgba(164,169,177,0.2)',
        cursor: (props as any).enabled === false ? 'default' : 'pointer',
        src: props.src,
        flexShrink: 0
    }),
    (props: any) => applyFlex(props),
    (props: any) => sizeStyles(props.avatarSize),
    (props: any) => borderRadiusStyles({ style: props.avatarStyle || 'person', attach: props.attach }, props.avatarSize)
];
const StyledAvatar = Glamorous.img<StyledAvatarProps>(AvatarBehaviour);
const StyledPlaceholder = Glamorous.div<StyledAvatarProps>([...AvatarBehaviour,
(props: any) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(51, 69, 98, 0.3)',
    overflow: 'hidden'
})]);

const Placeholder = Glamorous(XIcon)<{ size?: XAvatarSize }>((props) => placeHolderFontStyle(props.size));

const XAvatarRaw = makeActionable(makeNavigable<XAvatarProps>((props) => {

    let avatarProps = {
        href: props.href,
        target: props.hrefTarget,
        avatarSize: props.size,
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

    return (
        <>
            {props.src && (
                <StyledAvatar {...avatarProps} />
            )}
            {(props.photoRef || props.cloudImageUuid) && (
                <StyledPlaceholder {...avatarProps}>
                    <XCloudImage resize="fill" srcCloud={props.cloudImageUuid} photoRef={props.photoRef} maxWidth={sizeStyles(props.size).width as number} maxHeight={sizeStyles(props.size).height as number} />
                </StyledPlaceholder>
            )}
            {!props.src && !(props.photoRef || props.cloudImageUuid) && (
                <StyledPlaceholder {...avatarProps} >
                    <Placeholder size={avatarProps.avatarSize} icon={props.style === 'organization' ? 'domain' : 'account_circle'} />
                </StyledPlaceholder>
            )}
        </>
    );
}));

export const XAvatar = Glamorous(XAvatarRaw)();
