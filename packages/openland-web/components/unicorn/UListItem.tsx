import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XViewSelectedContext, XViewProps } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { UAvatar } from './UAvatar';
import { UIcon } from './UIcon';
import { emoji } from 'openland-y-utils/emoji';

const SelectableSVG = React.memo((props: { icon: JSX.Element }) => {
    const selected = React.useContext(XViewSelectedContext);

    return (
        <UIcon
            icon={props.icon}
            color={selected ? 'var(--foregroundInverted)' : 'var(--foregroundSecondary)'}
        />
    );
});

const ellipsisText = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const SelectableText = React.memo((props: XViewProps) => {
    const selected = React.useContext(XViewSelectedContext);

    return (
        <XView {...props} maxWidth="100%" color={selected ? props.selectedColor : props.color}>
            <span className={ellipsisText}>{props.children}</span>
        </XView>
    );
});

export interface UListItemProps {
    title: string | JSX.Element;
    titleStyle?: XViewProps;
    titleIcon?: JSX.Element;
    subtitle?: string | JSX.Element;
    description?: string | JSX.Element | null;
    descriptionColor?: string;
    icon?: JSX.Element;
    iconBackground?: string;
    iconColor?: string;
    avatar?: { photo?: string | null; id: string; title: string; online?: boolean };
    leftElement?: JSX.Element;
    onClick?: (event: React.MouseEvent) => void;
    onMouseOver?: (event: React.MouseEvent) => void;
    onMouseMove?: (event: React.MouseEvent) => void;
    path?: string;
    large?: boolean;
    useRadius?: boolean;
    textRight?: string;
    rightElement?: JSX.Element;
    hovered?: boolean;
    disabled?: boolean;
    paddingHorizontal?: number;
    interactive?: boolean;
    linkSelectable?: boolean;
    disableHover?: boolean;
    href?: string;
    wrapperClassName?: string;
    savedMessages?: boolean;
}

export const UListItem = React.memo((props: UListItemProps) => {
    const {
        title,
        titleStyle,
        titleIcon,
        subtitle,
        description,
        descriptionColor,
        icon,
        iconBackground,
        iconColor,
        avatar,
        leftElement,
        onClick,
        onMouseOver,
        onMouseMove,
        path,
        large,
        useRadius,
        textRight,
        rightElement,
        hovered,
        disabled,
        paddingHorizontal = 16,
        interactive = true,
        linkSelectable = true,
        href,
        wrapperClassName,
        savedMessages,
    } = props;
    const selected = React.useContext(XViewSelectedContext);
    const height = large ? 80 : !!avatar || !!leftElement || !!iconBackground ? 56 : 48;
    const titleFont = !!description || savedMessages ? TextStyles.Label1 : TextStyles.Body;
    const subtitleFont = TextStyles.Caption;
    const descriptionFont = large ? TextStyles.Densed : TextStyles.Subhead;
    const textRightFont = TextStyles.Body;

    const containerRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(
        () => {
            if (containerRef.current && hovered) {
                containerRef.current.scrollIntoView({ behavior: 'auto', block: 'nearest' });
            }
        },
        [hovered],
    );

    const titleEmojify = savedMessages ? 'Saved messages' : typeof title === 'string' ? React.useMemo(() => emoji(title), [title]) : title;
    const descriptionEmojify = typeof description === 'string' ? React.useMemo(() => emoji(description), [description]) : description;
    const subtitleEmojify = typeof subtitle === 'string' ? React.useMemo(() => emoji(subtitle), [subtitle]) : subtitle;

    const content = (
        <>
            {!!icon && !iconBackground && (
                <XView
                    marginRight={16}
                    width={24}
                    height={24}
                    alignItems="center"
                    justifyContent="center"
                >
                    <SelectableSVG icon={icon} />
                </XView>
            )}
            {!!icon && !!iconBackground && (
                <XView
                    marginRight={16}
                    width={40}
                    height={40}
                    borderRadius={20}
                    backgroundColor={iconBackground}
                    alignItems="center"
                    justifyContent="center"
                >
                    <UIcon icon={icon} color={iconColor || 'var(--foregroundContrast)'} />
                </XView>
            )}
            {!!avatar && !icon && (
                <XView marginRight={16}>
                    <UAvatar {...avatar} selected={selected} size={large ? 'large' : 'medium'} savedMessages={savedMessages} />
                </XView>
            )}
            {!!leftElement && !icon && <XView marginRight={16}>{leftElement}</XView>}

            <XView flexDirection="column" flexGrow={1} flexShrink={1} flexBasis={0}>
                <XView flexDirection="row" alignItems="center" overflow="hidden">
                    {!!titleIcon && <XView>{titleIcon}</XView>}
                    <SelectableText
                        {...titleFont}
                        color="var(--foregroundPrimary)"
                        selectedColor="var(--foregroundContrast)"
                    >
                        {titleStyle ? <XView {...titleStyle}>{titleEmojify}</XView> : titleEmojify}
                    </SelectableText>

                    {!!subtitle && (
                        <SelectableText
                            {...subtitleFont}
                            color="var(--foregroundSecondary)"
                            selectedColor="var(--foregroundContrast)"
                            marginLeft={8}
                        >
                            {subtitleEmojify}
                        </SelectableText>
                    )}
                </XView>

                {!!description && (
                    <SelectableText
                        {...descriptionFont}
                        color={descriptionColor ? descriptionColor : 'var(--foregroundSecondary)'}
                        selectedColor="var(--foregroundContrast)"
                        textOverflow="ellipsis"
                        height={descriptionFont.lineHeight}
                        white-space="nowrap"
                        overflow="hidden"
                    >
                        {descriptionEmojify}
                    </SelectableText>
                )}
            </XView>

            {!!textRight && (
                <SelectableText
                    {...textRightFont}
                    color="var(--tintGrey)"
                    selectedColor="var(--foregroundContrast)"
                >
                    {textRight}
                </SelectableText>
            )}

            {!!rightElement && <XView marginRight={-8}>{rightElement}</XView>}
        </>
    );

    if (disabled) {
        return (
            <div ref={containerRef} className={cx('x', wrapperClassName)}>
                <XView
                    height={height}
                    paddingHorizontal={paddingHorizontal}
                    alignItems="center"
                    flexDirection="row"
                    opacity={0.4}
                >
                    {content}
                </XView>
            </div>
        );
    }

    if (!interactive) {
        return (
            <div ref={containerRef} className={cx('x', wrapperClassName)}>
                <XView
                    height={height}
                    paddingHorizontal={paddingHorizontal}
                    alignItems="center"
                    flexDirection="row"
                >
                    {content}
                </XView>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={cx('x', wrapperClassName)} onMouseOver={onMouseOver} onMouseMove={onMouseMove}>
            <XView
                height={height}
                paddingHorizontal={paddingHorizontal}
                alignItems="center"
                flexDirection="row"
                backgroundColor={hovered && !selected ? 'var(--backgroundPrimaryHover)' : undefined}
                hoverBackgroundColor={props.disableHover ? undefined : 'var(--backgroundPrimaryHover)'}
                hoverTextDecoration="none"
                selectedBackgroundColor="var(--accentMuted)"
                selectedHoverBackgroundColor="var(--accentMutedHover) !important"
                selectedColor="var(--foregroundContrast)"
                cursor="pointer"
                borderRadius={useRadius ? 8 : 0}
                onClick={onClick}
                path={path}
                linkSelectable={linkSelectable}
                href={href}
                target={!!href ? '_blank' : undefined}
                as={!!href ? 'a' : undefined}
            >
                {content}
            </XView>
        </div>
    );
});
