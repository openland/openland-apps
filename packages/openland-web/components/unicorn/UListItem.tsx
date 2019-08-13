import * as React from 'react';
import { XView, XViewSelectedContext, XViewProps } from 'react-mental';
import { ThemeDefault } from 'openland-y-utils/themes';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { UAvatar } from './UAvatar';
import { UIcon } from './UIcon';

const SelectableSVG = React.memo((props: { icon: JSX.Element }) => {
    const selected = React.useContext(XViewSelectedContext);

    return <UIcon icon={props.icon} color={selected ? ThemeDefault.foregroundInverted : ThemeDefault.foregroundSecondary} />;
});

export const SelectableText = React.memo((props: XViewProps) => {
    const selected = React.useContext(XViewSelectedContext);

    return (
        <XView
            {...props}
            color={selected ? props.selectedColor : props.color}
        >
            {props.children}
        </XView>
    );
});

interface UListItemProps {
    title: string | JSX.Element;
    titleIcon?: JSX.Element;
    subtitle?: string;
    description?: string | JSX.Element | null;
    descriptionColor?: string;
    icon?: JSX.Element;
    iconBackground?: string;
    iconColor?: string;
    avatar?: { photo?: string | null, id: string, title: string, online?: boolean };
    onClick?: (event: React.MouseEvent) => void;
    path?: string;
    large?: boolean;
    useRadius?: boolean;
    textRight?: string;
    rightElement?: JSX.Element;
    hovered?: boolean;
    disabled?: boolean;
}

export const UListItem = React.memo((props: UListItemProps) => {
    const { title, titleIcon, subtitle, description, descriptionColor, icon, iconBackground, iconColor, avatar, onClick, path, large, useRadius, textRight, rightElement, hovered, disabled } = props;
    const height = large ? 80 : ((!!avatar || !!iconBackground) ? 56 : 48);

    const titleFont = !!description ? TextStyles.Label1 : TextStyles.Body;
    const subtitleFont = TextStyles.Caption;
    const descriptionFont = large ? TextStyles.Densed : TextStyles.Caption;
    const textRightFont = TextStyles.Body;

    const content = (
        <>
            {!!icon && !iconBackground && <XView marginRight={16} width={24} height={24} alignItems="center" justifyContent="center"><SelectableSVG icon={icon} /></XView>}
            {!!icon && !!iconBackground && <XView marginRight={16} width={40} height={40} borderRadius={20} backgroundColor={iconBackground} alignItems="center" justifyContent="center"><UIcon icon={icon} color={iconColor || '#FFFFFF'} /></XView>}
            {!!avatar && !icon && (
                <XView marginRight={16}>
                    <UAvatar {...avatar} size={large ? 'large' : 'medium'} />
                </XView>
            )}

            <XView flexDirection="column" flexGrow={1} flexShrink={1} flexBasis={0}>
                <XView flexDirection="row" alignItems="center" overflow="hidden">
                    {!!titleIcon && (
                        <XView>
                            {titleIcon}
                        </XView>
                    )}
                    <SelectableText {...titleFont} color={ThemeDefault.foregroundPrimary} selectedColor={ThemeDefault.foregroundInverted}>
                        {title}
                    </SelectableText>

                    {!!subtitle && (
                        <SelectableText {...subtitleFont} color={ThemeDefault.foregroundTertiary} selectedColor={ThemeDefault.foregroundInverted} marginLeft={8}>
                            {subtitle}
                        </SelectableText>
                    )}
                </XView>

                {!!description && (
                    <SelectableText {...descriptionFont} color={descriptionColor ? descriptionColor : ThemeDefault.foregroundTertiary} selectedColor={ThemeDefault.foregroundInverted} textOverflow="ellipsis" height={descriptionFont.lineHeight} white-space="nowrap" overflow="hidden">
                        {description}
                    </SelectableText>
                )}
            </XView>

            {!!textRight && (
                <SelectableText {...textRightFont} color={ThemeDefault.foregroundTertiary} selectedColor={ThemeDefault.foregroundInverted}>
                    {textRight}
                </SelectableText>
            )}

            {!!rightElement && (
                <XView marginRight={-8}>
                    {rightElement}
                </XView>
            )}
        </>
    );

    if (disabled) {
        return (
            <XView
                height={height}
                paddingHorizontal={16}
                alignItems="center"
                flexDirection="row"
                opacity={0.4}
            >
                {content}
            </XView>
        );
    }

    return (
        <XView
            height={height}
            paddingHorizontal={16}
            alignItems="center"
            flexDirection="row"
            backgroundColor={hovered ? ThemeDefault.backgroundPrimaryHover : undefined}
            hoverBackgroundColor={ThemeDefault.backgroundPrimaryHover}
            selectedBackgroundColor={ThemeDefault.accentPrimary}
            selectedHoverBackgroundColor={ThemeDefault.accentPrimaryHover}
            selectedColor={ThemeDefault.foregroundInverted}
            cursor="pointer"
            borderRadius={useRadius ? 8 : 0}
            onClick={onClick}
            path={path}
            linkSelectable={true}
        >
            {content}
        </XView>
    );
});