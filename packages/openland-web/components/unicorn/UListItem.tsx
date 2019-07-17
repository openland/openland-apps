import * as React from 'react';
import { XView, XViewSelectedContext, XViewProps } from 'react-mental';
import { ThemeDefault } from 'openland-y-utils/themes';
import { css } from 'linaria';
import { TypeStyles } from 'openland-web/utils/TypeStyles';
import { UAvatar } from './UAvatar';

const selectedStyle = css`
    svg {
        path {
            stroke: white; // Need to be ThemeDefault.contrastSpecial
        }
        circle {
            fill: white; // Need to be ThemeDefault.contrastSpecial
        }
    }
`;

const SelectableSVG = React.memo((props: { children?: any }) => {
    let selected = React.useContext(XViewSelectedContext);
    if (selected) {
        return (<div className={selectedStyle}>{props.children}</div>);
    }
    return (<div>{props.children}</div>);
});

const SelectableText = React.memo((props: XViewProps) => {
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
    title: string;
    subtitle?: string;
    description?: string | JSX.Element | null;
    descriptionColor?: string;
    icon?: any;
    avatar?: { photo?: string | null, id: string, title: string, online?: boolean };
    onClick?: () => void;
    path?: string;
    large?: boolean;
    useRadius?: boolean;
}

export const UListItem = React.memo((props: UListItemProps) => {
    const { title, subtitle, description, descriptionColor, icon, avatar, onClick, path, large, useRadius } = props;
    const height = large ? 80 : (!!avatar ? 56 : 48);
    const titleFont = !!description ? TypeStyles.label1 : TypeStyles.body;
    const subtitleFont = TypeStyles.caption;
    const descriptionFont = large ? TypeStyles.densed : TypeStyles.caption;

    return (
        <XView
            height={height}
            paddingHorizontal={16}
            alignItems="center"
            flexDirection="row"
            hoverBackgroundColor={ThemeDefault.backgroundPrimaryHover}
            selectedBackgroundColor={ThemeDefault.accentPrimary}
            selectedHoverBackgroundColor={ThemeDefault.accentPrimaryHover}
            selectedColor={ThemeDefault.contrastSpecial}
            cursor="pointer"
            borderRadius={useRadius ? 8 : 0}
            onClick={onClick}
            path={path}
            linkSelectable={true}
        >
            {!!icon && <XView marginRight={16} width={24} height={24} alignItems="center" justifyContent="center"><SelectableSVG>{icon}</SelectableSVG></XView>}
            {!!avatar && !icon && (
                <XView marginRight={16}>
                    <UAvatar {...avatar} size={large ? 'large' : 'medium'} />
                </XView>
            )}

            <XView flexDirection="column">
                <XView flexDirection="row" alignItems="center">
                    <SelectableText {...titleFont} color={ThemeDefault.foregroundPrimary} selectedColor={ThemeDefault.contrastSpecial}>
                        {title}
                    </SelectableText>

                    {!!subtitle && (
                        <SelectableText {...subtitleFont} color={ThemeDefault.foregroundTertiary} selectedColor={ThemeDefault.contrastSpecial} marginLeft={8}>
                            {subtitle}
                        </SelectableText>
                    )}
                </XView>

                {!!description && (
                    <SelectableText {...descriptionFont} color={descriptionColor ? descriptionColor : ThemeDefault.foregroundTertiary} selectedColor={ThemeDefault.contrastSpecial}>
                        {description}
                    </SelectableText>
                )}
            </XView>
        </XView>
    );
});