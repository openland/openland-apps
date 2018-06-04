import * as React from 'react';
import Glamorous from 'glamorous';
import { makeNavigable, NavigableParentProps } from './Navigable';
import { makeActionable, ActionableParentProps } from './Actionable';
import { XFlexStyles, applyFlex } from './Flex';
import { styleResolver, styleResolverWithProps } from 'openland-x-utils/styleResolver';
import { XIcon } from './XIcon';
import { XCloudImage, XImageCrop } from './XCloudImage';

export type XAvatarSize = 'x-large' | 'large' | 'medium' | 'default' | 'small';
export type XAvatarStyle = 'square' | 'circle';

export interface XAvatarStyleProps extends XFlexStyles {
    className?: string;
    size?: XAvatarSize;
    style?: XAvatarStyle;
    attach?: 'left' | 'right' | 'both';
}

export type XAvatarProps = ActionableParentProps<NavigableParentProps<XAvatarStyleProps & { src?: string, cloudImageUuid?: string, crop?: XImageCrop | null, }>>;

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
        height: 32,
        width: 32,
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
    'x-large': props.style === 'square' ? {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 9,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 9,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 9,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 9,
    } : { borderRadius: 76 },
    'large': props.style === 'square' ? {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 8,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 8,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 8,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 8,
    } : { borderRadius: 65 },
    'medium': props.style === 'square' ? {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 5,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 5,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 5,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 5,
    } : { borderRadius: 24 },
    'default': props.style === 'square' ? {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 4,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 4,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 4,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 4,
    } : { borderRadius: 20 },
    'small': props.style === 'square' ? {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 3,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 3,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 3,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 3,
    } : { borderRadius: 16 },
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
        boxShadow: '0 2px 5px 0 rgba(49,49,93,.1), 0 1px 2px 0 rgba(0,0,0,.08)',
        cursor: (props as any).enabled === false ? 'default' : 'pointer',
        src: props.src,
    }),
    (props: any) => applyFlex(props),
    (props: any) => sizeStyles(props.avatarSize),
    (props: any) => borderRadiusStyles({ style: props.avatarStyle || 'circle', attach: props.attach }, props.avatarSize)
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
    };

    console.warn(props.cloudImageUuid);

    return (
        <>
            {props.src && <StyledAvatar {...avatarProps} />}
            {props.cloudImageUuid && <StyledPlaceholder {...avatarProps} ><XCloudImage crop={props.crop}  resize="fill" srcPrefix={props.cloudImageUuid} maxWidth={sizeStyles(props.size).width as number} maxHeight={sizeStyles(props.size).height as number}/></StyledPlaceholder>}
            {!props.src && !props.cloudImageUuid && <StyledPlaceholder {...avatarProps} ><Placeholder size={avatarProps.avatarSize}  icon={props.style === 'square' ? 'account_box' : 'account_circle'} /></StyledPlaceholder>}
        </>
    );
}));

export const XAvatar = Glamorous(XAvatarRaw)();
