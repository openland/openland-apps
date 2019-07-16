import * as React from 'react';
import { XView, XViewSelectedContext } from 'react-mental';
import { ThemeDefault } from 'openland-y-utils/themes';
import { css } from 'linaria';
import { TypeStyles } from 'openland-web/utils/TypeStyles';

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

interface UListItemProps {
    text: string;
    icon?: any;
    avatar?: { photo?: string | null, key: string, title: string };
    onClick?: () => void;
    path?: string;
    large?: boolean;
}

export const UListItem = React.memo((props: UListItemProps) => {
    const { text, icon, avatar, onClick, path, large } = props;
    const height = large ? 80 : (!!avatar ? 56 : 48);

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
            onClick={onClick}
            path={path}
            linkSelectable={true}
        >
            {!!icon && <XView marginRight={16} width={24} height={24}><SelectableSVG>{icon}</SelectableSVG></XView>}

            <XView {...TypeStyles.body}>
                {text}
            </XView>
        </XView>
    );
});