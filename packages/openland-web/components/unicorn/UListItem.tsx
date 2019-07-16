import * as React from 'react';
import { XView, XViewSelectedContext } from 'react-mental';
import { ThemeDefault } from 'openland-y-utils/themes';
import { css } from 'linaria';

const selectedStyle = css`
    * path {
        stroke: white; 
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
    onClick?: () => void;
    path?: string;
}

export const UListItem = React.memo((props: UListItemProps) => {
    const { text, icon, onClick, path } = props;

    return (
        <XView
            height={48}
            paddingHorizontal={16}
            alignItems="center"
            flexDirection="row"
            hoverBackgroundColor={ThemeDefault.backgroundPrimaryHover}
            selectedBackgroundColor={ThemeDefault.accentPrimary}
            selectedHoverBackgroundColor={ThemeDefault.accentPrimaryHover}
            selectedColor="#fff"
            cursor="pointer"
            onClick={onClick}
            path={path}
            linkSelectable={true}
        >
            {icon && <XView marginRight={19} width={24} height={24}><SelectableSVG>{props.icon}</SelectableSVG></XView>}
            <XView lineHeight="24px" fontSize={15}>
                {text}
            </XView>
        </XView>
    );
});